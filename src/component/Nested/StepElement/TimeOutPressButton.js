import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from "react-native";
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
export const TimeOutButton = ({
  children,
  pressDuration = 3000,
  waveColor = '#f00',
  onReachEnd,
  resetOnEnd = false,
  buttonText = 'Long press me',
  buttonPressingText = 'When you are pressing me, i show you this.',
  buttonStyle = null,
  textStyle = null,
  data, currentSelect, formatBreakLine, checkMarkImage, setSelectedStepOption, setCurrentSelect
}) => {
  const [width, setWidth] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pressAnim = useRef(new Animated.Value(0)).current;
  const dataQuestion = data.description ? data.description : data
  const anim = Animated.timing(pressAnim, {
    toValue: 0,
    duration: pressDuration || 3000,
    useNativeDriver: true,
  });

  const resetAnim = () => {
    pressAnim.setValue(-width);
    setEndReached(false);
  };

  const onPress = (pressType) => {
    switch (pressType) {
      case 'in':
        anim.start(({ finished }) => {
          if (finished) {
            setEndReached(true);
            onReachEnd && onReachEnd();
            resetOnEnd && resetAnim();
            setSelectedStepOption(data);
            setCurrentSelect(data);
          }
        });
        setPressed(true);
        break;

      default:
        console.log(endReached);
        !endReached && resetAnim();
        setPressed(false);
        break;
    }
  };

  useEffect(() => {
    resetAnim();
  }, [width]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() => onPress('in')}
        onPressOut={() => onPress('out')}
        onLayout={e => setWidth(e.nativeEvent.layout.width)}
        style={{
          marginVertical: 8,
          borderRadius: 8,
          borderColor: "#D3D3D3",
          backgroundColor: "#fff",
          shadowColor: "#AE66E4",
          shadowOffset: { width: 1, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          marginHorizontal: 16,
          boxSizing: "border-box",
          borderWidth: 1,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Animated.View style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '100%',
          transform: [{ translateX: pressAnim }],
          backgroundColor: '#a25adc',
          opacity: 0.1,
          zIndex: 0
        }}></Animated.View>
        <View style={styles.rowItem}>
          <View style={{ width: "100%", paddingRight: 24 }}>
            <Text style={[styles.description, { textAlign: "center" }]}>
              {formatBreakLine(dataQuestion)}
            </Text>
          </View>
          <View style={{ marginLeft: -16 }}>
            {data === currentSelect ? (
              <Image source={checkMarkImage} style={styles.checkMark} />
            ) : (
              <View style={styles.dot} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};


// A TEST SCREEN
export default function TimeOutPressButton({ data, currentSelect, formatBreakLine, checkMarkImage, setSelectedStepOption, setCurrentSelect }) {

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff', zIndex: 1 }}>
        <TimeOutButton
          pressDuration={2000}
          resetOnEnd={true}
          waveColor="#f457ad"
          textStyle={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}
          data={data}
          currentSelect={currentSelect}
          formatBreakLine={formatBreakLine}
          checkMarkImage={checkMarkImage}
          setSelectedStepOption={setSelectedStepOption}
          setCurrentSelect={setCurrentSelect}
        />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  step: {
    marginTop: 16,
  },
  title: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#A25ADC",
  },
  question: {
    paddingBottom: 24,
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    lineHeight: "120%",
  },
  description: {
    fontWeight: "400",
    fontSize: "90%",
    color: "#1D232E",
    paddingRight: 8,
    lineHeight: "120%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 32,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: ws > 960 ? ws / 3 - 80 : ws > 600 ? ws / 2 - 80 : ws - 80,
    padding: 8,
    flexGrow: 0,
    minHeight: 60,
    paddingHorizontal: 16,
  },
  item: {
    marginVertical: 8,
    borderRadius: 8,
    borderColor: "#D3D3D3",
    backgroundColor: "#fff",
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 16,
    boxSizing: "border-box",
  },
  hint: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    padding: 16,
    textAlign: "center",
  },
  hintDescription: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    lineHeight: "120%",
  },
  imageBox: {
    maxHeight: 180,
  },
  image: {
    maxHeight: 180,
    minHeight: 60,
    width: 40,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  dot: {
    border: "1px solid #D3D3D3",
    height: 16,
    width: 16,
    borderRadius: 50,
  },
  checkMark: {
    height: 16,
    width: 16,
    resizeMode: "object-fit",
  },
  hintImage: {
    minHeight: 40,
    maxWidth: 300,
    resizeMode: "contain",
  },
});