import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { signOut } from "@firebase/auth";
import { auth } from "../../config/firebase";

function Logout({ logout }) {
  return (
    <Pressable
      onPress={() => logout()}
      style={{ backgroundColor: "#D3D3D3", padding: 8 }}
    >
      <Text>Logout</Text>
    </Pressable>
  );
}

export default Logout;

const styles = StyleSheet.create({});
