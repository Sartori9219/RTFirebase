import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Options from "./StepElement/Options";
import HintBox from "./StepElement/HintBox";

const ws = Dimensions.get("window").width;

function StandaloneOptions({
  user,
  questions,
  currentGrade,
  currentQuestion,
  item,
  currentStep,
  setSelectedStepOption,
  selectedStepOption,
  currentSelect,
  setCurrentSelect,
  pressEnd,
  setPressEnd,
  modalVisible,
  setModalVisible
}) {
  return (
    <>
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
          pressEnd={pressEnd}
          setPressEnd={setPressEnd}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <HintBox hints={item.hints} />
      </View>
    </>
  );
}

export default StandaloneOptions;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 12,
  },
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
  description: {
    fontWeight: "400",
    fontSize: "90%",
    color: "#1D232E",
    paddingRight: 8,
    lineHeight: "120%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 32,
    padding: 16,
    paddingTop: 40
    // flex: ws > 960 ? 3 : ws > 600 ? 2 : 1,
    // paddingHorizontal: 32,
    // minHeight: 60
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: ws > 960 ? ws / 3 - 80 : ws > 600 ? ws / 2 - 80 : ws - 80,
    padding: 8,
    flexGrow: 0,
    minHeight: 60,
    paddingHorizontal: 16,
  },
  item: {
    marginVertical: 8,
    borderRadius: 8,
    borderColor: "#D3D3D3",
    backgroundColor: "#fff",
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 16,
    boxSizing: "border-box",
  },
  hint: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    padding: 16,
    textAlign: "center",
  },
  hintDescription: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    lineHeight: "120%",
  },
  imageBox: {
    maxHeight: 180,
  },
  image: {
    maxHeight: 180,
    minHeight: 60,
    width: 40,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  dot: {
    border: "1px solid #D3D3D3",
    height: 16,
    width: 16,
    borderRadius: 50,
  },
  checkMark: {
    height: 16,
    width: 16,
    resizeMode: "object-fit",
  },
  hintImage: {
    minHeight: 40,
    maxWidth: 300,
    resizeMode: "contain",
  },
});
