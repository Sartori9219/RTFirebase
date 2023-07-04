import React from "react";
import { StyleSheet, View, Image } from "react-native";

function Bubble({ questions, currentQuestion }) {
  function getBubble(question) {
    let result = "";
    if (question.indexOf("[") === -1) {
      result = false;
    } else {
      let temp1 = question.split("[");
      let temp2 = temp1[1].split("]");
      result = "assets/bubbles/" + temp2[0] + ".gif";
    }

    return result;
  }
  return (
    <>
      {getBubble(questions[currentQuestion].problem) ? (
        <View style={[styles.row, { flex: 1, justifyContent: "center" }]}>
          <View style={styles.bubble}>
            <Image
              source={getBubble(questions[currentQuestion].problem)}
              style={styles.bubbleImage}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.row, { flex: 1, justifyContent: "center" }]}>
          <View
            style={{
              position: "relative",
              top: -36,
              width: 50,
              height: 50,
              borderRadius: 50,
              zIndex: 1,
            }}
          ></View>
        </View>
      )}
    </>
  );
}

export default Bubble;

const styles = StyleSheet.create({
  bubble: {
    position: "relative",
    top: -36,
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
    zIndex: 1,
  },
  bubbleImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "7px",
  },
});
