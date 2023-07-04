import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable, Text } from "react-native";
import ItemStep from "./StepElement/ItemStep";
import Footer from "./Footer";
import Options from "./StepElement/Options";
import HintBox from "./StepElement/HintBox";
import StandaloneOptions from "./StandaloneOptions";
import {
  getCorrectAnswer,
  getOptionsAndHints,
  formatBreakLine,
} from "../utils";
import { loadQuestions } from "../../redux/actions/questions";
import { getKeyQuestion } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../../redux/util/data";

function Step({
  user,
  questions,
  currentSubject,
  currentQuestion,
  currentGrade,
  currentStep,
  selectedStepOption,
  setSelectedStepOption,
  currentSelect,
  setCurrentSelect,
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

  // const renderOption = ({ item }) => {
  //   return (
  //     <ItemStep
  //       item={item}
  //       user={user}
  //       questions={questions}
  //       currentGrade={currentGrade}
  //       currentSubject={currentSubject}
  //       currentQuestion={currentQuestion}
  //       currentStep={currentStep}
  //       selectedStepOption={selectedStepOption}
  //       setSelectedStepOption={setSelectedStepOption}
  //       currentSelect={currentSelect}
  //       setCurrentSelect={setCurrentSelect}
  //     />
  //   );
  // };

  // const preparedDataStep = data.map((item, index) => {
  //   const question = item.question;
  //   const options = item.options;
  //   const answer = item.answer;
  //   const correct = item.correct;
  //   const isPassed = item.isPassed;
  //   const hints = item.hints;
  //   return {
  //     key: index,
  //     question: question,
  //     options: options,
  //     answer: answer,
  //     correct: correct,
  //     isPassed: isPassed,
  //     hints: hints,
  //   };
  // });

  return (
    <View style={styles.container}>
      {/* {renderOption({ item: data })} */}

      <StandaloneOptions
        item={data}
        currentStep={currentStep}
        setSelectedStepOption={setSelectedStepOption}
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />
    </View>
  );
}

export default Step;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 72,
    marginHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 32,
    // flex: ws > 960 ? 3 : ws > 600 ? 2 : 1,
    // padding: 8,
    // paddingHorizontal: 32,
    // minHeight: 60
  },
});
