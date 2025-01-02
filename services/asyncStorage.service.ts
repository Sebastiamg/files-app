import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShowToast } from "../utils/showToast";

export const getActivityEntrie = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? jsonValue : null;
  } catch (error) {
    const err = error as { message: string };
    ShowToast(err.message, "danger");
    return null;
  }
};

export const storeActivityEntrie = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    const err = error as { message: string };
    ShowToast(err.message, "danger");
  }
};

export const removeAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys) {
      await AsyncStorage.multiRemove(keys);
    }
    return true;
  } catch (error) {
    const err = error as { message: string };
    ShowToast(err.message, "danger");
  }
};
