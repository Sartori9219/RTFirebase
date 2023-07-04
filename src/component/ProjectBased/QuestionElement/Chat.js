import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import ImageHolder from "./ImageHolder";

function Chat({ questions, currentQuestion }) {
  return (
    <>
      <View style={{ alignItems: "center", paddingHorizontal: 16 }}>
        <ImageHolder path={"assets/dictionary/people_1.gif"} />
        <View style={styles.bubble}>
          {questions[currentQuestion].question.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <View key={index}>
                  <ImageHolder path={"assets/dictionary/bubble_1.png"} />
                  <View style={styles.textBubbleContainer}>
                    <Text style={styles.textBubble}>{item}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.bottomBubble}>
                  <ImageHolder path={"assets/dictionary/bubble_1.png"} />
                  <View
                    style={[
                      styles.textBubbleContainer,
                      styles.textBottomBubble,
                    ]}
                  >
                    <Text style={styles.textBubble}>{item}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </View>
    </>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 64,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  textLogo: {
    fontSize: 32,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
  },

  //Dictionary
  people: {},
  bubble: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  bottomBubble: {
    transform: "rotate(180deg)",
  },
  textBubbleContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexWrap: "wrap",
    padding: 16,
  },
  textBubble: {
    textAlign: "center",
    fontSize: 11,
  },
  textBottomBubble: { transform: "rotate(180deg)" },
});
