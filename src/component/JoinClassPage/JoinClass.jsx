import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { db } from "../../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentSubject } from "../../redux/actions/current-subject";
import DataContext from "../ContextProvider/DataContext";

const JoinClass = ({ navigation }) => {
  const { setCurrentClass } = useContext(DataContext);
  const [name, setName] = useState("");
  const [classKey, setClassKey] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const join = async (name, key) => {
    try {
      const docRef = doc(db, "class", key);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let isExists = false;
        if (docSnap.data().details) {
          if (docSnap.data().details.length > 0) {
            for (let i = 0; i < docSnap.data().details.length; i++) {
              if (
                docSnap.data().details[i].name.toLowerCase() ===
                name.toLowerCase()
              ) {
                isExists = true;
                const current = docSnap.data().details;
                current[i] = {
                  ...current[i],
                  lastSignin: Date.now(),
                };
                await updateDoc(docRef, {
                  details: current,
                });
                break;
              }
            }
          }
        } else {
          await updateDoc(docRef, {
            details: [
              {
                name: name,
                lastSignin: Date.now(),
                stepsAttempted: 0,
                stepsMastered: 0,
              },
            ],
          });
          isExists = true;
        }

        if (!isExists) {
          await updateDoc(docRef, {
            details: [
              ...docSnap.data().details,
              {
                name: name,
                lastSignin: Date.now(),
                stepsAttempted: 0,
                stepsMastered: 0,
              },
            ],
          });
        }

        setCurrentClass({ name: name, key: key });
        dispatch(setCurrentSubject({ subject: docSnap.data().subject.key }));
        navigation.navigate(docSnap.data().subject.destination, {
          name: docSnap.data().subject.title,
          subject: docSnap.data().subject.key,
        });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      setName("");
      setClassKey("");
      setLoading(false);
    } catch (e) {
      console.log("failed: ", e);
    }
  };

  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangeClassKey = (value) => {
    setClassKey(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangeClassKey}
        value={classKey}
        placeholder="Class Key"
      />
      {!loading ? (
        <Button title="Join" onPress={() => join(name, classKey)} />
      ) : (
        <View style={[styles.row, { gap: 8 }]}>
          {loading && <ActivityIndicator />}
          <Button disabled title="Join" />
        </View>
      )}
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
  },
  description: {},
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
});

export default JoinClass;
