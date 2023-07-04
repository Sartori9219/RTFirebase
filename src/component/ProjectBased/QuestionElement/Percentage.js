import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function Percentage({ questions, currentQuestion, currentStep }) {
  let stepPercentage = 0;
  let countStepPassed = currentStep;
  // for (let i = 0; i < questions[currentQuestion]["Steps"].length; i++) {
  //   if (questions[currentQuestion]["Steps"][i].isPassed === true) {
  //     countStepPassed++;
  //   }
  // }

  stepPercentage =
    (countStepPassed / questions[currentQuestion]["Steps"].length) * 100;
  return (
    <View style={[styles.row, { flex: 4, justifyContent: "flex-end" }]}>
      <View style={{ width: "100%" }}>
        <View style={{ justifyContent: "center" }}>
          <View style={styles.progressBarBackground} />
          <View
            style={[
              styles.progressBarCompleted,
              {
                width: stepPercentage ? `${Math.ceil(stepPercentage)}%` : 0,
              },
            ]}
          />
          <View style={styles.boxTextPercentage}>
            <Text style={styles.textPercentage}>{`${Math.ceil(
              stepPercentage
            )}%`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Percentage;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "7px",
  },
  progressBarBackground: {
    width: "100%",
    height: 18,
    borderRadius: 50,
    backgroundColor: "#DEB4F2",
  },
  progressBarCompleted: {
    height: 18,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#A25ADC",
    position: "absolute",
  },
  boxTextPercentage: {
    position: "absolute",
    height: 18,
    justifyContent: "center",
  },
  textPercentage: {
    color: "#fff",
    textAlign: "left",
    padding: 0,
    marginLeft: 4,
    fontSize: 8,
    fontWeight: "400",
    fontSize: "90%",
  },
});
