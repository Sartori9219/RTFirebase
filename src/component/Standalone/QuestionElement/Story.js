import React from "react";
import { Text, View } from "react-native";
import { formatQuestion } from "../../utils";
import Chat from "./Chat";

function Story({ questions, currentQuestion }) {
  return (
    <View style={{ paddingVertical: 16 }}>
      {Array.isArray(questions[currentQuestion].question) && (
        <Chat questions={questions} currentQuestion={currentQuestion} />
      )}

      {!Array.isArray(questions[currentQuestion].question) && (
        <Text
          style={{
            paddingHorizontal: 16,
            paddingBottom: 24,
            fontWeight: "400",
            fontSize: "120%",
            color: "#1D232E",
            lineHeight: "120%",
          }}
        >
          {formatQuestion(questions[currentQuestion].question)}
        </Text>
      )}
    </View>
  );
}

export default Story;
