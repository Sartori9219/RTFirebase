import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable, Text } from "react-native";
import ItemStep from "./StepElement/ItemStep";
import Footer from "./Footer";
import HintBox from "./StepElement/HintBox";
import {
  getCorrectAnswer,
  getOptionsAndHints,
  formatBreakLine,
} from "../utils";
import { loadQuestions } from "../../redux/actions/questions";
import { getKeyQuestion } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../../redux/util/data";
import StandaloneOptions from "./StandaloneOptions";

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
  imageSrc,
  setImageSrc,
  queList,
  setQueList
}) {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const updateData = async () => {
      if (questions) {
        if (
          questions[currentQuestion]["Steps"]
        ) {
          let isPassed;
          if (questions[currentQuestion].isPassed !== undefined) {
            isPassed = questions[currentQuestion].isPassed;
          } else {
            isPassed = false;
          }
          const options = questions[currentQuestion]["Steps"].map((step, index) => {
            if (index <= currentStep); return step;
          })
          setData({
            options: [...questions[currentQuestion]["Steps"]],
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
        currentQuestion={currentQuestion}
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        queList={queList}
        setQueList={setQueList}
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
