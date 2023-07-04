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
import { KEY_DATA_USER } from "../../../redux/types/user";
import initDataUser from "../../../config/user.json";
import { getKeyQuestion, getCorrectId, getSubject } from "../../utils";

function Reset({
  questions,
  currentSubject,
  currentQuestion,
  setToolTipVisible,
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
          newQuestion = question.steps.filter((q, index) => {
            q.isPassed = true;
            q.answer = [...q.answer, getCorrectId(q.options)];
            return q;
          });
        }
        return question;
      });
      const getKeyQuestion = (id) => `${"KEY_DATA_QUESTIONS" + id}`;
      storeData(getKeyQuestion(currentSubject), newQuestions);
      const data = getData(getKeyQuestion(currentSubject));
      data.then((val) => {
        dispatch(loadQuestions(val));
      });
      setModalVisible(false);
      setToolTipVisible(false);
    }
    setResetComfirmationCode("");
  };

  const resetGrade = () => {
    storeData(KEY_DATA_USER, initDataUser);
    storeData(getKeyQuestion(currentSubject), getSubject(currentSubject));

    setData(KEY_DATA_USER, getKeyQuestion(currentSubject));
  };

  const setData = async (keyDataUser, keyDataQuestions) => {
    try {
      const data = getData(keyDataQuestions);
      data.then((val) => {
        dispatch(loadQuestions(val));
        dispatch(
          setCurrentQuestion({
            max: 0,
            current: 0,
          })
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Pressable
        style={(state) => [
          styles.gradeItem,
          state.hovered && styles.hoveredGrade,
        ]}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textGrade}>Reset progress</Text>
      </Pressable>
      {/* Reset Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.resetModalView}>
            <View style={{ width: "200px" }}>
              <Text>
                This will reset all your progress for the{" "}
                {currentSubject.replace(/_/g, " ").toUpperCase()}. Type the word
                ‘reset’ in the box below to confirm.
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
