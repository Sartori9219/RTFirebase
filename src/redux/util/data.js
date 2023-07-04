import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  // AsyncStorage.clear()
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // saving failed
    console.log(error.message);
  }
};

export const getData = async (key) => {
  let value = "";
  // AsyncStorage.clear()
  try {
    value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error.message);
  }
};
