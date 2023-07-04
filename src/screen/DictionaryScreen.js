import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../redux/actions/current-question";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Dimensions,
  Text
} from "react-native";
import Header from "../component/Dictionary/Header";
import Question from "../component/Dictionary/Question";
import Step from "../component/Dictionary/Step";
import Footer from "../component/Dictionary/Footer";
import {
  getCorrectAnswer,
  getSubject,
  getOptionsAndHints,
  arrayMove,
  randomNumberInRange,
  getDictionaryKey,
  formatQuestion
} from "../component/utils";

import { loadQuestions } from "../redux/actions/questions";
import { storeData, getData } from "../redux/util/data";
import { KEY_DATA_USER } from "../redux/types/user";
import initDataUser from "../config/user.json";
import app from "../config/app.json";

const hs = Dimensions.get("window").height;

function DictionaryScreen({
  user,
  currentGrade,
  questions,
  currentStep,
  currentQuestion,
  setFirstLoad,
  navigation,
  currentSubject,
}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedStepOption, setSelectedStepOption] = useState();
  const [currentSelect, setCurrentSelect] = useState();
  const scrollViewRef = useRef();

  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = hs * 0.3;
  const Header_Min_Height = 125;

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, (Header_Max_Height - Header_Min_Height) * 2 + 75],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const [userData, setUserData] = useState();
  const [questionData, setQuestionData] = useState();
  const [pressEnd, setPressEnd] = useState([]);

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
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const updateData = () => {
      function setLastPosition(val) {
        let countPassed = 0;

        for (let i = 0; i < val.length; i++) {
          if (val[i].isPassed) {
            countPassed++;
          }
        }

        for (let i = 0; i < val.length; i++) {
          if (countPassed === val.length) {
            let wrong = 0;
            if (checkFailedAttemp(val[i].answer, val[i].options)) {
              wrong = wrong + countFailedAttemp(val[i].answer, val[i].options);
            }

            if (wrong > 3) {
              const resetGrade = () => {
                const newQuestions = val.filter((question) => {
                  if (question === val[i]) {
                    val[i].isPassed = false;
                    for (let j = 0; j < val[i].length; j++) {
                      question[j].answer = [];
                      question[j].isPassed = false;
                      for (let k = 0; k < val[i].hints.length; k++) {
                        question.hints[k].isBought = false;
                      }
                    }
                  }
                  return question;
                });
                // storeData(getKeyQuestion(currentGrade), newQuestions);
                // setData(KEY_DATA_USER, getKeyQuestion(currentGrade));
                storeData(currentSubject, newQuestions);
                setData(KEY_DATA_USER, currentSubject);
              };
              const setData = async (keyDataUser, keyDataQuestions) => {
                try {
                  const data = getData(keyDataQuestions);
                  data.then((val) => {
                    dispatch(loadQuestions(val));
                    dispatch(
                      setCurrentQuestion({
                        max: val.length - 1,
                        current: i,
                      })
                    );
                  });
                } catch (error) {
                  console.log(error.message);
                }
              };
              resetGrade();
              setFirstLoad(false);
            }
          } else if (val[i].isPassed === true) {
            if (i === val.length - 1) {
              dispatch(
                setCurrentQuestion({
                  max: val.length - 1,
                  current: i + 1,
                })
              );
            }
          } else {
            dispatch(
              setCurrentQuestion({
                max: val.length - 1,
                current: i,
              })
            );
            break;
          }
        }
      }

      function init() {
        let finalData = [];
        return new Promise((resolve) => {
          getSubject(currentSubject).then(async (res) => {
            if (res) {
              let jsonData = res.questions;
              for (let b = 0; b < jsonData.length; b++) {
                let options = [];
                let hints = [];
                let correct = jsonData[b].options[0];
                let list = [...jsonData[b].options];
                getOptionsAndHints(getDictionaryKey(currentSubject)).then(
                  async (dictionaryData) => {
                    if (dictionaryData) {
                      const opts = dictionaryData.options;
                      const index = opts.indexOf(
                        correct.replace("(correct answer)", "").trim()
                      );
                      if (index > -1) {
                        opts.splice(index, 1);
                      }
                      const shuffledData = opts.sort(() => 0.5 - Math.random());
                      const selectedData = shuffledData.slice(0, 3);

                      list = list.concat(selectedData);
                      options = [...new Set(list)];

                      for (let x = 0; x < options.length; x++) {
                        if (options[x] === correct) {
                          options = [
                            ...arrayMove(
                              options,
                              x,
                              randomNumberInRange(0, options.length - 1)
                            ),
                          ];
                        }
                      }

                      //hints
                      let listHint = [];
                      for (let i = 0; i < options.length; i++) {
                        listHint.push({
                          description: `${options[i]}: ${dictionaryData.hints[
                            options[i].replace("(correct answer)", "").trim()
                          ]
                            }`,
                          isBought: false,
                        });
                      }
                      hints = [...new Set(listHint)];

                      for (let x = 0; x < hints.length; x++) {
                        if (
                          hints[x].description ===
                          `${correct}: ${dictionaryData.hints[
                          correct.replace("(correct answer)", "").trim()
                          ]
                          }`
                        ) {
                          hints = [...arrayMove(hints, x, hints.length - 1)];
                        }
                      }

                      const newQuestions = jsonData.filter((question) => {
                        if (question === jsonData[b]) {
                          question.options = [...options];
                          question.hints = [...hints];
                          question.answer = [];
                          question.isPassed = false;
                          finalData.push(question);
                          if (b === jsonData.length - 1) {
                            storeData(currentSubject, [...finalData]);
                            setQuestionData([...finalData]);
                            setDataLoaded(true);
                          }
                        }
                        return question;
                      });
                    }
                  }
                );
              }
            }
          });
          resolve();
        });
      }

      getData(currentSubject).then(async (val) => {
        if (val) {
          setQuestionData(val);
          setLastPosition(val);
          setDataLoaded(true);
        } else {
          await init();
        }
      });
    };

    updateData();
  }, [dispatch, questions, currentQuestion, currentGrade, currentSubject]);

  return (
    <>
      {dataLoaded && (
        <>
          {userData && (
            <Header
              user={userData}
              questions={questionData}
              currentSubject={currentSubject}
              currentQuestion={currentQuestion}
              navigation={navigation}
            />
          )}
          {questionData && (
            <Question
              questions={questionData}
              currentSubject={currentSubject}
              currentQuestion={currentQuestion}
              currentStep={currentStep}
            />
          )}
          <Text
            style={{
              paddingHorizontal: 16,
              paddingTop: 24,
              paddingBottom: 24,
              paddingLeft: '10%',
              paddingRight: '10%',
              fontWeight: "400",
              fontSize: "120%",
              color: "#1D232E",
              lineHeight: "120%",
              marginBottom: 16
            }}
          >
            {formatQuestion("This scenario best matches which concept?")}
          </Text>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
              { useNativeDriver: false }
            )}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <View style={styles.body}>
              {userData && questionData && (
                <Step
                  user={userData}
                  currentSubject={currentSubject}
                  questions={questionData}
                  currentQuestion={currentQuestion}
                  currentStep={currentStep}
                  selectedStepOption={selectedStepOption}
                  setSelectedStepOption={setSelectedStepOption}
                  currentSelect={currentSelect}
                  setCurrentSelect={setCurrentSelect}
                  pressEnd={pressEnd}
                  setPressEnd={setPressEnd}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              )}
            </View>
          </ScrollView>
          {userData && questionData && (
            <Footer
              user={userData}
              questions={questionData}
              currentQuestion={currentQuestion}
              currentStep={currentStep}
              currentSubject={currentSubject}
              selectedStepOption={selectedStepOption}
              setSelectedStepOption={setSelectedStepOption}
              hintPrice={app.hintPrice}
              setCurrentSelect={setCurrentSelect}
              pressEnd={pressEnd}
              setPressEnd={setPressEnd}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </>
      )}
    </>
  );
}

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FAFAFC",
  },
  body: {
    paddingHorizontal: 16,
    minHeight: hs * 0.3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 28,
    marginVertical: 32,
  },
  alertBoxCorrect: {
    height: "75px",
    width: "75px",
    position: "absolute",
    zIndex: 2,
    right: "64px",
    bottom: "-14px",
    justifyContent: "center",
  },
  alertBoxWrong: {
    height: "75px",
    width: "75px",
    position: "absolute",
    zIndex: 2,
    right: "64px",
    bottom: "-14px",
    justifyContent: "center",
  },
  alertCorrect: {
    height: "75px",
    width: "75px",
    alignSelf: "center",
  },
  alertWrong: {
    height: "75px",
    width: "75px",
    alignSelf: "center",
  },
});
