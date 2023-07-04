import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
// import Tooltip from "react-native-walkthrough-tooltip";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../../../redux/actions/current-question";
import { setCurrentStep } from "../../../redux/actions/current-step";
import { setUser } from "../../../redux/actions/user";
import { loadQuestions } from "../../../redux/actions/questions";
import { KEY_DATA_USER } from "../../../redux/types/user";
import { KEY_DATA_QUESTIONS } from "../../../redux/types/questions";
import { storeData, getData } from "../../../redux/util/data";

const seedImage = "assets/seed.svg";
const seedWhite = "assets/seed_white.svg";

const Hint = ({
  user,
  questions,
  currentGrade,
  currentSubject,
  currentQuestion,
  currentStep,
  hintPrice,
}) => {
  const dispatch = useDispatch();

  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const getHintButtonText = () => {
    let count = 0;
    let button;
    if (questions) {
      if (Array.isArray(questions[currentQuestion].hints)) {
        if (questions[currentQuestion].hints.length > 0) {
          for (let i = 0; i < questions[currentQuestion].hints.length; i++) {
            if (
              questions[currentQuestion].hints[i].isBought === false ||
              questions[currentQuestion].hints[i].isBought === undefined
            ) {
              if (i === 0) {
                button = (
                  <Pressable
                    onPress={() => {
                      handleBuyHint();
                    }}
                    onPressIn={() => setPressing(true)}
                    onPressOut={() => setPressing(false)}
                    onHoverIn={() => setHovering(true)}
                    onHoverOut={() => setHovering(false)}
                    style={(state) => [
                      styles.button,
                      state.hovered && styles.hovered,
                      state.pressed && styles.pressed,
                    ]}
                    children={
                      <Text
                        style={[
                          styles.text,
                          hovering && styles.hovered,
                          pressing && styles.pressed,
                        ]}
                      >
                        Free Hint
                        <Text style={{ marginLeft: 8, marginRight: 4 }}>0</Text>
                        <Image
                          source={hovering || pressing ? seedWhite : seedImage}
                          style={styles.seed}
                        />
                      </Text>
                    }
                  />
                );
              } else {
                button = (
                  <Pressable
                    onPress={() => {
                      handleBuyHint();
                    }}
                    onPressIn={() => setPressing(true)}
                    onPressOut={() => setPressing(false)}
                    onHoverIn={() => setHovering(true)}
                    onHoverOut={() => setHovering(false)}
                    style={(state) => [
                      styles.button,
                      state.hovered && styles.hovered,
                      state.pressed && styles.pressed,
                    ]}
                    children={
                      <Text
                        style={[
                          styles.text,
                          hovering && styles.hovered,
                          pressing && styles.pressed,
                        ]}
                      >
                        Buy Hint
                        <Text style={{ marginLeft: 8, marginRight: 4 }}>
                          {hintPrice}
                        </Text>
                        <Image
                          source={hovering || pressing ? seedWhite : seedImage}
                          style={styles.seed}
                        />
                      </Text>
                    }
                  />
                );
              }
              break;
            } else {
              count++;
              if (count === questions[currentQuestion].hints.length) {
                button = (
                  <Pressable
                    style={[styles.button, styles.disabled]}
                    children={<Text style={[styles.text]}>No Hints</Text>}
                  />
                );
              }
            }
          }
        } else {
          button = (
            <Pressable
              style={[styles.button, styles.disabled]}
              children={<Text style={[styles.text]}>No Hints</Text>}
            />
          );
        }
        return button;
      }
    }
  };
  const handleBuyHint = () => {
    if (questions[currentQuestion].hints.length > 0) {
      let count = 0;
      for (let i = 0; i < questions[currentQuestion].hints.length; i++) {
        if (
          questions[currentQuestion].hints[i].isBought === false ||
          questions[currentQuestion].hints[i].isBought === undefined
        ) {
          function updateData() {
            const newQuestions = questions.filter((question) => {
              if (question === questions[currentQuestion]) {
                question.hints[i].isBought = true;
              }
              return question;
            });
            const getKeyQuestion = (id) => `${"KEY_DATA_QUESTIONS" + id}`;
            storeData(currentSubject, newQuestions);
            const data = getData(currentSubject);
            data.then((val) => {
              dispatch(loadQuestions(val));
            });
          }
          if (i === 0) {
            updateData();
          } else {
            if (user.seed < hintPrice) {
            } else {
              updateData();
              let newUser = user;
              newUser.seed = user.seed - 10;
              dispatch(setUser(newUser));
            }
          }

          break;
        } else {
          count++;
          if (count === questions[currentQuestion].hints.length) {
            console.log("no more hints");
          }
        }
      }
    } else {
      console.log("no available hints");
    }
  };

  return <View style={styles.container}>{getHintButtonText()}</View>;
};

export default Hint;

const styles = StyleSheet.create({
  container: {},
  hovered: {
    backgroundColor: "#6700a1",
    color: "#fff",
  },
  pressed: {
    backgroundColor: "#D18EF9",
    color: "#fff",
  },
  button: {
    height: 40,
    paddingHorizontal: 24,
    justifyContent: "center",
    borderRadius: 8,
    border: "2px solid #D3D3D3",
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#A25ADC",
    userSelect: "none",
  },
  seed: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  disabled: {
    opacity: "50%",
    cursor: "default",
  },
});
