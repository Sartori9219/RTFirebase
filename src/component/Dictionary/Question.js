import { StyleSheet, View } from "react-native";
import Dots from "./QuestionElement/Dots";
import Story from "./QuestionElement/Story";

const Question = ({ questions, currentQuestion }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Dots questions={questions} currentQuestion={currentQuestion} />
          {/* <Bubble questions={questions} currentQuestion={currentQuestion} />
          <Percentage questions={questions} currentQuestion={currentQuestion} /> */}
        </View>
        <Story questions={questions} currentQuestion={currentQuestion} />
      </View>
    </>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: -50,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "7px",
  },
});
