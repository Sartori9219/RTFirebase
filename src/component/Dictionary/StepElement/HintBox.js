import React, { useState, useEffect } from "react";
import ImageHolder from "./ImageHolder";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import VideoInput from "../../ProjectBased/StepElement/VideoInput";

import { getImage, formatQuestion, getVideo } from "../../utils";
function HintBox(props) {
  const [hints, setHints] = useState([]);

  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();

    const init = () => {
      if (props.hints !== undefined && controller.signal.aborted === false) {
        setHints(props.hints);
      }
    };

    init();
    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, [props.hints]);

  return (
    <View style={{ width: "100%", paddingTop: "10px" }}>
      {hints.length > 0 &&
        hints.map((hint, index) => {
          if (hint.isBought) {
            return (
              <View
                key={`hint${index}`}
                style={{ width: "100%", paddingTop: "20px" }}
              >
                <View style={{ justifyContent: "left" }}>
                  <Text style={styles.title}>{`Hint ${index + 1}`}</Text>
                  <Text style={styles.hintDescription}>
                    {formatQuestion(hint.description || hint)}
                  </Text>
                  {/* {getImage(hint.description) && (
                    <ImageHolder path={getImage(hint.description)} />
                  )} */}
                  {getVideo(hint.description || hint) && (
                    <VideoInput
                      width={32}
                      height={32}
                      videoSrc={getVideo(hint.description || hint)}
                    />
                  )}
                </View>
              </View>
            );
          }
        })}
    </View>
  );
}

export default HintBox;

const styles = StyleSheet.create({
  title: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#A25ADC",
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
  },

  hintDescription: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#1D232E",
    lineHeight: "120%",
  },
});
