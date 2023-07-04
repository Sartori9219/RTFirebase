import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Title({ props, currentSubject }) {
  var subjectName;
  if (currentSubject.indexOf('_L1') >= 0) {
    subjectName = currentSubject.split('_L1')[0].split('_')[1];
  }
  if (currentSubject.indexOf('_L2') >= 0) {
    subjectName = currentSubject.split('_L2')[0].split('_')[1];
  }
  if (currentSubject.indexOf('_L3') >= 0) {
    subjectName = currentSubject.split('_L3')[0].split('_')[1];
  }
  if (currentSubject.indexOf('_L4') >= 0) {
    subjectName = currentSubject.split('_L4')[0].split('_')[1];
  }
  subjectName = subjectName.replace(/_/g, ' ').replace(/-/g, ' ');
  return (
    <View>
      <Text style={styles.title}>{subjectName}</Text>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  title: { color: "#fff", fontSize: "120%", fontWeight: "400" },
});
