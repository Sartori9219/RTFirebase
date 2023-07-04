import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const ws = Dimensions.get("window").width;
const hs = Dimensions.get("window").height;
function Background(props) {
  return (
    <>
      <View
        style={[
          styles.circles,
          {
            width: hs * 0.2,
            height: hs * 0.2,
            top: 0 - hs * 0.02,
            left: 0 - ws * 0.08,
          },
        ]}
      />
      <View
        style={[
          styles.circles,
          {
            width: ws * 0.28,
            height: ws * 0.28,
            top: 0 - hs * 0.3 * 0.4,
            left: ws * 0.5 - ws * 0.2,
          },
        ]}
      />
      <View
        style={[
          styles.circles,
          {
            width: hs * 0.1,
            height: hs * 0.1,
            top: hs * 0.03,
            right: hs * 0.3 * 0.28,
          },
        ]}
      />
      <View
        style={[
          styles.circles,
          {
            width: hs * 0.35,
            height: hs * 0.35,
            top: hs * 0.05,
            right: 0 - hs * 0.27,
          },
        ]}
      />
    </>
  );
}

export default Background;

const styles = StyleSheet.create({
  circles: {
    backgroundColor: "#AE66E4",
    position: "absolute",
    borderRadius: "50%",
  },
});
