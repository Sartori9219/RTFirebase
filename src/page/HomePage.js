import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Button,
} from "react-native";
import { storeData, getData } from "../redux/util/data";
import { KEY_DATA_USER } from "../redux/types/user";
import initDataUser from "../config/user.json";
import SubjectButton from "../component/HomePage/SubjectButton";
import subjects from "../config/subjects.json";
import Cat from "../component/HomePage/Cat";
import Seed from "../component/HomePage/Seed";
import { auth } from "../config/firebase";
import { signOut } from "@firebase/auth";
import DataContext from "../component/ContextProvider/DataContext";

const ws = Dimensions.get("window").width;
const ratio = (ws - 15) / 1905 / 1.1;
const cratio = (ws - 15) / 1280 / 1.1;
const pratio = (ws - 15) / 660 / 1.1;

function groupByTitle(data) {
  return data.reduce((acc, curr) => {
    const x = acc.find((item) => item.title === curr.title);
    if (!x) {
      return acc.concat([curr]);
    } else {
      return acc;
    }
  }, []);
}

function HomePage({ navigation }) {
  console.log("hello")
  const { user, loginWithGoogle, logout } = useContext(DataContext);
  const [userData, setUserData] = useState();

  const [widthBackground1, setWidthBackground1] = useState(0);
  const [heightBackground1, setHeightBackground1] = useState(0);
  const [widthBackground2, setWidthBackground2] = useState(0);
  const [heightBackground2, setHeightBackground2] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const updateData = () => {
      getData(KEY_DATA_USER).then((val) => {
        if (val) {
          setUserData(val);
        } else {
          storeData(KEY_DATA_USER, initDataUser);
          setUserData(initDataUser);
        }
      });
    };
    if (isMounted) {
      updateData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const getSize = () => {
      Image.getSize("assets/background_desktop_1.png", (width, height) => {
        setWidthBackground1(width);
        setHeightBackground1(height);
      });
      Image.getSize("assets/background_desktop_2.png", (width, height) => {
        setWidthBackground2(width);
        setHeightBackground2(height);
      });
    };
    if (loading) {
      getSize();
    }
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Image
        style={[
          styles.background,
          { height: heightBackground1, width: "100%" },
        ]}
        source={"assets/background_desktop_1.png"}
        height={heightBackground1}
      />
      <Image
        style={[
          styles.background_bottom,
          { height: heightBackground2, width: "100%" },
        ]}
        source={"assets/background_desktop_2.png"}
      />
      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <View style={styles.logoContainer}>
            <Image source={"assets/square_logo.svg"} style={styles.logo} />
            <Text style={styles.textLogo}>Grape Assignments</Text>
          </View>
          <View style={[styles.logoContainer]}>
            {userData && <Seed user={userData} />}
            <Cat
              navigation={navigation}
              user={user}
              userData={userData}
              loginWithGoogle={loginWithGoogle}
              logout={logout}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Pressable
            style={styles.greenCard}
            onPress={() => {
              navigation.navigate("SetupClassPage");
            }}
          >
            <View>
              <Text style={styles.greenSubject}>
                {" "}
                <h1
                  style={{
                    marginTop: ws > 1000 ? 10 : 10 * ws / 1000,
                  }}
                >
                  Student projects and learning activities
                </h1>
              </Text>
              <View style={styles.greenContent}>
                <View style={{ flex: 0.6, alignItems: "left", height: "100%" }}>
                  <Text style={styles.cardH2}>
                    <h2 style={{ margin: 0 }}>Automatically graded</h2>
                  </Text>
                  <Text style={styles.cardH2}>
                    <h2 style={{ margin: 0 }}>Learn at my own pace</h2>
                  </Text>
                  <Text style={styles.cardH2}>
                    <h2 style={{ margin: 0 }}>
                      Supplemental or core curriculum
                    </h2>
                  </Text>
                  <Text style={[styles.cardH2, { marginBottom: ws > 1000 ? 23 : 23 * ws / 1000, }]}>
                    <h2 style={{ margin: 0 }}>Whiteboard animations</h2>
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("SetupClassPage");
                    }}
                    style={(state) => [
                      styles.classBtn, { backgroundColor: state.hovered ? "#2c1143" : "#5a4bad", }
                    ]}
                  >
                    <Text style={styles.btnText}>
                      SET UP A CLASS FOR FREE
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{ flex: 0.4, alignItems: "flex-end", height: "100%" }}
                >
                  <Image
                    style={styles.teacherImage}
                    source={"assets/college_student_or_teacher_172Height.png"}
                  />
                </View>
              </View>
            </View>
          </Pressable>
          <View>
            {subjects.map((subject, index) => {
              if (subject.data.length > 0) {
                const category = subject.category.replaceAll("-", " ");
                const groupedData = groupByTitle(subject.data);
                return (
                  <View key={index}>
                    <Text style={styles.title}>
                      <h2>{category}</h2>
                    </Text>
                    <View style={styles.row}>
                      {/* {subject.category === "Math" && (
                        <StoryProblemsButton navigation={navigation} />
                      )} */}
                      {/* {subject.data.map((sub, i) => {
                        return (
                          <View key={i}>
                            <SubjectButton
                              title={sub.title}
                              subject={sub.key}
                              destination={sub.destination}
                              iconName={sub.icon}
                              navigation={navigation}
                            />
                          </View>
                        );
                      })} */}
                      {groupedData.map((sub, i) => {
                        const keysAndDestinations = subject.data
                          .filter((item) => item.title === sub.title)
                          .map((item) => ({
                            key: item.key,
                            destination: item.destination,
                          }));

                        return (
                          <View key={i}>
                            <SubjectButton
                              title={sub.title}
                              subject={sub.key}
                              iconName={sub.icon}
                              navigation={navigation}
                              keysAndDestinations={keysAndDestinations}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  background_bottom: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
  container: {
    paddingHorizontal:
      ws > 1295 ? 32 * ratio : ws > 675 ? 32 * cratio : 32 * pratio,
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
    padding: 16,
    width: "100%",
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:
      ws > 1295 ? 16 * ratio : ws > 675 ? 16 * cratio : 16 * pratio,
    gap: ws > 1295 ? 30 * ratio : ws > 675 ? 30 * cratio : 30 * pratio,
    flexWrap: "wrap",
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    flexWrap: "wrap",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  textLogo: {
    fontSize: 32,
    marginLeft: 8,
  },
  title: {
    paddingTop: 16,
    fontSize: 20,
  },
  greenCard: {
    width: ws > 1000 ? 800 : ws * 0.8,
    height: ws > 1000 ? 255 : 255 * ws / 1000,
    backgroundColor: "#7ab728",
    alignItems: "center",
  },
  greenSubject: {
    fontWeight: "bold",
    color: "white",
    fontSize: ws > 1000 ? "85%" : `${85 * ws / 1000}%`,
  },
  cardH2: {
    fontWeight: "bold",
    color: "white",
    fontSize: ws > 1000 ? "70%" : `${70 * ws / 1000}%`,
  },
  greenContent: {
    width: ws > 1000 ? 550 : 550 * ws / 1000,
    height: ws > 1000 ? 150 : 150 * ws / 1000,
    flexDirection: "row"
  },
  classBtn: {
    width: "100%",
    height: ws > 1000 ? 35 : 35 * ws / 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: ws > 1000 ? "80%" : `${80 * ws / 1000}%`
  },
  teacherImage: {
    width: ws > 1000 ? 146 : 146 * ws / 1000,
    height: ws > 1000 ? 172 : 172 * ws / 1000,
  }
});
