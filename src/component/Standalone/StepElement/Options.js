import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { formatBreakLine } from "../../utils";
import TimeOutPressButton from "./TimeOutPressButton";
const checkMarkImage = "assets/checkmark.svg";
const crossMarkImage = "assets/crossmark.svg";

const ws = Dimensions.get("window").width;

function Options({
  item,
  setSelectedStepOption,
  currentSelect,
  setCurrentSelect,
}) {
  const onPress = (data) => {
    setSelectedStepOption(data);
    setCurrentSelect(data);
  };
  const getBorderColor = (current, correct, answer) => {
    let result;
    if (correct === answer) {
      if (current === answer) {
        result = "#01BA03";
      } else {
        result = "#D3D3D3";
      }
    } else {
      if (current === answer) {
        result = "#FF0000";
      } else {
        if (current === correct) {
          result = "#01BA03";
        } else {
          result = "#D3D3D3";
        }
      }
    }
    return result;
  };

  const getMarker = (current, correct, answer) => {
    let result;
    const check = <Image source={checkMarkImage} style={styles.checkMark} />;
    const cross = <Image source={crossMarkImage} style={styles.checkMark} />;
    const dot = <View style={styles.dot} />;
    // if (correct === answer) {
    //   result = check;
    // } else {
    //   if (current === answer) {
    //     result = cross;
    //   } else {
    //     result = dot;
    //   }
    // }
    if (correct === answer) {
      if (current === answer) {
        result = check;
      } else {
        result = dot;
      }
    } else {
      if (current === answer) {
        result = cross;
      } else {
        if (current === correct) {
          result = check;
        } else {
          result = dot;
        }
      }
    }
    return result;
  };

  return (
    <>
      {item.options &&
        item.options.map((data, index) => {
          let current = null;
          for (let i = 0; i < item.answer.length; i++) {
            if (item.answer[i] === data) {
              current = item.answer[i];
            }
          }

          return current !== null && current !== item.correct ? (
            <View
              key={`step${data}`}
              style={[
                styles.item,
                {
                  borderColor: getBorderColor(
                    data,
                    item.correct,
                    current,
                    item.isPassed
                  ),
                  borderWidth: data === currentSelect ? "1px" : "1px",
                },
              ]}
            >
              <View style={styles.rowItem}>
                {/* <Image source={`assets/${data.image}`} style={styles.image} /> */}
                <View style={{ width: "100%", paddingRight: 24 }}>
                  <Text style={[styles.description, { textAlign: "center" }]}>
                    {formatBreakLine(data)}
                  </Text>
                </View>
                <View style={{ marginLeft: -16 }}>
                  {getMarker(data, item.correct, current)}
                </View>
              </View>
            </View>
          ) : !item.isPassed ? (
            <TimeOutPressButton
              key={`step${data}`}
              data={data}
              currentSelect={currentSelect}
              formatBreakLine={formatBreakLine}
              checkMarkImage={checkMarkImage}
              setSelectedStepOption={setSelectedStepOption}
              setCurrentSelect={setCurrentSelect}
            />
          ) : (
            <View
              key={`step${data}`}
              style={[
                styles.item,
                {
                  borderColor: getBorderColor(
                    data,
                    item.correct,
                    current,
                    item.isPassed
                  ),
                  borderWidth: data === currentSelect ? "1px" : "1px",
                },
              ]}
            >
              <View style={styles.rowItem}>
                {/* <Image source={`assets/${data.image}`} style={styles.image} /> */}
                <View style={{ width: "100%", paddingRight: 24 }}>
                  <Text style={[styles.description, { textAlign: "center" }]}>
                    {formatBreakLine(data)}
                  </Text>
                </View>
                <View style={{ marginLeft: -16 }}>
                  {getMarker(data, item.correct, current)}
                </View>
              </View>
            </View>
          );
        })}
    </>
  );
}

export default Options;
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
    // flex: ws > 960 ? 3 : ws > 600 ? 2 : 1,
    // padding: 8,
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
