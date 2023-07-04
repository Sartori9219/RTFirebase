import React from "react";
import { useState } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
function GrapeButton(props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: "flex-start" }}>
      <Pressable
        onHoverIn={() => setIsHover(true)}
        onHoverOut={() => setIsHover(false)}
        onPress={() => navigation.navigate("/")}
      >
        {
          isHover ? (<Image source={"assets/square_logo.svg"} style={[
            styles.leftButton,
          ]}
          />) : (
            <Image source={"assets/white_logo.svg"} style={[
              styles.leftButton,
            ]}
            />
          )
        }

      </Pressable>
    </View>
  );
}

export default GrapeButton;

const styles = StyleSheet.create({
  leftButton: {
    height: "40px",
    width: "40px",
    resizeMode: "contain",
  },
});
