import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { setGif } from '../../../redux/actions/gif';
import { randomNumberInRange } from '../../utils';
import ImageHolder from "./ImageHolder";


function Chat({ questions, currentQuestion }) {
  const dispatch = useDispatch();
  const gif = useSelector((state) => state.gif);
  var randomNum = null;
  if (gif.data) {
    randomNum = gif.data.fileName;
  }

  useEffect(() => {
    dispatch(setGif({ fileName: randomNumberInRange(1, 15) }));
  }, [currentQuestion]);
  return (
    <>
      <View style={{ alignItems: "center", paddingHorizontal: 16 }}>
        {
          randomNum &&
          <ImageHolder path={`assets/dictionary/${randomNum}.gif`} />
        }
        <View style={styles.bubble}>
          {questions[currentQuestion].question.map((item, index) => {
            let fontSize = item.length < 90 ? 15 : item.length < 220 ? 12 : 10;
            if (index % 2 === 0) {
              return (
                <View key={index}>
                  <ImageHolder path="assets/dictionary/comment_bubble.png" />
                  <View style={styles.textBubbleContainer}>
                    <Text style={[
                      styles.textBubble,
                      {
                        fontSize: fontSize,
                        marginTop: 10
                      }
                    ]}
                    >
                      {item}
                    </Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.bottomBubble}>
                  <ImageHolder path="assets/dictionary/comment_bubble.png" />
                  <View
                    style={[
                      styles.textBubbleContainer,
                      styles.textBottomBubble,
                    ]}
                  >
                    <Text style={[
                      styles.textBubble,
                      {
                        fontSize: fontSize,
                        marginTop: 20
                      }
                    ]}
                    >
                      {item}
                    </Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </View>
    </>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 64,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  textLogo: {
    fontSize: 32,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
  },

  //Dictionary
  people: {},
  bubble: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  bottomBubble: {
    transform: "rotate(180deg)",
    marginTop: 45
  },
  textBubbleContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexWrap: "wrap",
    padding: 16,
  },
  textBubble: {
    textAlign: "center",
  },
  textBottomBubble: { transform: "rotate(180deg)" },
});
