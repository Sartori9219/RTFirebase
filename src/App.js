import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import HomePage from "./page/HomePage";
import JoinClassPage from "./page/JoinClassPage";
import SetupClassPage from "./page/SetupClassPage";
import NestedPage from "./page/NestedPage";
import DictionaryPage from "./page/DictionaryPage";
import StandalonePage from "./page/StandalonePage";
import ProjectBasedPage from "./page/ProjectBasedPage";
import DataProvider from "./component/ContextProvider/DataProvider";

function App() {
  const Stack = createNativeStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <DataProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="/"
            component={HomePage}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="JoinClassPage"
            component={JoinClassPage}
            options={{ title: "Join Class" }}
          />
          <Stack.Screen
            name="SetupClassPage"
            component={SetupClassPage}
            options={{ title: "Setup Class" }}
          />
          <Stack.Screen
            name="nestedPage"
            component={NestedPage}
            options={{ title: "Story Problem" }}
          />
          <Stack.Screen
            name="dictionaryPage"
            component={DictionaryPage}
            options={{ title: "Dictionary" }}
          />
          <Stack.Screen
            name="standalonePage"
            component={StandalonePage}
            options={{ title: "Standalone" }}
          />
          <Stack.Screen
            name="projectBasedPage"
            component={ProjectBasedPage}
            options={{ title: "ProjectBased" }}
          />
        </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  alertBoxCorrect: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: 0,
    justifyContent: "center",
  },
  alertBoxWrong: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: 0,
    justifyContent: "center",
  },
  alertCorrect: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  alertWrong: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
});
