import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { getCorrectAnswer } from "../../utils";
const checkMarkImage = "assets/checkmark.svg";

function Dots({ questions, currentQuestion }) {
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
  return (
    <>
      {Array.isArray(questions[currentQuestion]) && (
        <View style={[styles.row, { flex: 4, alignItems: "flex-start" }]}>
          <View
            style={[
              styles.row,
              {
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                flexFlow: "wrap",
              },
            ]}
          >
            {questions.map((question, index) => {
              let wrong = 0;
              if (question.isPassed === true) {
                for (let i = 0; i < question.steps.length; i++) {
                  if (
                    checkFailedAttemp(
                      question.steps[i].answer,
                      question.steps[i].options
                    )
                  ) {
                    wrong =
                      wrong +
                      countFailedAttemp(
                        question.steps[i].answer,
                        question.steps[i].options
                      );
                  }
                }
                return (
                  <View key={index}>
                    {wrong > 3 ? (
                      <View style={styles.dot} />
                    ) : (
                      <Image source={checkMarkImage} style={styles.checkMark} />
                    )}
                  </View>
                );
              } else {
                if (currentQuestion === index) {
                  return <View key={index} style={styles.dotCurrent} />;
                } else {
                  return <View key={index} style={styles.dot} />;
                }
              }
            })}
          </View>
        </View>
      )}

      {!Array.isArray(questions[currentQuestion]) && (
        <View style={[styles.row, { flex: 4, alignItems: "flex-start" }]}>
          <View
            style={[
              styles.row,
              {
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                flexFlow: "wrap",
              },
            ]}
          >
            {questions.map((question, index) => {
              let wrong = 0;
              if (question.isPassed === true) {
                for (let i = 0; i < question.length; i++) {
                  if (
                    checkFailedAttemp(question[i].answer, question[i].options)
                  ) {
                    wrong =
                      wrong +
                      countFailedAttemp(
                        question[i].answer,
                        question[i].options
                      );
                  }
                }
                return (
                  <View key={index}>
                    {wrong > 3 ? (
                      <View style={styles.dot} />
                    ) : (
                      <Image source={checkMarkImage} style={styles.checkMark} />
                    )}
                  </View>
                );
              } else {
                if (currentQuestion === index) {
                  return <View key={index} style={styles.dotCurrent} />;
                } else {
                  return <View key={index} style={styles.dot} />;
                }
              }
            })}
          </View>
        </View>
      )}
    </>
  );
}

export default Dots;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "7px",
  },
  dot: {
    border: "2px solid #A25ADC",
    height: "4px",
    width: "4px",
    borderRadius: "50%",
  },
  dotCurrent: {
    border: "4px solid #A25ADC",
    height: "13px",
    width: "13px",
    borderRadius: "50%",
  },
  checkMark: {
    height: "13px",
    width: "13px",
    resizeMode: "contain",
  },
});
