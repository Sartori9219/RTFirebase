import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ItemStep from "./StepElement/ItemStep";
import Footer from "./Footer";

function Step({
  user,
  questions,
  currentGrade,
  currentQuestion,
  currentStep,
  selectedStepOption,
  setSelectedStepOption,
  currentSelect,
  setCurrentSelect,
}) {
  const [dataStep, setDataStep] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);
  // const [selectedStepOption, setSelectedStepOption] = useState();
  useEffect(() => {
    if (questions !== null) {
      const mergeOption = async () => {
        let steps = [];
        for (let i = 0; i <= currentStep; i++) {
          let stepOption = [];
          let hints = [];
          let correct = 0;
          if (questions[currentQuestion].questions[i]) {
            stepOption = questions[currentQuestion].questions[i].options;
            stepOption = Array.from(new Set(stepOption));
            for (
              let k = 0;
              k < questions[currentQuestion].questions[i].options.length;
              k++
            ) {
              if (
                questions[currentQuestion].questions[i].options[k].toLowerCase().includes("(correct answer)")
              ) {
                correct = questions[currentQuestion].questions[i].options[k];
              }
            }

            if (questions[currentQuestion].questions[i].hints.length > 0) {
              for (
                let j = 0;
                j < questions[currentQuestion].questions[i].hints.length;
                j++
              ) {
                if (
                  questions[currentQuestion].questions[i].hints[j].isBought ===
                  true
                ) {
                  hints.push(
                    questions[currentQuestion].questions[i].hints[j].hint
                  );
                } else {
                  break;
                }
              }
            }

            steps.push({
              question: questions[currentQuestion].questions[i].question,
              answer: questions[currentQuestion].questions[i].answer,
              correct: correct,
              step: i,
              options: stepOption,
              isPassed: questions[currentQuestion].questions[i].isPassed,
              hints: hints,
            });
          }
        }
        setDataStep(steps);
        setDataLoaded(false);
      };
      const onPageLoad = () => {
        if (dataLoaded) {
          mergeOption();
        }
      };

      if (document.readyState === "complete") {
        onPageLoad();
        setDataLoaded(true);
      } else {
        window.addEventListener("load", onPageLoad, false);
        return () => window.removeEventListener("load", onPageLoad);
      }
    }
  }, [currentGrade, currentQuestion, questions, currentStep, dataLoaded]);

  const renderItemStep = ({ item }) => {
    return (
      <ItemStep
        item={item}
        user={user}
        questions={questions}
        currentGrade={currentGrade}
        currentQuestion={currentQuestion}
        currentStep={currentStep}
        selectedStepOption={selectedStepOption}
        setSelectedStepOption={setSelectedStepOption}
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />
    );
  };

  const preparedDataStep = dataStep.map((item, index) => {
    const key = index;
    const question = item.question;
    const step = item.step;
    const options = item.options;
    const answer = item.answer;
    const correct = item.correct;
    const isPassed = item.isPassed;
    const hints = item.hints;
    return {
      key: key,
      step: step,
      question: question,
      options: options,
      answer: answer,
      correct: correct,
      isPassed: isPassed,
      hints: hints,
    };
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={preparedDataStep}
        renderItem={renderItemStep}
        keyExtractor={(item) => item.key}
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
});
