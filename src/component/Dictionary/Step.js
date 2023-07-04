import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import StandaloneOptions from "./StandaloneOptions";
import { getCorrectAnswer } from "../utils";
import { useDispatch, useSelector } from "react-redux";

function Step({
  questions,
  currentQuestion,
  currentStep,
  setSelectedStepOption,
  currentSelect,
  setCurrentSelect,
  pressEnd,
  setPressEnd,
  modalVisible,
  setModalVisible
}) {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const updateData = async () => {
      if (questions) {
        if (
          questions[currentQuestion].options &&
          questions[currentQuestion].hints
        ) {
          let correct;
          let isPassed;
          let answer = [];
          for (let i = 0; i < questions[currentQuestion].options.length; i++) {
            if (
              questions[currentQuestion].options[i] ===
              getCorrectAnswer(questions[currentQuestion].options)
            ) {
              correct = questions[currentQuestion].options[i];
            }
          }

          if (questions[currentQuestion].isPassed !== undefined) {
            isPassed = questions[currentQuestion].isPassed;
          } else {
            isPassed = false;
          }

          if (questions[currentQuestion].answer !== undefined) {
            answer = [...questions[currentQuestion].answer];
          } else {
            answer = [];
          }
          setData({
            question: [...questions[currentQuestion]["question"]],
            options: [...questions[currentQuestion].options],
            hints: [...questions[currentQuestion].hints],
            answer: answer,
            correct: correct,
            isPassed: isPassed,
          });
        }
        if (isMounted) {
          setSelectedStepOption(null);
          setCurrentSelect();
        }
      }
    };

    updateData();

    return () => {
      isMounted = false;
    };
  }, [questions, currentQuestion]);

  return (
    <View style={styles.container}>
      <StandaloneOptions
        item={data}
        currentStep={currentStep}
        setSelectedStepOption={setSelectedStepOption}
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
        pressEnd={pressEnd}
        setPressEnd={setPressEnd}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

export default Step;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  }
});
