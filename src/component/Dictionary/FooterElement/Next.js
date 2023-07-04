import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../../../redux/actions/current-question";
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
  userData,
  questions,
  currentQuestion,
  createAlert,
  selectedStepOption,
  hintPrice,
  currentSubject,
  pressEnd,
  setPressEnd,
  modalVisible,
  setModalVisible
}) => {
  const { currentClass } = useContext(DataContext);

  const dispatch = useDispatch();
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  async function updateSteps(name, key) {
    const docRef = doc(db, "class", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      for (let i = 0; i < docSnap.data().details.length; i++) {
        if (
          docSnap.data().details[i].name.toLowerCase() === name.toLowerCase()
        ) {
          const current = docSnap.data().details;
          current[i] = {
            ...current[i],
            stepsAttempted: currentQuestion + 2,
            stepsMastered: currentQuestion + 1,
          };
          await updateDoc(docRef, {
            details: current,
          });
          break;
        }
      }
    }
  }

  function nextQuestionStandalone() {
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
      updateSteps(currentQuestion, currentSubject);
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
      let newUser = userData;
      newUser.seed = userData.seed + 10;
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
                if (userData.seed < hintPrice) {
                  console.log("insufficient seed");
                } else {
                  updateData();
                  let newUser = userData;
                  newUser.seed = userData.seed - 10;
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
    setPressEnd([]);
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPressIn={() => setPressing(true)}
          onPressOut={() => {
            setPressing(false);
            nextQuestionStandalone();
          }}
          onHoverIn={() => setHovering(true)}
          onHoverOut={() => setHovering(false)}
        >
          {pressing && <Image source={nextClick} style={styles.nextQuestion} />}
          {hovering && !pressing && (
            <Image source={nextMouseover} style={styles.nextQuestion} />
          )}
          {!hovering && !pressing && (
            <Image source={nextImage} style={styles.nextQuestion} />
          )}
        </Pressable>
      </View>
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

// <Pressable
//           onPress={() => {
//             // lastStep ? nextQuestion() : nextStep();
//             getCorrectId(
//               questions[currentQuestion].steps[currentStep].options
//             ) === questions[currentQuestion].steps[currentStep].answer ||
//             currentIsPassed()
//               ? next()
//               : selectedStepOption === null
//               ? console.log("select an answer")
//               : next();
//           }}
//           onPressIn={() => setPressing(true)}
//           onPressOut={() => setPressing(false)}
//           onHoverIn={() => setHovering(true)}
//           onHoverOut={() => setHovering(false)}
//         >
//           {selectedStepOption !== null ||
//           getCorrectId(
//             questions[currentQuestion].steps[currentStep].options
//           ) === questions[currentQuestion].steps[currentStep].answer ||
//           currentIsPassed() ? (
//             pressing ? (
//               <Image
//                 source={nextClick}
//                 style={[
//                   lastStep ? styles.nextQuestion : styles.nextStep,
//                   selectedStepOption === null &&
//                   getCorrectId(
//                     questions[currentQuestion].steps[currentStep].options
//                   ) !== questions[currentQuestion].steps[currentStep].answer &&
//                   !currentIsPassed()
//                     ? styles.disabled
//                     : null,
//                 ]}
//               />
//             ) : hovering ? (
//               <Image
//                 source={nextMouseover}
//                 style={[
//                   lastStep ? styles.nextQuestion : styles.nextStep,
//                   selectedStepOption === null &&
//                   getCorrectId(
//                     questions[currentQuestion].steps[currentStep].options
//                   ) !== questions[currentQuestion].steps[currentStep].answer
//                     ? styles.disabled
//                     : null,
//                 ]}
//               />
//             ) : (
//               <Image
//                 source={nextImage}
//                 style={[
//                   lastStep ? styles.nextQuestion : styles.nextStep,
//                   selectedStepOption === null &&
//                   getCorrectId(
//                     questions[currentQuestion].steps[currentStep].options
//                   ) !== questions[currentQuestion].steps[currentStep].answer
//                     ? styles.disabled
//                     : null,
//                 ]}
//               />
//             )
//           ) : (
//             <Image
//               source={nextImage}
//               style={[
//                 lastStep ? styles.nextQuestion : styles.nextStep,
//                 selectedStepOption === null &&
//                 getCorrectId(
//                   questions[currentQuestion].steps[currentStep].options
//                 ) !== questions[currentQuestion].steps[currentStep].answer
//                   ? styles.disabled
//                   : null,
//               ]}
//             />
//           )}
//         </Pressable>
