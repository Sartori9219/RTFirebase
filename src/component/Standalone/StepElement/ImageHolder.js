import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";

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
