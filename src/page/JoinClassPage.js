import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import JoinClass from "../component/JoinClassPage/JoinClass";

function SetupClassPage({ navigation }) {
  return (
    <>
      <View style={styles.row}>
        <Pressable
          onPress={() => navigation.navigate("/")}
          style={{ backgroundColor: "#D3D3D3", padding: 8 }}
        >
          <Text>BACK</Text>
        </Pressable>
      </View>
      <JoinClass navigation={navigation} />
    </>
  );
}

export default SetupClassPage;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
