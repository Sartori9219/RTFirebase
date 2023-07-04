import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentSubject } from "../../redux/actions/current-subject";
import { randomNumberInRange } from "../utils";
import { setGif } from "../../redux/actions/gif";
import Popover, {
  PopoverPlacement,
  PopoverMode,
} from "react-native-popover-view";

const ws = Dimensions.get("window").width;
const ratio = (ws - 15) / 1905 / 1.1;
const cratio = (ws - 15) / 1280 / 1.1;
const pratio = (ws - 15) / 660 / 1.1;

function MainCard({ title, subject, iconName }) {
  const [minNum, setMinNum] = useState(
    parseInt(40 + Math.random() * (50 - 40))
  );
  const [maxNum, setMaxNum] = useState(
    parseInt(60 + Math.random() * (70 - 60))
  );
  const selChallenging = (mastery) => {
    if (mastery <= 35) {
      return "easy-challenging";
    }
    if (35 < mastery && mastery <= 70) {
      return "semi-challenging";
    }
    if (70 < mastery && mastery <= 85) {
      return "challenging";
    }
    if (85 < mastery && mastery <= 100) {
      return "extremely-challenging";
    }
  };
  const selSchool = (level) => {
    if (level === "L1") {
      return "Primary School";
    }
    if (level === "L2") {
      return "Secondary School";
    }
    if (level === "L3") {
      return "High School";
    }
    if (level === "L4") {
      return "College";
    }
  };
  return (
    <>
      {ws > 1295 ? (
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image
              style={{ position: "initial" }}
              source={`assets/icon/${iconName}`}
            />
          </View>
          <View style={{ flex: 0.86 }}>
            <View style={styles.subject}>
              <View style={{ flex: 0.7 }}>
                <Text style={styles.course}>{title}</Text>
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.mastery}>
                  Average mastery
                  {`\n${parseInt((minNum / maxNum) * 100)}%(${parseInt(
                    (minNum / maxNum) * 100
                  )}/100)`}
                </Text>
              </View>
            </View>

            <View style={styles.school}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.schoolKind}>
                  Best for {selSchool(subject.split("_")[2])}
                </Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <Text style={styles.challenge}>
                  {parseInt((minNum / maxNum) * 100)}% felt this was{" "}
                  {selChallenging(parseInt((minNum / maxNum) * 100))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : ws > 675 ? (
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image
              style={{ position: "initial" }}
              source={`assets/icon/${iconName}`}
            />
          </View>
          <View style={{ flex: 0.86 }}>
            <View style={styles.subject}>
              <View style={{ flex: 0.7 }}>
                <Text style={styles.course}>{title}</Text>
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.mastery}>
                  Average mastery
                  {`\n${parseInt((minNum / maxNum) * 100)}%(${parseInt(
                    (minNum / maxNum) * 100
                  )}/100)`}
                </Text>
              </View>
            </View>

            <View style={styles.school}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.schoolKind}>
                  Best for {selSchool(subject.split("_")[2])}
                </Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <Text style={styles.challenge}>
                  {parseInt((minNum / maxNum) * 100)}% felt this was{" "}
                  {selChallenging(parseInt((minNum / maxNum) * 100))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.pcard}>
          <View style={styles.prow}>
            <View style={styles.picon}>
              <Image
                style={{ position: "initial" }}
                source={`assets/icon/${iconName}`}
              />
            </View>
            <View style={styles.ptext}>
              <View style={{ width: "100%", minHeight: 40 * pratio }}>
                <Text style={styles.ptitle}>{title}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  minHeight: 40 * pratio,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.pschool}>
                  Best for {selSchool(subject.split("_")[2])}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

function SubjectButton({
  title,
  subject,
  iconName,
  navigation,
  keysAndDestinations,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  // const onPress = () => {
  //   dispatch(setCurrentSubject({ subject: subject }));
  //   navigation.navigate(destination, {
  //     name: title,
  //     subject: subject,
  //   });
  // };
  const onPress = (key, destination) => {
    setShowDropdown(!showDropdown);
    dispatch(setCurrentSubject({ subject: key }));
    navigation.navigate(destination, {
      name: title,
      subject: key,
    });
  };

  const dispatch = useDispatch();

  // const changeIcon = async (title) => {
  //   try {
  //     const subject = title.split(":")[0].split(/ |-|_/);
  //     const response = await fetch(`assets/icon/${title.split(":")[0]}.png`);
  //     if (response.headers.get("Content-Type") === "image/png") {
  //       setIcon(`assets/icon/${title.split(":")[0]}.png`);
  //     } else {
  //       subject.map(sub => {

  //       })
  //       return `assets/icon/SAT.png`;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };
  const [icon, setIcon] = useState("assets/icon/SAT.png");

  return (
    <Pressable
      onPress={() => {
        // onPress();
        if (keysAndDestinations.length > 1) {
          setShowDropdown(!showDropdown);
        } else {
          onPress(
            keysAndDestinations[0].key,
            keysAndDestinations[0].destination
          );
        }
      }}
      style={(state) => [
        state.hovered && styles.hovered,
        { position: "relative", isolation: "isolate" },
      ]}
    >
      {keysAndDestinations.length > 1 ? (
        <Popover
          popoverStyle={styles.popover}
          placement={PopoverPlacement.BOTTOM}
          isVisible={showDropdown}
          onRequestClose={() => setShowDropdown(!showDropdown)}
          mode={PopoverMode.RN_MODAL}
          animationConfig={{ duration: 100 }}
          from={
            <Pressable
              onPress={() => {
                // onPress();
                if (keysAndDestinations.length > 1) {
                  setShowDropdown(!showDropdown);
                } else {
                  onPress(
                    keysAndDestinations[0].key,
                    keysAndDestinations[0].destination
                  );
                }
              }}
              style={(state) => [
                state.hovered && styles.hovered,
                { position: "relative", isolation: "isolate" },
              ]}
            >
              <MainCard title={title} subject={subject} iconName={iconName} />
            </Pressable>
          }
        >
          <View style={styles.modalView}>
            <View style={styles.containerGrades}>
              <Text>Question Type:</Text>
              {keysAndDestinations.map((obj, index) => {
                return (
                  <View key={index}>
                    <Pressable
                      onPress={() => {
                        onPress(obj.key, obj.destination);
                      }}
                      style={(state) => [state.hovered && styles.hoveredDest]}
                    >
                      <View>
                        <Text style={styles.dest}>
                          {obj.destination.slice(0, -4)} Questions
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        </Popover>
      ) : (
        <MainCard title={title} subject={subject} iconName={iconName} />
      )}
    </Pressable>
  );
}

export default SubjectButton;

const styles = StyleSheet.create({
  hoveredDest: {
    backgroundColor: "#F2F2F2",
  },
  hovered: {
    transform: [{ scale: 1.07 }],
  },
  //ws>1300
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: ws > 1295 ? 8 * ratio : 8 * cratio,
    maxWidth: ws > 1295 ? 590 * ratio : 590 * cratio,
    minWidth: ws > 1295 ? 590 * ratio : 590 * cratio,
    minHeight: ws > 1295 ? 145 * ratio : 145 * cratio,
    maxHeight: ws > 1295 ? 145 * ratio : 145 * cratio,
    shadowColor: "#000",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: ws > 1295 ? 4 * ratio : 4 * cratio,
    // elevation: 5,
    paddingTop: ws > 1295 ? 20 * ratio : 20 * cratio,
    paddingLeft: ws > 1295 ? 20 * ratio : 20 * cratio,
    paddingRight: ws > 1295 ? 20 * ratio : 20 * cratio,
    // margin: 20
  },
  icon: {
    flex: 0.14,
    height: ws > 1295 ? 76 * ratio : 76 * cratio,
    marginTop: ws > 1295 ? 14 * ratio : 14 * cratio,
    marginRight: ws > 1295 ? 10 * ratio : 10 * cratio,
  },
  subject: {
    flexDirection: "row",
    height: ws > 1295 ? 50 * ratio : 50 * cratio,
  },
  course: {
    fontSize: ws > 1295 ? 20 * ratio : 20 * cratio,
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "left",
    fontWeight: "bold",
  },
  mastery: {
    fontSize: ws > 1295 ? 16 * ratio : 16 * cratio,
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "right",
  },
  type: {
    flexDirection: "row",
    height: ws > 1295 ? 20 * ratio : 20 * cratio,
  },
  queType: {
    fontSize: ws > 1295 ? 20 * ratio : 20 * cratio,
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "left",
    fontWeight: 100,
  },
  school: {
    flexDirection: "row",
    marginTop: ws > 1295 ? 10 * ratio : 10 * cratio,
  },
  schoolKind: {
    fontSize: ws > 1295 ? 16 * ratio : 16 * cratio,
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "left",
  },
  challenge: {
    fontSize: ws > 1295 ? 16 * ratio : 16 * cratio,
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "right",
  },
  //ws<675
  pcard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8 * pratio,
    maxWidth: 590 * pratio,
    minWidth: 590 * pratio,
    minHeight: 120 * pratio,
    maxHeight: 120 * pratio,
    shadowColor: "#000",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5 * pratio,
    paddingTop: 15 * pratio,
    paddingLeft: 10 * pratio,
    paddingRight: 10 * pratio,
    paddingBottom: 15 * pratio,
  },
  prow: {
    flexDirection: "row",
    minHeight: 90 * pratio,
    maxHeight: 90 * pratio,
    width: "100%",
  },
  picon: {
    flex: 0.14,
    height: 77 * pratio,
    marginTop: 10 * pratio,
    marginRight: 10 * pratio,
  },
  ptext: {
    flex: 0.86,
    padding: 5 * pratio,
    marginTop: 5 * pratio,
  },
  ptitle: {
    fontSize: 24 * pratio,
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "left",
    fontWeight: "bold",
  },
  pquetionstype: {
    flex: 0.35,
    textAlign: "left",
    fontSize: 20 * pratio,
  },
  pschool: {
    flex: 0.65,
    textAlign: "right",
    fontSize: 20 * pratio,
  },
  dest: {
    fontWeight: "bold",
    // fontSize: 12 * pratio,
    fontSize: 12,
    paddingBlock: 5 * pratio,
    textTransform: "capitalize",
  },
  modalView: {
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  popover: {
    backgroundColor: "#fff",
    borderRadius: 4,
    textAlign: "left",
    border: "1px solid #f0f0f0",
    padding: 10,
    width: "100%",
    maxWidth: ws > 1295 ? 590 * ratio : 590 * cratio,
    minWidth: ws > 1295 ? 590 * ratio : 590 * cratio,
    minHeight: ws > 1295 ? 145 * ratio : 145 * cratio,
    overflowY: "scroll",
  },
  containerGrades: {
    paddingTop: 10,
    paddingBottom: 12,
  },
});
