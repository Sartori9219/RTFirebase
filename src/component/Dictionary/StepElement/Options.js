import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  FlatList,
  Dimensions,
  Modal,
  modalVisible,
  setModalVisible
} from "react-native";
import TimeOutButton from './TimeOutButton';
import { formatBreakLine } from "../../utils";

import Footer from "../Footer";
const checkMarkImage = "assets/checkmark.svg";
const crossMarkImage = "assets/crossmark.svg";
const ws = Dimensions.get("window").width;

function Options({
  item,
  currentStep,
  setSelectedStepOption,
  currentSelect,
  setCurrentSelect,
  pressEnd,
  setPressEnd,
  modalVisible,
  setModalVisible
}) {
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
  const getHint = (option) => {
    let a = item.hints.filter(hint => {
      return hint.description.split(":")[0] === option
    });
    return a;
  }
  var deText = '';
  var term = '';
  if (item.hints) {
    item.hints.forEach(hint => {
      if (hint.description.includes('correct answer')) {
        deText = hint.description.split(":")[1];
        term = hint.description.split(":")[0].split("(")[0].trim();
      }
    });
  }
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
              <View style={{ flexDirection: "row" }}>
                <View style={styles.description}>
                  <Text>
                    {formatBreakLine(data)}
                  </Text>
                </View>
                <View style={{ marginTop: 3 }}>
                  {getMarker(data, item.correct, current)}
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ textAlign: 'left', padding: 10 }}>
                  {getHint(data)[0].description.split(":")[1]}
                </Text>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      {`Incorrect. Here's a hint.\n`}
                      {term && `${term}:\n`}{deText && `${deText}`}
                    </Text>
                  </View>
                </View>
              </Modal>
            </View>
          ) : !item.isPassed && (
            <TimeOutButton
              setSelectedStepOption={setSelectedStepOption}
              setCurrentSelect={setCurrentSelect}
              key={index}
              data={data}
              currentSelect={currentSelect}
              question={getHint(data)[0].description.split(":")[1]}
              index={index}
              pressEnd={pressEnd}
              setPressEnd={setPressEnd}
            />
          )
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
    padding: 8,
    flexGrow: 0,
    paddingHorizontal: 16,
  },
  item: {
    width: 300,
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    borderColor: "#D3D3D3",
    backgroundColor: "#fff",
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 16,
    boxSizing: "border-box",
    marginBottom: 5
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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderColor: '#6b319b',
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'center',
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: "100%",
  },
});
