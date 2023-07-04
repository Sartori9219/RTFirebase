import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  index
} from "react-native";
import { formatBreakLine } from "../../utils";
const ws = Dimensions.get("window").width;

// The component you should add in your project
/**
 * 
 * @param pressDuration -> time to press button before action is triggered
 * @param buttonStyle -> the custom style of the button component
 * @param waveColor -> color of press loading effect
 * @param onReachEnd -> action to trigger when timeout is reached
 * @param resetOnEnd -> restore button to initial state when timeout is reached
 * @param buttonText -> The text to print on the button
 * @param buttonPressingText -> The text to print on the button when it is pressed
 */
const TimeOutButton = ({
  question,
  currentSelect,
  data,
  children,
  pressDuration = 4000,
  waveColor = '#A25ADC',
  onReachEnd,
  resetOnEnd = false,
  buttonText = 'Long press me',
  buttonStyle = null,
  textStyle = null,
  pressedTextStyle = null,
  setSelectedStepOption,
  setCurrentSelect,
  index,
  pressed,
  setPressed,
  pressEnd,
  setPressEnd
}) => {
  const [width, setWidth] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const [render, setRender] = useState(false);
  const pressAnim = useRef(new Animated.Value(0)).current;
  const checkMarkImage = "assets/checkmark.svg";
  const crossMarkImage = "assets/crossmark.svg";
  const anim = Animated.timing(pressAnim, {
    toValue: 0,
    duration: pressDuration || 4000,
    useNativeDriver: true,
  });
  const resetAnim = () => {
    pressAnim.setValue(-width);
    setEndReached(false);
  };

  const onPress = (pressType) => {
    const pressData = pressed;
    const endPressData = pressEnd;
    switch (pressType) {
      case 'in':
        anim.start(({ finished }) => {
          if (finished) {
            setEndReached(true);
            onReachEnd && onReachEnd();
            resetOnEnd && resetAnim();
            setSelectedStepOption(data);
            setCurrentSelect(data);
            endPressData[index] = true;
            setPressEnd(endPressData);
            setRender(!render);
          }
        });
        pressData[index] = true;
        setPressed(pressData);
        setRender(!render);
        break;

      default:
        !endReached && resetAnim();
        pressData[index] = false;
        setPressed(pressData);
        setRender(!render);
        break;
    }
  };
  useEffect(() => {
    resetAnim();
    setPressEnd([]);
  }, [width]);
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => onPress('in')}
        onPressOut={() => onPress('out')}
        onLayout={e => setWidth(e.nativeEvent.layout.width)}
        style={styles.totchable}
      >
        <View style={styles.card}>
          <Animated.View style={[{
            transform: [{
              translateX: pressAnim
            }],
            backgroundColor: "#a25adc",
            opacity: 0.1,
          },
          styles.animation
          ]}
          >
          </Animated.View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.description}>
              <Text>
                {formatBreakLine(data)}
              </Text>
            </View>
            <View style={{ marginTop: 3 }}>
              {data === currentSelect ? (
                <Image source={checkMarkImage} style={[styles.checkMark, { marginTop: 2 }]} />
              ) : (
                <View style={styles.dot} />
              )}
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            {(data === currentSelect || pressed[index] || pressEnd[index]) && <Text style={[{ textAlign: 'left', padding: 10 }, pressedTextStyle]}>
              {question}
            </Text>}
          </View>
        </View>
      </TouchableOpacity >
    </>
  );
};


// A TEST SCREEN
export default function TimeOutPressButton({
  navigation,
  data,
  question,
  setSelectedStepOption,
  setCurrentSelect,
  currentSelect,
  index,
  pressEnd,
  setPressEnd
}) {
  const [pressed, setPressed] = useState([]);
  const marginBottom = (data === currentSelect || pressEnd[index]) ? 60 : 20;
  return (
    <>
      <SafeAreaView style={[
        styles.area,
        {
          zIndex: 4 - index,
          marginBottom: marginBottom,
        }]}>
        <TimeOutButton
          question={question}
          data={data}
          buttonText="Welding safety"
          pressDuration={4000}
          resetOnEnd={true}
          waveColor="#f457ad"
          textStyle={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}
          setSelectedStepOption={setSelectedStepOption}
          setCurrentSelect={setCurrentSelect}
          currentSelect={currentSelect}
          index={index}
          pressed={pressed}
          setPressed={setPressed}
          pressEnd={pressEnd}
          setPressEnd={setPressEnd}
        />
      </SafeAreaView >
    </>
  );
}

const styles = StyleSheet.create({
  description: {
    fontWeight: "400",
    fontSize: "90%",
    color: "#1D232E",
    paddingRight: 8,
    lineHeight: "120%",
  },
  area: {
    width: 300,
    marginHorizontal: 16,
    minHeight: 35,
  },
  dot: {
    border: "1px solid #D3D3D3",
    height: 16,
    width: 16,
    borderRadius: 50,
  },
  totchable: {
    position: 'relative',
    height: 60,
    alignItems: 'center',
  },
  card: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#999',
    width: 300,
    padding: 8,
    flexGrow: 0,
    paddingHorizontal: 16,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "white"
  },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -250,
    width: "100%",
    zIndex: 0
  },
  checkMark: {
    height: 16,
    width: 16,
    resizeMode: "object-fit",
  },
});

