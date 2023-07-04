import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import app from "../config/app.json";
import { StyleSheet } from "react-native";
import StandaloneScreen from "../screen/StandaloneScreen";

function StandalonePage({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const questions = useSelector((state) => state.questions);
  const currentSubject = useSelector((state) => state.currentSubject);
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const currentGrade = useSelector((state) => state.currentGrade);
  const currentStep = useSelector((state) => state.currentStep);
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {}, [dispatch]);

  return (
    <>
      {
        <StandaloneScreen
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
      }
    </>
  );
}

export default StandalonePage;

const styles = StyleSheet.create({});
