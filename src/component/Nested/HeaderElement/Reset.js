import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { loadQuestions } from "../../../redux/actions/questions";
import { storeData, getData } from "../../../redux/util/data";
import { setCurrentQuestion } from "../../../redux/actions/current-question";
import { setCurrentStep } from "../../../redux/actions/current-step";
import { KEY_DATA_USER } from "../../../redux/types/user";
import initDataUser from "../../../config/user.json";
import { getCorrectAnswer, getSubject } from "../../utils";

function Reset({
  questions,
  currentQuestion,
  setToolTipVisible,
  currentSubject,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [resetConfirmationCode, setResetComfirmationCode] = useState("");
  const dispatch = useDispatch();

  const reset = () => {
    const code = resetConfirmationCode.toLowerCase().trim();
    if (code === "reset") {
      resetGrade();
      setModalVisible(false);
      setToolTipVisible(false);
    }
    if (code === "pickle toes") {
      let newQuestions;
      let newQuestion;
      newQuestions = questions.filter((question) => {
        if (question === questions[currentQuestion]) {
          newQuestion = question.questions.filter((q, index) => {
            q.isPassed = true;
            q.answer !== undefined
              ? (q.answer = [...q.answer, getCorrectAnswer(q.options)])
              : (q.answer = [getCorrectAnswer(q.options)]);
            return q;
          });
        }
        return question;
      });

      storeData(currentSubject, newQuestions);
      const data = getData(currentSubject);
      data.then((val) => {
        dispatch(loadQuestions(val));
        dispatch(
          setCurrentStep({
            max: questions[currentQuestion].questions.length - 1,
            current: questions[currentQuestion].questions.length - 1,
          })
        );
      });
      setModalVisible(false);
      setToolTipVisible(false);
    }
    setResetComfirmationCode("");
  };

  const resetGrade = () => {
    storeData(KEY_DATA_USER, initDataUser);
    getSubject(currentSubject).then(async (jsonData) => {
      if (jsonData) {
        storeData(currentSubject, jsonData);
        dispatch(loadQuestions(jsonData));
        dispatch(
          setCurrentStep({
            max: 0,
            current: 0,
          })
        );
        dispatch(
          setCurrentQuestion({
            max: 0,
            current: 0,
          })
        );
      }
    });
  };

  const getCurrentTitle = () => {
    const sub = currentSubject;
    const arr = sub.split("_");

    return `${arr[0]} ${arr[1].replace("-", "")}`;
  };

  return (
    <>
      <Pressable
        style={(state) => [
          styles.gradeItem,
          state.hovered && styles.hoveredGrade,
        ]}
        animationConfig={{ duration: 18000 }}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textGrade}>Reset progress</Text>
      </Pressable>
      {/* Reset Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        animationDuration={200}
      >
        <View style={styles.centeredView}>
          <View style={styles.resetModalView}>
            <View style={{ width: "200px" }}>
              <Text>
                This will reset all your progress for the {getCurrentTitle()}.
                Type the word ‘reset’ in the box below to confirm.
              </Text>
              <View>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#D3D3D3",
                    padding: 8,
                    marginVertical: "16px",
                    textAlign: "center",
                    borderBottomWidth: 1,
                    fontSize: "90%",
                  }}
                  value={resetConfirmationCode}
                  onChangeText={(val) => setResetComfirmationCode(val)}
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonReset]}
                onPress={() => reset()}
              >
                <Text style={styles.textStyle}>Reset</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { marginTop: 8 }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={[styles.textStyle, { color: "rgba(0, 0, 0, 0.7)" }]}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* End of Reset Modal */}
    </>
  );
}

export default Reset;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  resetModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonReset: {
    backgroundColor: "#AE66E4",
  },
  buttonClose: {
    backgroundColor: "rgba(174, 102, 228, 0.3)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  gradeItem: {
    width: 198,
  },
  hoveredGrade: {
    backgroundColor: "#f0f0f0",
  },
  textGrade: {
    color: "#1D232E",
    fontWeight: "400",
    fontSize: "100%",
    paddingVertical: 4,
    paddingLeft: 16,
  },
});
