import { StyleSheet, View, Dimensions } from "react-native";
import Background from "./HeaderElement/Background";
import GrapeButton from "./HeaderElement/GrapeButton";
import Title from "./HeaderElement/Title";
import Seed from "./HeaderElement/Seed";
import Cat from "./HeaderElement/Cat";

const hs = Dimensions.get("window").height;
const Header = ({
  user,
  questions,
  currentSubject,
  currentGrade,
  currentQuestion,
  navigation,
}) => {
  return (
    <View style={[styles.container, { overflow: "hidden", height: 125 }]}>
      <Background />
      <View style={styles.row}>
        <GrapeButton navigation={navigation} />
        <Title
          currentSubject={currentSubject}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.rightSection}>
            <Seed user={user} />
            <Cat
              questions={questions}
              currentSubject={currentSubject}
              currentGrade={currentGrade}
              currentQuestion={currentQuestion}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hs * 0.3,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    backgroundColor: "#A25ADC",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightSection: {
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "center",
  },
});
