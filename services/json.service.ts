import uuid from "react-native-uuid";

import * as FileSystem from "expo-file-system";
import { Activity, Data } from "../common/interfaces/data.interface";

import jsonBase from "../jsonbase.json";
import { ShowToast } from "../utils/showToast";

const fileUri = FileSystem.documentDirectory + "data.json";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

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

// -------------------- Set main name
export async function setJsonName(name: string) {
  const jsonData = await getJsonData();
  const payload = JSON.stringify({ ...jsonData, name });
  try {
    await FileSystem.writeAsStringAsync(fileUri, payload);

    // ShowToast(`${name}: Successfull name changed`, "success");
    return `${name}: Cambio de nombre exitoso`;
  } catch (error) {
    console.error("No hubo archivo, así que se creó", error);
  }
}

// -------------------- Save activity in JSON
export const storeJsonData = async (activity: Activity) => {
  const { activities, name } = await getJsonData();

  const emptyDay = activities[activity.date] === undefined;
  console.log("esta vacío: ", activities[activity.date]);
  try {
    const jsonData: Data = {
      name,
      activities: {
        ...activities,
        [activity.date]: emptyDay
          ? [{ ...activity, id: uuid.v4() }]
          : [...activities[activity.date], { ...activity, id: uuid.v4() }],
      },
    };

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jsonData));
    ShowToast("Activity saved", "success");
    return jsonData;
  } catch (error) {
    ShowToast(`${error}`, "warning");
    console.error(error);
  }
};

export async function printAndSahreXD(html?: string) {
  if (html) {
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: "Holaxd.pdf", mimeType: "application/pdf" });
  } else {
    return "sin html";
  }
}
