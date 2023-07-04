import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";

const ImageHolder = ({ path, size }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSize = () => {
      Image.getSize(path, (width, height) => {
        setWidth(width);
        setHeight(height);
      });
    };
    if (loading) {
      getSize();
    }
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    // <View
    //   style={{
    //     height: 125,
    //     width: 250,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginBottom: "16px",
    //     // border: "8px groove #AE66E4",
    //   }}
    // >
    //   <Image
    //     source={path}
    //     style={{
    //       width: width,
    //       height: height,
    //       maxHeight: 109,
    //       maxWidth: 234,
    //       resizeMode: "contain",
    //     }}
    //   />
    // </View>
    <Image
      source={path}
      style={{
        width: width,
        height: height,
        resizeMode: "contain",
      }}
    />
  );
};

export default ImageHolder;

const styles = StyleSheet.create({});
