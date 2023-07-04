import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../../redux/actions/current-question";
import { setCurrentStep } from "../../redux/actions/current-step";
import { setMergeStepOption } from "../../redux/actions/merge-step-option";
import { useEffect, useState } from "react";
import { storeData, getData } from "../../redux/util/data";
import { loadQuestions } from "../../redux/actions/questions";
import Bubble from "./QuestionElement/Bubble";
import Percentage from "./QuestionElement/Percentage";
import Dots from "./QuestionElement/Dots";
import Story from "./QuestionElement/Story";

const checkMarkImage = "assets/checkmark.svg";
const crossMarkImage = "assets/crossmark.svg";
const leftOptionBackgroundImage = "assets/leftOption_overLightBackground.png";
const rightOptionBackgroundImage = "assets/rightOption_overLightBackground.png";

const Question = ({ questions, currentQuestion, currentStep }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Dots questions={questions} currentQuestion={currentQuestion} />
          <Bubble questions={questions} currentQuestion={currentQuestion} />
          <Percentage questions={questions} currentStep={currentStep} currentQuestion={currentQuestion} />
        </View>
        <Story questions={questions} currentQuestion={currentQuestion} />
      </View>
    </>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: -50,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "7px",
  },
});
