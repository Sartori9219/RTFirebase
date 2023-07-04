import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../../../redux/actions/current-question";
import { setCurrentStep } from "../../../redux/actions/current-step";
import { setUser } from "../../../redux/actions/user";
import { storeData, getData } from "../../../redux/util/data";
import { loadQuestions } from "../../../redux/actions/questions";
import { getCorrectAnswer, getSubject } from "../../utils";
import DataContext from "../../ContextProvider/DataContext";
import { db } from "../../../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

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
  currentSubject,
  hintPrice,
  setCurrentSelect,
}) => {
  const { currentClass } = useContext(DataContext);

  const dispatch = useDispatch();
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const checkFailedAttemp = (answers, options) => {
    let failed = false;
    if (answers.length > 0) {
      for (let k = 0; k < answers.length; k++) {
        if (answers[k] !== getCorrectAnswer(options)) {
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
        if (answers[k] !== getCorrectAnswer(options)) {
          count++;
        }
      }
    }
    return count;
  };

  async function updateSteps(name, key) {
    const snapData = await getData(currentSubject);
    if (snapData) {
      let totalStepsMastered = 0;
      let totalStepsAttempted = 1;
      for (let i = 0; i < currentQuestion + 1; i++) {
        for (let j = 0; j < currentStep + 1; j++) {
          if (snapData[i].questions[j].answer !== undefined) {
            if (
              countFailedAttemp(
                snapData[i].questions[j].answer,
                snapData[i].questions[j].options
              ) <= 3
            ) {
              totalStepsMastered = totalStepsMastered + 1;
            }
          } else {
            if (
              !checkFailedAttemp(
                snapData[i].questions[j].answer,
                snapData[i].questions[j].options
              )
            ) {
              totalStepsMastered = totalStepsMastered + 1;
            }
          }
          totalStepsAttempted = totalStepsAttempted + 1;
        }
      }

      try {
        const docRef = doc(db, "class", key);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          for (let i = 0; i < docSnap.data().details.length; i++) {
            if (
              docSnap.data().details[i].name.toLowerCase() ===
              name.toLowerCase()
            ) {
              const current = docSnap.data().details;
              current[i] = {
                ...current[i],
                stepsAttempted: totalStepsAttempted,
                stepsMastered: totalStepsMastered,
              };
              await updateDoc(docRef, {
                details: current,
              });
              break;
            }
          }
        }
      } catch (e) {
        console.log("failed: ", e);
      }
    }
  }

  const currentIsPassed = () => {
    let current = false;
    if (questions[currentQuestion].questions[currentStep].answer.length > 0) {
      for (
        let i = 0;
        i < questions[currentQuestion].questions[currentStep].answer.length;
        i++
      ) {
        if (
          questions[currentQuestion].questions[currentStep].answer[i] ===
          getCorrectAnswer(
            questions[currentQuestion].questions[currentStep].options
          )
        ) {
          current = true;
          break;
        }
      }
    }
    return current;
  };
  const nextStep = () => {
    if (questions !== null) {
      let current = false;
      if (
        questions[currentQuestion].questions[currentStep].answer !== undefined
      ) {
        if (
          questions[currentQuestion].questions[currentStep].answer.length > 0
        ) {
          for (
            let i = 0;
            i < questions[currentQuestion].questions[currentStep].answer.length;
            i++
          ) {
            if (
              questions[currentQuestion].questions[currentStep].answer[i] ===
              getCorrectAnswer(
                questions[currentQuestion].questions[currentStep].options
              )
            ) {
              current = true;
              break;
            }
          }
        }
      }

      const newQuestions = questions.filter((question) => {
        if (question === questions[currentQuestion]) {
          if (
            current ||
            selectedStepOption ===
            getCorrectAnswer(
              questions[currentQuestion].questions[currentStep].options
            )
          ) {
            // updateSteps(currentClass.name, currentClass.key);
            updateSteps(currentQuestion, currentSubject);
            question.questions[currentStep].isPassed = true;
            // if (currentStep === questions[currentQuestion].questions.length - 1) {
            //   question.isPassed = true;
            // }
          }
          question.questions[currentStep].answer !== undefined
            ? (question.questions[currentStep].answer = [
              ...question.questions[currentStep].answer,
              selectedStepOption,
            ])
            : (question.questions[currentStep].answer = [selectedStepOption]);
        }
        return question;
      });
      // storeData(getKeyQuestion(currentGrade), newQuestions);
      storeData(currentSubject, newQuestions);

      if (
        current ||
        selectedStepOption ===
        getCorrectAnswer(
          questions[currentQuestion].questions[currentStep].options
        )
      ) {
        setTimeout(function () {
          createAlert("correct");
        }, 0);

        let newUser = user;
        newUser.seed = user.seed + 10;
        dispatch(setUser(newUser));

        setTimeout(function () {
          dispatch(
            setCurrentStep({
              max: questions[currentQuestion].questions.length - 1,
              current: currentStep + 1,
            })
          );
        }, 0);
      } else {
        setTimeout(function () {
          createAlert("wrong");
        }, 0);
        const handleBuyHint = () => {
          if (
            questions[currentQuestion].questions[currentStep].hints.length > 0
          ) {
            let count = 0;
            for (
              let i = 0;
              i <
              questions[currentQuestion].questions[currentStep].hints.length;
              i++
            ) {
              if (
                questions[currentQuestion].questions[currentStep].hints[i]
                  .isBought === false
              ) {
                function updateData() {
                  const newQuestions = questions.filter((question) => {
                    if (question === questions[currentQuestion]) {
                      question.questions[currentStep].hints[i].isBought = true;
                    }
                    return question;
                  });
                  // ("new data: ", newQuestions);
                  // storeData(getKeyQuestion(currentGrade), newQuestions);
                  // const data = getData(getKeyQuestion(currentGrade));
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
                if (
                  count ===
                  questions[currentQuestion].questions[currentStep].hints.length
                ) {
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

        createAlert("wrong");

        // const data = getData(getKeyQuestion(currentGrade));
        const data = getData(currentSubject);
        data.then((val) => {
          dispatch(loadQuestions(val));
        });
      }

      setSelectedStepOption(null);
      setCurrentSelect();
    }
  };

  const nextQuestion = () => {
    const newQuestions = questions.filter((question) => {
      if (question === questions[currentQuestion]) {
        question.isPassed = true;
      }
      return question;
    });
    // storeData(getKeyQuestion(currentGrade), newQuestions);
    storeData(currentSubject, newQuestions);

    if (currentQuestion >= questions.length - 1) {
      dispatch(
        setCurrentQuestion({
          max: questions.length - 1,
          current: questions.length - 1,
        })
      );
      dispatch(
        setCurrentStep({
          max: questions[currentQuestion].questions.length - 1,
          current: questions[currentQuestion].questions.length - 1,
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
          max: questions[currentQuestion].questions.length - 1,
          current: 0,
        })
      );
    }
  };

  let isNextQuestion;
  if (questions !== null) {
    if (
      questions[currentQuestion].questions.length - 1 === currentStep &&
      questions[currentQuestion].questions[currentStep].isPassed
    ) {
      isNextQuestion = true;
    } else {
      isNextQuestion = false;
    }
  }
  return (
    <>
      {questions !== null && (
        <View style={styles.container}>
          {questions[currentQuestion].questions[currentStep] &&
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
          {questions[currentQuestion].questions[currentStep] &&
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
