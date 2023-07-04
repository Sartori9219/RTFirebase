import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatBreakLine } from "../../utils";
import HintBox from "./HintBox";
import Options from "./Options";
import StandaloneOptions from "../StandaloneOptions";

function ItemStep({
  item,
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
  return (
    <>
      {questions[currentStep].steps !== undefined && (
        <View style={styles.step} key={item.key}>
          <Text style={styles.title}>{`Step ${item.step + 1}`}</Text>
          <Text style={styles.question}>{formatBreakLine(item.question)}</Text>
          <View style={styles.row}>
            <Options
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
            <HintBox hints={item.hints} />
          </View>
        </View>
      )}

      <View style={styles.row}>
        {/* <StandaloneOptions
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
        /> */}
        {/* <HintBox hints={item.hints} /> */}
      </View>
    </>
  );
}

export default ItemStep;

const styles = StyleSheet.create({
  step: {
    marginTop: 16,
  },
  title: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#A25ADC",
  },
  question: {
    paddingBottom: 24,
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    lineHeight: "120%",
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
