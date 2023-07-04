import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import GoogleButton from 'react-google-button'
function LoginWithGoogle({ loginWithGoogle }) {
  return (
    // <Pressable
    //   onPress={() => loginWithGoogle()}
    //   style={{ backgroundColor: "#D3D3D3", padding: 8 }}
    // >
    //   <Text>Login with google</Text>
    // </Pressable>
    <GoogleButton
      onClick={() => loginWithGoogle()}
    />
  );
}

export default LoginWithGoogle;

const styles = StyleSheet.create({});
