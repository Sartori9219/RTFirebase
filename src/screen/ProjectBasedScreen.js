import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuestion } from "../redux/actions/current-question";
import { setCurrentStep } from "../redux/actions/current-step";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import Header from "../component/ProjectBased/Header";
import Question from "../component/ProjectBased/Question";
import Step from "../component/ProjectBased/Step";
import Footer from "../component/ProjectBased/Footer";
import {
  getKeyQuestion,
  getCorrectId,
  getGrade,
  getCorrectAnswer,
  getSubject,
  getOptionsAndHints,
  arrayMove,
  randomNumberInRange,
  getDictionaryKey,
} from "../component/utils";

import { loadQuestions } from "../redux/actions/questions";
import { storeData, getData } from "../redux/util/data";
import { KEY_DATA_USER } from "../redux/types/user";
import initDataUser from "../config/user.json";
import app from "../config/app.json";
import { loadUser } from "../redux/actions/user";
import StandaloneOptions from "../component/Dictionary/StandaloneOptions";

const hs = Dimensions.get("window").height;

function ProjectBasedScreen({
  user,
  currentGrade,
  questions,
  currentStep,
  currentQuestion,
  hintPrice,
  firstLoad,
  setFirstLoad,
  navigation,
  currentSubject,
}) {
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedStepOption, setSelectedStepOption] = useState();
  const [currentSelect, setCurrentSelect] = useState();
  const [imageSrc, setImageSrc] = useState([]);
  const [queList, setQueList] = useState();
  const scrollViewRef = useRef();

  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = hs * 0.3;
  const Header_Min_Height = 125;

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, (Header_Max_Height - Header_Min_Height) * 2 + 75],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const [userData, setUserData] = useState();
  const [questionData, setQuestionData] = useState();

  useEffect(() => {
    let isMounted = true;

    const updateData = () => {
      getData(KEY_DATA_USER).then((val) => {
        if (val) {
          setUserData(val);
        } else {
          storeData(KEY_DATA_USER, initDataUser);
          setUserData(initDataUser);
        }
      });
    };
    if (isMounted) {
      updateData();
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const updateData = () => {
      function setLastPosition(val) {
        let countPassed = 0;

        for (let i = 0; i < val.length; i++) {
          if (val[i].isPassed) {
            countPassed++;
          }
        }

      }

      function init() {
        getSubject(currentSubject).then(async (res) => {
          if (res) {
            let jsonData = res.questions;
            storeData(currentSubject, jsonData);
            setQuestionData(jsonData);
          }
        });
      }

      getData(currentSubject).then((val) => {
        if (val) {
          setQuestionData(val);
          setLastPosition(val);
        } else {
          init();
        }
      });
    };

    updateData();
  }, [dispatch, questions, currentQuestion, currentGrade, currentSubject]);

  return (
    <>
      {
        <>
          {userData && (
            <Header
              user={userData}
              questions={questionData}
              currentSubject={currentSubject}
              currentQuestion={currentQuestion}
              navigation={navigation}
            />
          )}
          {questionData && (
            <Question
              questions={questionData}
              currentSubject={currentSubject}
              currentQuestion={currentQuestion}
              currentStep={currentStep}
            />
          )}
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
              { useNativeDriver: false }
            )}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <View style={styles.body}>
              {userData && questionData && (
                <Step
                  user={userData}
                  currentSubject={currentSubject}
                  questions={questionData}
                  currentQuestion={currentQuestion}
                  currentStep={currentStep}
                  selectedStepOption={selectedStepOption}
                  setSelectedStepOption={setSelectedStepOption}
                  currentSelect={currentSelect}
                  setCurrentSelect={setCurrentSelect}
                  imageSrc={imageSrc}
                  setImageSrc={setImageSrc}
                  queList={queList}
                  setQueList={setQueList}
                />
              )}
            </View>
          </ScrollView>
          {userData && questionData && (
            <Footer
              user={userData}
              questions={questionData}
              currentQuestion={currentQuestion}
              currentStep={currentStep}
              currentSubject={currentSubject}
              selectedStepOption={selectedStepOption}
              setSelectedStepOption={setSelectedStepOption}
              hintPrice={app.hintPrice}
              setCurrentSelect={setCurrentSelect}
              currentSelect={currentSelect}
            />
          )}
        </>
      }
    </>
  );
}

export default ProjectBasedScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FAFAFC",
  },
  body: {
    paddingHorizontal: 16,
    minHeight: hs * 0.3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 28,
    marginVertical: 32,
  },
  alertBoxCorrect: {
    height: "75px",
    width: "75px",
    position: "absolute",
    zIndex: 2,
    right: "64px",
    bottom: "-14px",
    justifyContent: "center",
  },
  alertBoxWrong: {
    height: "75px",
    width: "75px",
    position: "absolute",
    zIndex: 2,
    right: "64px",
    bottom: "-14px",
    justifyContent: "center",
  },
  alertCorrect: {
    height: "75px",
    width: "75px",
    alignSelf: "center",
  },
  alertWrong: {
    height: "75px",
    width: "75px",
    alignSelf: "center",
  },
});
