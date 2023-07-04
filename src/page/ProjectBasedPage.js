import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";
import { loadQuestions } from "../redux/actions/questions";
import { setMergeStepOption } from "../redux/actions/merge-step-option";
import initDataUser from "../config/user.json";
import app from "../config/app.json";
import { KEY_DATA_USER } from "../redux/types/user";
import { KEY_DATA_QUESTIONS } from "../redux/types/questions";
import { storeData, getData } from "../redux/util/data";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import ProjectBasedScreen from "../screen/ProjectBasedScreen";
import { setCurrentGrade } from "../redux/actions/current-grade";
import { getSubject } from "../component/utils";

function ProjectBasedPage({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const questions = useSelector((state) => state.questions);
  const currentGrade = useSelector((state) => state.currentGrade);
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const currentStep = useSelector((state) => state.currentStep);
  const currentSubject = useSelector((state) => state.currentSubject);
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const updateData = () => {
      getData(KEY_DATA_USER).then((val) => {
        if (val) {
          dispatch(loadUser(val));
        } else {
          storeData(KEY_DATA_USER, initDataUser);
          dispatch(loadUser(initDataUser));
        }
      });
    };
    if (isMounted) {
      updateData();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    const updateData = () => {
      function init() {
        getSubject(currentSubject.data).then(async (jsonData) => {
          if (jsonData) {
            storeData(currentSubject.data, jsonData);
            dispatch(loadQuestions(jsonData));
          }
        });
      }

      getData(currentSubject.data).then((val) => {
        if (val) {
          dispatch(loadQuestions(val));
        } else {
          init();
        }
      });
    };
    if (isMounted) {
      updateData();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <>
      <ProjectBasedScreen
        user={user.data}
        hintPrice={app.hintPrice}
        questions={questions.data}
        currentGrade={currentGrade.data}
        currentQuestion={currentQuestion.data}
        currentSubject={currentSubject.data}
        currentStep={currentStep.data}
        firstLoad={firstLoad}
        setFirstLoad={setFirstLoad}
        navigation={navigation}
      />
    </>
  );
}

export default ProjectBasedPage;

const styles = StyleSheet.create({
  alertBoxCorrect: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: 0,
    justifyContent: "center",
  },
  alertBoxWrong: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: 0,
    justifyContent: "center",
  },
  alertCorrect: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  alertWrong: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
});
