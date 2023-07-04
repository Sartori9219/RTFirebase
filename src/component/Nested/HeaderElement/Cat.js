import React, { useState } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import Popover, {
  PopoverPlacement,
  PopoverMode,
} from "react-native-popover-view";
import Reset from "./Reset";
const catWhite = "assets/cat_white.svg";

function Cat({ questions, currentGrade, currentQuestion, currentSubject }) {
  const dispatch = useDispatch();
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <Pressable onPress={() => setToolTipVisible(!toolTipVisible)}>
      <Popover
        popoverStyle={styles.popover}
        placement={PopoverPlacement.BOTTOM}
        isVisible={toolTipVisible}
        onRequestClose={() => setToolTipVisible(!toolTipVisible)}
        mode={PopoverMode.RN_MODAL}
        animationConfig={{ duration: 300 }}
        from={
          <Pressable
            onPressIn={() => {
              setToolTipVisible(!toolTipVisible);
            }}
            style={(state) => [
              styles.pressable,
              state.hovered && styles.hovered,
              state.pressed && styles.pressed,
            ]}
          >
            <Image source={catWhite} style={styles.rightButton} />
          </Pressable>
        }
      >
        <View style={styles.modalView}>
          <View style={styles.containerGrades}>
            {/* {subjects.map((item, index) => (
              <View key={index}>
                <Text style={styles.textCategory}>
                  {item.category.toUpperCase()}
                </Text>
                {item.data.map((subject, index) => (
                  <Pressable
                    key={index}
                    style={(state) => [
                      styles.gradeItem,
                      state.hovered && styles.hoveredGrade,
                    ]}
                    onPress={() => {
                      // dispatch(
                      //   setCurrentSubject({
                      //     subject: subject.key,
                      //   })
                      // );
                      setGrade(subject.key);
                      // props.setSelectedStepOption(null);
                      setToolTipVisible(false);
                    }}
                  >
                    <Text style={styles.textGrade}>
                      {currentSubject === subject.key && "✔️ "}
                      {subject.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))} */}
            <Reset
              questions={questions}
              currentSubject={currentSubject}
              currentGrade={currentGrade}
              currentQuestion={currentQuestion}
              setToolTipVisible={setToolTipVisible}
            />
          </View>
        </View>
      </Popover>
    </Pressable>
  );
}

export default Cat;

const styles = StyleSheet.create({
  pressable: {
    width: 32,
    height: 32,
    borderRadius: "50%",
  },
  hovered: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#BF40BF",
  },
  pressed: {
    backgroundColor: "purple",
  },
  gradeItem: {
    width: 198,
  },
  hoveredGrade: {
    backgroundColor: "#f0f0f0",
  },
  rightButton: {
    width: 32,
    height: 32,
  },
  modalView: {
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  popover: {
    backgroundColor: "#fff",
    borderRadius: 4,
    textAlign: "left",
    border: "1px solid #f0f0f0",
  },
  containerGrades: {
    paddingTop: 10,
    paddingBottom: 12,
  },
  textGrade: {
    color: "#1D232E",
    fontWeight: "400",
    fontSize: "100%",
    paddingVertical: 4,
    paddingLeft: 16,
  },
});
