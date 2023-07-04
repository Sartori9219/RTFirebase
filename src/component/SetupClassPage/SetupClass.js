import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import SubjectPicker from "./SubjectPicker";
import subjects from "../../config/subjects.json";
import { getSubject } from "../utils";

const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "Brown",
  "Gray",
  "Black",
  "White",
  "Beige",
  "Teal",
  "Turquoise",
  "Cyan",
  "Lime",
  "Olive",
  "Maroon",
  "Navy",
  "Indigo",
  "Violet",
  "Magenta",
  "Gold",
  "Silver",
  "Bronze",
  "Copper",
  "Rose",
  "Cream",
  "Lavender",
  "Mint",
];

const animals = [
  "Dog",
  "Cat",
  "Rabbit",
  "Horse",
  "Elephant",
  "Lion",
  "Tiger",
  "Monkey",
  "Bear",
  "Kangaroo",
  "Giraffe",
  "Leopard",
  "Zebra",
  "Wolf",
  "Fox",
  "Deer",
  "Hippopotamus",
  "Rhino",
  "Gorilla",
  "Crocodile",
  "Snake",
  "Lizard",
  "Spider",
  "Scorpion",
  "Butterfly",
  "Bee",
  "Bird",
  "Fish",
  "Shark",
  "Dolphin",
];

const generateClassKey = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const randomNum = Math.floor(Math.random() * 100);
  return `${color} ${animal} ${randomNum.toString().padStart(2, "0")}`;
};

const SetupClass = ({ user }) => {
  const [classKey, setClassKey] = useState("");
  const [query, setQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerateClassKey = () => {
    setLoading(true);
    const newClassKey = generateClassKey();
    setClassKey(newClassKey);
    setup(newClassKey, selectedSubject);
  };

  const setup = async (key, subject) => {
    const snapData = await getSubject(subject.key);
    if (snapData) {
      let total = 0;
      if (subject.destination !== "nestedPage") {
        total = snapData.questions.length;
      } else {
        for (let i = 0; i < snapData.length; i++) {
          for (let j = 0; j < snapData[i].questions.length; j++) {
            total = total + 1;
          }
        }
      }

      try {
        await setDoc(doc(db, "class", key), {
          teacher: user.uid,
          subject: subject,
          totalSteps: total,
        });

        setClassKey("");
        setSelectedSubject("");
        setQuery("");
        setLoading(false);
      } catch (e) {
        console.log("failed: ", e);
      }
    }
  };

  const getDescription = () => {
    let desc;

    desc = `We'll be using a story problem app called Grape Stories. To get to the app, go to grapeAssignments.com and type our class key ${classKey && "(" + classKey + ")"
      } into the "Join your class here" box.`;
    return desc;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Share with your students"}</Text>
      <Text style={styles.subtitle}>
        {"vocally or through a written message"}
      </Text>
      <View style={styles.boxDescription}>
        <Text style={styles.description}>{getDescription()}</Text>
      </View>
      <View style={[styles.row, { alignItems: 'flex-start' }]}>
        <SubjectPicker
          data={subjects}
          query={query}
          setQuery={setQuery}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        {selectedSubject && !loading ? (
          <Button
            title="Generate a new Class Key"
            onPress={handleGenerateClassKey}
          />
        ) : (
          <View style={[styles.row, { gap: 8 }]}>
            {loading && <ActivityIndicator />}
            <Button
              disabled
              title="Generate a new Class Key"
              onPress={handleGenerateClassKey}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: 500,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  boxDescription: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#F9F2FF',
    borderColor: '#ad65e8'
  },
  description: {},
});

export default SetupClass;
