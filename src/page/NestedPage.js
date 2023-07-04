import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";
import { loadQuestions } from "../redux/actions/questions";
import initDataUser from "../config/user.json";
import app from "../config/app.json";
import { KEY_DATA_USER } from "../redux/types/user";
import { KEY_DATA_QUESTIONS } from "../redux/types/questions";
import { storeData, getData } from "../redux/util/data";
import { StyleSheet } from "react-native";
import NestedScreen from "../screen/NestedScreen";
import { getSubject } from "../component/utils";

function NestedPage({ navigation, route }) {
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
          //   setUserData(val);
        } else {
          storeData(KEY_DATA_USER, initDataUser);
          dispatch(loadUser(initDataUser));
          //   setUserData(initDataUser);
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
          console.log("OKK2", currentSubject.data);
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
      <NestedScreen
        user={user.data}
        hintPrice={app.hintPrice}
        questions={questions.data}
        currentGrade={currentGrade.data}
        currentSubject={currentSubject.data}
        currentQuestion={currentQuestion.data}
        currentStep={currentStep.data}
        firstLoad={firstLoad}
        setFirstLoad={setFirstLoad}
        navigation={navigation}
      />
    </>
  );
}

export default NestedPage;

const styles = StyleSheet.create({});
