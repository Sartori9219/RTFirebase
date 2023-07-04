import React from "react";
import { StyleSheet, Text, Image } from "react-native";

const seedLightImage = "assets/seed_white.svg";

function Seed(props) {
  return (
    <Text style={styles.seedText}>
      {props.user.seed}
      <Image source={seedLightImage} style={styles.seedIcon} />
    </Text>
  );
}

export default Seed;

const styles = StyleSheet.create({
  seedText: {
    color: "#fff",
    fontSize: "120%",
    fontWeight: "400",
    marginHorizontal: 12,
  },
  seedIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
});
