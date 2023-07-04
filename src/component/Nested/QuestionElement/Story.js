import React from "react";
import { StyleSheet, Text } from "react-native";
import { formatQuestion } from "../../utils";

function Story({ story }) {
  return (
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
      {formatQuestion(story)}
    </Text>
  );
}

export default Story;
