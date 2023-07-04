import React, { useState } from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import Popover, {
  PopoverPlacement,
  PopoverMode,
} from "react-native-popover-view";
const catWhite = "assets/cat_white.svg";

function Cat({ navigation, user, userData, loginWithGoogle, logout }) {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setToolTipVisible(!toolTipVisible);
      }}
    >
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
            {user && user.photoURL && (
              <Image
                source={{
                  uri: user.photoURL,
                }}
                style={styles.rightButton}
              />
            )}

            {!user && <Image source={catWhite} style={styles.rightButton} />}
          </Pressable>
        }
      >
        <View style={styles.modalView}>
          <View style={styles.containerGrades}>
            <Pressable
              style={(state) => [
                styles.gradeItem,
                state.hovered && styles.hoveredGrade,
              ]}
              onPress={() => {
                setToolTipVisible(false);
                navigation.navigate("JoinClassPage");
              }}
            >
              <Text style={styles.textGrade}>Join a Class</Text>
            </Pressable>
            <Pressable
              style={(state) => [
                styles.gradeItem,
                state.hovered && styles.hoveredGrade,
              ]}
              onPress={() => {
                setToolTipVisible(false);
                navigation.navigate("SetupClassPage");
              }}
            >
              <Text style={styles.textGrade}>Setup a Class</Text>
            </Pressable>
            {user && (
              <Pressable
                style={(state) => [
                  styles.gradeItem,
                  state.hovered && styles.hoveredGrade,
                ]}
                onPress={() => {
                  setToolTipVisible(false);
                  navigation.navigate("SetupClassPage");
                }}
              >
                <Text style={styles.textGrade}>Class Progress</Text>
              </Pressable>
            )}
            {user && (
              <Pressable
                style={(state) => [
                  styles.gradeItem,
                  state.hovered && styles.hoveredGrade,
                ]}
                onPress={() => {
                  setToolTipVisible(false);
                  logout();
                }}
              >
                <Text style={styles.textGrade}>Logout</Text>
              </Pressable>
            )}
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
    borderRadius: "100%",
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
  textCategory: {
    paddingTop: 8,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  textGrade: {
    color: "#1D232E",
    fontWeight: "400",
    fontSize: "100%",
    paddingVertical: 4,
    paddingLeft: 16,
  },
});
