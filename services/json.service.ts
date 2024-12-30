import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { Activity, Data } from "../common/interfaces/data.interface";
import { ShowToast } from "../utils/showToast";
import jsonBase from "../jsonbase.json";

const fileUri = FileSystem.documentDirectory + "data.json";

// -------------------- Clear data from JSON file
export async function resetJsonData(): Promise<boolean> {
  try {
    const jsonData = JSON.stringify(jsonBase);
    await FileSystem.writeAsStringAsync(fileUri, jsonData);
    ShowToast("All data has been deleted", "danger");
    return true;
  } catch (error) {
    console.error("Failed to delete all data:", error);
    return false;
  }
}

// -------------------- Delete JSON file
export async function deleteJsonFile(): Promise<boolean> {
  try {
    await FileSystem.deleteAsync(fileUri);
    console.log("File has been deleted");
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

// -------------------- Get JSON file
export async function getJsonData(): Promise<Data> {
  try {
    const jsonData = await FileSystem.readAsStringAsync(fileUri);
    const data: Data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jsonBase));
    console.error("Error al leer el archivo, así que se creó:", error);
    return jsonBase;
  }
}

// -------------------- Donwload JSON file
export async function downloadJsonFile() {
  try {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      throw new Error("Sharing is not available on this device");
    }
    ShowToast("JSON data donwnloaded", "success");
    return true;
  } catch (error) {
    const err = error as { message: string };
    ShowToast(err.message, "danger");
    return false;
  }
}

// -------------------- Set main name
export async function setJsonName(name: string) {
  const jsonData = await getJsonData();
  const payload = JSON.stringify({ ...jsonData, name });
  try {
    await FileSystem.writeAsStringAsync(fileUri, payload);

    return `${name}: Name changed successfully`;
  } catch (error) {
    console.log(error);
    return "Error  changing name";
  }
}

// -------------------- Save activity in JSON
export const storeJsonData = async (activity: Activity) => {
  const { activities, ...jsonData } = await getJsonData();

  const emptyDate = activities[activity.date] === undefined;

  try {
    const jsonDataPayload: Data = {
      ...jsonData,
      activities: {
        ...activities,
        [activity.date]: emptyDate
          ? [{ ...activity }]
          : [...activities[activity.date], { ...activity }],
      },
    };

    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify(jsonDataPayload),
    );

    ShowToast("Activity saved", "success");

    return jsonData;
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
  }
};
