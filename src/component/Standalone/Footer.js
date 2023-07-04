import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import Hint from "./FooterElement/Hint";
import Next from "./FooterElement/Next";
const hs = Dimensions.get("window").height;
function Footer({
  user,
  questions,
  currentQuestion,
  currentStep,
  currentGrade,
  selectedStepOption,
  setSelectedStepOption,
  hintPrice,
  setCurrentSelect,
  currentSubject,
}) {
  function randomCelebration(status) {
    const min = 1;
    const max = status === "correct" ? 5 : 4;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    const result = "assets/answer_" + status + "_" + number + ".gif";
    return result;
  }

  const [alertCorrect, setAlertCorrect] = useState(false);
  const [alertWrong, setAlertWrong] = useState(false);
  const createAlert = (answer) => {
    answer === "correct" ? setAlertCorrect(true) : setAlertWrong(true);
    setTimeout(function () {
      answer === "correct" ? setAlertCorrect(false) : setAlertWrong(false);
    }, 1500);
  };

  return (
    <View style={styles.row}>
      <Hint
        user={user}
        questions={questions}
        currentQuestion={currentQuestion}
        currentStep={currentStep}
        currentGrade={currentGrade}
        currentSubject={currentSubject}
        hintPrice={hintPrice}
      />
      {alertCorrect && (
        <View style={styles.alertBoxCorrect}>
          <Image
            style={styles.alertCorrect}
            source={randomCelebration("correct")}
          />
        </View>
      )}
      {alertWrong && (
        <View style={styles.alertBoxWrong}>
          <Image
            style={styles.alertWrong}
            source={randomCelebration("wrong")}
          />
        </View>
      )}
      <Next
        user={user}
        questions={questions}
        currentQuestion={currentQuestion}
        currentStep={currentStep}
        currentGrade={currentGrade}
        selectedStepOption={selectedStepOption}
        setSelectedStepOption={setSelectedStepOption}
        hintPrice={hintPrice}
        createAlert={createAlert}
        setCurrentSelect={setCurrentSelect}
        currentSubject={currentSubject}
      />
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 26,
  },
  alertBoxCorrect: {
    height: "72px",
    width: "72px",
    position: "absolute",
    zIndex: 2,
    right: "72px",
    bottom: "-14px",
    justifyContent: "center",
  },
  alertBoxWrong: {
    height: "72px",
    width: "72px",
    position: "absolute",
    zIndex: 2,
    right: "72px",
    bottom: "0px",
    justifyContent: "center",
  },
  alertCorrect: {
    height: "72px",
    width: "72px",
    alignSelf: "center",
  },
  alertWrong: {
    height: "72px",
    width: "72px",
    alignSelf: "center",
  },
});
