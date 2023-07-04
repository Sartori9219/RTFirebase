import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { storeData, getData } from "../redux/util/data";
import { KEY_DATA_USER } from "../redux/types/user";
import initDataUser from "../config/user.json";
import { db } from "../config/firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import Logout from "../component/SetupClassPage/Logout";
import LoginWithGoogle from "../component/SetupClassPage/LoginWithGoogle";
import SetupClass from "../component/SetupClassPage/SetupClass";
import ClassList from "../component/SetupClassPage/ClassList";
import DataContext from "../component/ContextProvider/DataContext";
import Cat from "../component/SetupClassPage/Cat";
import Seed from "../component/HomePage/Seed";

function SetupClassPage({ navigation }) {
  const { user, loginWithGoogle, logout } = useContext(DataContext);
  const [userData, setUserData] = useState();
  const [widthBackground1, setWidthBackground1] = useState(0);
  const [heightBackground1, setHeightBackground1] = useState(0);
  const [widthBackground2, setWidthBackground2] = useState(0);
  const [heightBackground2, setHeightBackground2] = useState(0);
  const [loading, setLoading] = useState(true);
  const [classList, setClassList] = useState([]);

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
    // console.log(size);
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

  useEffect(() => {
    if (user && user.uid) {
      const q = query(
        collection(db, "class"),
        where("teacher", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (snap) => {
        const classes = [];
        snap.forEach((doc) => {
          classes.push({ key: doc.id, ...doc.data() });
        });
        setClassList(classes);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      <Image
        style={[
          styles.background,
          { height: heightBackground1, width: "100%", resizeMode: "stretch" },
        ]}
        source={"assets/background_desktop_1.png"}
        height={heightBackground1}
      />
      <Image
        style={[
          styles.background_bottom,
          { height: heightBackground2, width: "100%", resizeMode: "stretch" },
        ]}
        source={"assets/background_desktop_2.png"}
      />
      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <View style={styles.logoContainer}>
            <Pressable onPress={() => navigation.navigate("/")}>
              <Image source={"assets/square_logo.svg"} style={styles.logo} />
            </Pressable>
            <Text style={styles.textLogo}>Grape Assignments</Text>
          </View>
          <View style={styles.logoContainer}>
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
      {!user && (
        <View
          style={[styles.row, { justifyContent: "center", marginTop: 250 }]}
        >
          <LoginWithGoogle user={user} loginWithGoogle={loginWithGoogle} />
        </View>
      )}
      <ScrollView>
        {user && (
          <View style={{ marginTop: 150, zIndex: 1 }}>
            <SetupClass user={user} />
          </View>
        )}
        <View style={{ marginVertical: 116, paddingHorizontal: 32 }}>
          {user && classList.length > 0 && (
            <>
              <Text style={[styles.title, { marginBottom: 16 }]}>Classes</Text>
              <ClassList data={classList} user={user} />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default SetupClassPage;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  header: {
    marginBottom: 16,
    padding: 16,
    width: "100%",
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
    fontSize: 24,
  },
});
