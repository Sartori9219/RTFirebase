import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatQuestion } from "../../utils";
import Chat from "./Chat";

function Story({ questions, currentQuestion }) {
  // const [data, setData] = useState();
  // useEffect(() => {
  //   let res = [];
  //   for (let i = 0; i < questions[currentQuestion].question.length; i++) {
  //     res.push(questions[currentQuestion].question[i]);
  //   }
  //   setData(res);
  // }, [questions, currentQuestion]);

  return (
    <View style={{ paddingVertical: 16 }}>
      {Array.isArray(questions[currentQuestion].question) && (
        <Chat questions={questions} currentQuestion={currentQuestion} />
      )}
    </View>
  );
}

export default Story;

// import React, { useState } from "react";
// import { StyleSheet, View, Text, Image, Pressable } from "react-native";
// import ImageHolder from "../component/StoryProblem/StepElement/ImageHolder";

// function DictionaryPage({ navigation, route }) {
//   const [current, setCurrent] = useState(0);
//   const data = [
//     {
//       question:
//         "I'm so mad about losing the game today!|Are you going to return it?",
//       options: ["Treat others how you want to be treated (correct answer)"],
//     },
//     {
//       question:
//         "I found $5, but a sad kid was searching nearby.|I get it, losing can be tough. How are you feeling now?",
//       options: ["Accept others' emotions without judging (correct answer)"],
//     },
//     {
//       question:
//         "You won't believe it, but I saw Spider-Man yesterday!|Woah, that's awesome! Tell me more about it!",
//       options: ["Listen closely and ask questions (correct answer)"],
//     },
//     {
//       question:
//         "I can't believe I forgot my lunch today...|Hey, don't worry! I brought extra.  We can share!",
//       options: ["Treat others how you'd like to be treated (correct answer)"],
//     },
//   ];

//   function getChat(data, position) {
//     let result = "";
//     let fields = data.split("|");

//     if (position === "top") {
//       result = fields[0];
//     } else {
//       result = fields[1];
//     }
//     return result;
//   }

//   return (
//     <>
//       <View style={{ marginBottom: 32 }}>
//         <Pressable
//           style={{ width: 100 }}
//           onPress={() =>
//             navigation.navigate("/", {
//               name: "HomePage",
//             })
//           }
//         >
//           <Text style={{ padding: 8, background: "lightgrey" }}>BACK HOME</Text>
//         </Pressable>
//       </View>
//       <View style={{ alignItems: "center" }}>
//         <ImageHolder path={"assets/dictionary/people_1.gif"} />
//         <View style={styles.bubble}>
//           <View>
//             <ImageHolder path={"assets/dictionary/bubble_2.png"} />
//             <View style={styles.textBubbleContainer}>
//               <Text style={styles.textBubble}>
//                 {getChat(data[current].question, "top")}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.bottomBubble}>
//             <ImageHolder path={"assets/dictionary/bubble_2.png"} />
//             <View style={[styles.textBubbleContainer, styles.textBottomBubble]}>
//               <Text style={styles.textBubble}>
//                 {getChat(data[current].question, "bottom")}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={{ marginTop: 16, marginHorizontal: "auto" }}>
//         <Pressable
//           style={{ width: 100 }}
//           onPress={() =>
//             setCurrent(current < data.length - 1 ? current + 1 : 0)
//           }
//         >
//           <Text
//             style={{
//               padding: 8,
//               background: "lightgrey",
//               textAlign: "center",
//             }}
//           >
//             {current < data.length - 1 ? "NEXT" : "RESET"}
//           </Text>
//         </Pressable>
//       </View>
//     </>
//   );
// }

// export default DictionaryPage;

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//   },
//   header: {
//     marginBottom: 64,
//   },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 16,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//   },
//   textLogo: {
//     fontSize: 32,
//     marginLeft: 8,
//   },
//   title: {
//     fontSize: 24,
//   },

//   //Dictionary
//   people: {},
//   bubble: {
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//   },
//   bottomBubble: {
//     transform: "rotate(180deg)",
//   },
//   textBubbleContainer: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//     overflow: "hidden",
//     flexWrap: "wrap",
//     padding: 16,
//   },
//   textBubble: {
//     textAlign: "center",
//     fontSize: 19,
//   },
//   textBottomBubble: { transform: "rotate(180deg)" },
// });
