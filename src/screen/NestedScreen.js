import React, { useState, useEffect, useRef } from "react";
import { setCurrentQuestion } from "../redux/actions/current-question";
import { setCurrentStep } from "../redux/actions/current-step";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import Header from "../component/Nested/Header";
import Question from "../component/Nested/Question";
import Step from "../component/Nested/Step";
import Footer from "../component/Nested/Footer";
import { getKeyQuestion, getCorrectId, getGrade } from "../component/utils";

import { loadQuestions } from "../redux/actions/questions";
import { storeData, getData } from "../redux/util/data";
import { KEY_DATA_USER } from "../redux/types/user";
import initDataUser from "../config/user.json";

const hs = Dimensions.get("window").height;

function NestedScreen({
  user,
  currentSubject,
  currentGrade,
  questions,
  currentStep,
  currentQuestion,
  hintPrice,
  firstLoad,
  setFirstLoad,
  navigation,
}) {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (questions !== null) {
      const getCurrentQuestion = () => {
        let countPassed = 0;

        for (let i = 0; i < questions.length; i++) {
          if (questions[i].isPassed) {
            countPassed++;
          }
        }

        for (let i = 0; i < questions.length; i++) {
          if (countPassed === questions.length) {
            let wrong = 0;
            for (let j = 0; j < questions[i].questions.length; j++) {
              if (
                checkFailedAttemp(
                  questions[i].questions[j].answer,
                  questions[i].questions[j].options
                )
              ) {
                wrong =
                  wrong +
                  countFailedAttemp(
                    questions[i].questions[j].answer,
                    questions[i].questions[j].options
                  );
              }
            }

            if (wrong > 3) {
              const resetGrade = () => {
                const newQuestions = questions.filter((question) => {
                  if (question === questions[i]) {
                    questions[i].isPassed = false;
                    for (let j = 0; j < questions[i].questions.length; j++) {
                      question.questions[j].answer = [];
                      question.questions[j].isPassed = false;
                      for (
                        let k = 0;
                        k < questions[i].questions[j].hints.length;
                        k++
                      ) {
                        question.questions[j].hints[k].isBought = false;
                      }
                    }
                  }
                  return question;
                });
                // storeData(getKeyQuestion(currentGrade), newQuestions);
                // setData(KEY_DATA_USER, getKeyQuestion(currentGrade));
                storeData(getKeyQuestion(currentSubject), newQuestions);
                setData(KEY_DATA_USER, getKeyQuestion(currentSubject));
              };
              const setData = async (keyDataUser, keyDataQuestions) => {
                try {
                  const data = getData(keyDataQuestions);
                  data.then((val) => {
                    dispatch(loadQuestions(val));
                    dispatch(
                      setCurrentStep({
                        max: 0,
                        current: 0,
                      })
                    );
                    dispatch(
                      setCurrentQuestion({
                        max: questions.length - 1,
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
          } else if (questions[i].isPassed === true) {
            if (i === questions.length - 1) {
              dispatch(
                setCurrentStep({
                  max: questions[i].questions.length - 1,
                  current: questions[i].questions.length - 1,
                })
              );
              dispatch(
                setCurrentQuestion({
                  max: questions.length - 1,
                  current: i + 1,
                })
              );
            }
          } else {
            dispatch(
              setCurrentQuestion({
                max: questions.length - 1,
                current: i,
              })
            );

            for (let j = 0; j <= questions[i].questions.length - 1; j++) {
              if (questions[i].questions[j].isPassed === true) {
                if (currentStep < questions[i].questions.length - 1) {
                  dispatch(
                    setCurrentStep({
                      max: questions[i].questions.length - 1,
                      current: j + 1,
                    })
                  );
                } else {
                  dispatch(
                    setCurrentStep({
                      max: questions[i].questions.length - 1,
                      current: questions[currentQuestion].questions.length - 1,
                    })
                  );
                }
              } else {
                dispatch(
                  setCurrentStep({
                    max: questions[i].questions.length - 1,
                    current: j,
                  })
                );
                break;
              }
            }
            break;
          }
        }
        setDataLoaded(true);
      };

      const checkFailedAttemp = (answers, options) => {
        let failed = false;
        if (answers.length > 0) {
          for (let k = 0; k < answers.length; k++) {
            if (answers[k] !== getCorrectId(options)) {
              failed = true;
            }
          }
        }
        return failed;
      };

      const countFailedAttemp = (answers, options) => {
        let count = 0;
        if (answers.length > 0) {
          for (let k = 0; k < answers.length; k++) {
            if (answers[k] !== getCorrectId(options)) {
              count++;
            }
          }
        }
        return count;
      };
      const tryAgain = () => {
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].isPassed) {
          }
        }
      };

      const onPageLoad = () => {
        if (dataLoaded === true) {
          getCurrentQuestion();
        } else {
          console.log("question loading");
        }
      };

      if (document.readyState === "complete") {
        onPageLoad();
        setDataLoaded(true);
      } else {
        window.addEventListener("load", onPageLoad, false);
        const setData = async (keyDataUser, keyDataQuestions) => {
          try {
            const data = getData(keyDataQuestions);
            data.then((val) => {
              questions = val;
            });
          } catch (error) {
            console.log(error.message);
          }
        };
        getCurrentQuestion();
        return () => window.removeEventListener("load", onPageLoad);
      }
    }
  }, [
    dataLoaded,
    currentSubject,
    currentGrade,
    currentQuestion,
    currentStep,
    questions,
  ]);
  return (
    <>
      <Header
        user={user}
        questions={questions}
        currentSubject={currentSubject}
        currentGrade={currentGrade}
        currentQuestion={currentQuestion}
        navigation={navigation}
      />
      <Question
        currentSubject={currentSubject}
        currentGrade={currentGrade}
        questions={questions}
        currentQuestion={currentQuestion}
        currentStep={currentStep}
      />
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
          <Step
            user={user}
            currentSubject={currentSubject}
            currentGrade={currentGrade}
            questions={questions}
            currentQuestion={currentQuestion}
            currentStep={currentStep}
            selectedStepOption={selectedStepOption}
            setSelectedStepOption={setSelectedStepOption}
            currentSelect={currentSelect}
            setCurrentSelect={setCurrentSelect}
          />
        </View>
      </ScrollView>
      <Footer
        user={user}
        questions={questions}
        currentQuestion={currentQuestion}
        currentStep={currentStep}
        currentGrade={currentGrade}
        currentSubject={currentSubject}
        selectedStepOption={selectedStepOption}
        setSelectedStepOption={setSelectedStepOption}
        hintPrice={hintPrice}
        setCurrentSelect={setCurrentSelect}
      />
    </>
  );
}

export default NestedScreen;

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
