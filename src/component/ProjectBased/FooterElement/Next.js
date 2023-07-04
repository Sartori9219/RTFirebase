import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../../../redux/actions/current-question";
import { setCurrentStep } from "../../../redux/actions/current-step";
import { setUser } from "../../../redux/actions/user";
import { storeData, getData } from "../../../redux/util/data";
import { loadQuestions } from "../../../redux/actions/questions";
import { getCorrectId, getKeyQuestion, getCorrectAnswer } from "../../utils";

const nextImage = "assets/next.svg";
const nextMouseover = "assets/next_mouseover.svg";
const nextClick = "assets/next_click.svg";

const Next = ({
  user,
  questions,
  currentQuestion,
  currentStep,
  createAlert,
  selectedStepOption,
  setSelectedStepOption,
  currentGrade,
  hintPrice,
  setCurrentSelect,
  currentSubject,
  currentSelect
}) => {
  const dispatch = useDispatch();
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const nextStep = () => {
    if (isNextStep) {
      setTimeout(function () {
        createAlert("correct");
      }, 0);
    }
    else {
      setTimeout(function () {
        createAlert("wrong");
      }, 0);
    }
    if (currentSelect === questions[currentQuestion].Steps[currentStep]) {
      let current = currentStep + 1;
      dispatch(
        setCurrentStep({
          max: questions[currentQuestion].Steps.length - 1,
          current: current
        }));
    }
  };

  const nextQuestion = () => {
    if (isNextQuestion) {
      setTimeout(function () {
        createAlert("correct");
      }, 0);
    }
    else {
      setTimeout(function () {
        createAlert("wrong");
      }, 0);
    }
    const newQuestions = questions.filter((question) => {
      if (question === questions[currentQuestion]) {
        question.isPassed = true;
      }
      return question;
    });
    storeData(getKeyQuestion(currentGrade), newQuestions);

    if (currentQuestion >= questions.length - 1) {
      dispatch(
        setCurrentQuestion({
          max: questions.length - 1,
          current: questions.length - 1,
        })
      );
      dispatch(
        setCurrentStep({
          max: questions[currentQuestion].Steps.length - 1,
          current: questions[currentQuestion].Steps.length - 1,
        })
      );
    } else {
      dispatch(
        setCurrentQuestion({
          max: questions.length - 1,
          current: currentQuestion + 1,
        })
      );
      dispatch(
        setCurrentStep({
          max: questions[currentQuestion].Steps.length - 1,
          current: 0,
        })
      );
    }
  };

  function nextQuestionStandalone() {
    // dispatch(
    //   setCurrentQuestion({
    //     max: questions.length - 1,
    //     current: currentQuestion + 1,
    //   })
    // );
    const newQuestions = questions.filter((question) => {
      if (question === questions[currentQuestion]) {
        question.answer !== undefined
          ? (question.answer = [...question.answer, selectedStepOption])
          : (question.answer = [selectedStepOption]);
      }
      return question;
    });
    storeData(currentSubject, newQuestions);

    if (
      selectedStepOption ===
      getCorrectAnswer(questions[currentQuestion].options)
    ) {
      setTimeout(function () {
        createAlert("correct");
      }, 0);

      const newQuestions = questions.filter((question) => {
        if (question === questions[currentQuestion]) {
          question.isPassed = true;
        }
        return question;
      });
      storeData(currentSubject, newQuestions);
      const data = getData(currentSubject);
      data.then((val) => {
        dispatch(loadQuestions(val));
      });
      let newUser = user;
      newUser.seed = user.seed + 10;
      dispatch(setUser(newUser));
      if (currentQuestion >= questions.length - 1) {
        dispatch(
          setCurrentQuestion({
            max: questions.length - 1,
            current: questions.length - 1,
          })
        );
      } else {
        dispatch(
          setCurrentQuestion({
            max: questions.length - 1,
            current: currentQuestion + 1,
          })
        );
      }
    } else {
      setTimeout(function () {
        createAlert("wrong");
      }, 0);

      const handleBuyHint = () => {
        if (questions[currentQuestion].hints.length > 0) {
          let count = 0;
          for (let i = 0; i < questions[currentQuestion].hints.length; i++) {
            if (questions[currentQuestion].hints[i].isBought === false) {
              function updateData() {
                const newQuestions = questions.filter((question) => {
                  if (question === questions[currentQuestion]) {
                    question.hints[i].isBought = true;
                  }
                  return question;
                });
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
                  console.log("insufficient seed");
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
      setTimeout(function () {
        handleBuyHint();
      }, 0);

      // const data = getData(getKeyQuestion(currentGrade));
      const data = getData(currentSubject);
      data.then((val) => {
        dispatch(loadQuestions(val));
      });
    }
  }

  let isNextQuestion = false;
  let isNextStep = false;
  if (questions[currentQuestion].Steps !== undefined) {
    if (currentSelect === questions[currentQuestion].Steps[questions[currentQuestion].Steps.length - 1]) {
      isNextQuestion = true;
    }
  }
  if (questions[currentQuestion].Steps !== undefined) {
    if (currentSelect === questions[currentQuestion].Steps[currentStep]) {
      isNextStep = true;
    }
  }
  return (
    <>
      {questions !== null && (
        <View style={styles.container}>
          {questions[currentQuestion].Steps[currentStep] &&
            isNextQuestion && (
              <Pressable
                onPressIn={() => setPressing(true)}
                onPressOut={() => {
                  setPressing(false);
                  nextQuestion();
                }}
                onHoverIn={() => setHovering(true)}
                onHoverOut={() => setHovering(false)}
              >
                {pressing && (
                  <Image source={nextClick} style={styles.nextQuestion} />
                )}
                {hovering && !pressing && (
                  <Image source={nextMouseover} style={styles.nextQuestion} />
                )}
                {!hovering && !pressing && (
                  <Image source={nextImage} style={styles.nextQuestion} />
                )}
              </Pressable>
            )}
          {questions[currentQuestion].Steps[currentStep] &&
            !isNextQuestion && (
              <Pressable
                onPressIn={() => setPressing(true)}
                onPressOut={() => {
                  setPressing(false);
                  nextStep();
                }}
                onHoverIn={() => setHovering(true)}
                onHoverOut={() => setHovering(false)}
              >
                {pressing && (
                  <Image source={nextClick} style={styles.nextStep} />
                )}
                {hovering && !pressing && (
                  <Image source={nextMouseover} style={styles.nextStep} />
                )}
                {!hovering && !pressing && (
                  <Image source={nextImage} style={styles.nextStep} />
                )}
              </Pressable>
            )}
        </View>
      )}
    </>
  );
};

export default Next;

const styles = StyleSheet.create({
  container: {},
  nextQuestion: {
    height: 40,
    width: 40,
  },
  nextStep: {
    height: 40,
    width: 40,
    transform: "rotate(90deg)",
  },
  disabled: {
    opacity: "50%",
    cursor: "default",
  },
});
