import * as FileSystem from "expo-file-system";
import { Activity, Data } from "../common/interfaces/data.interface";

import jsonBase from "../jsonbase.json";

const fileUri = FileSystem.documentDirectory + "data.json";

export async function resetJsonData(): Promise<boolean> {
  try {
    const jsonData = JSON.stringify(jsonBase);
    await FileSystem.writeAsStringAsync(fileUri, jsonData);
    console.error("All data has been deleted");
    return true;
  } catch (error) {
    console.error("Failed to delete all data:", error);
    return false;
  }
}

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

export async function setJsonName(name: string) {
  const jsonData = await getJsonData();
  const payload = JSON.stringify({ ...jsonData, name });
  try {
    await FileSystem.writeAsStringAsync(fileUri, payload);
    return `${name}: Cambio de nombre exitoso`;
  } catch (error) {
    console.error("No hubo archivo, así que se creó", error);
  }
}

export const storeJsonData = async (data: Activity) => {
  const prevData = await getJsonData();

  // const payload: Data = {};

  try {
    const jsonData = JSON.stringify(prevData);

    await FileSystem.writeAsStringAsync(fileUri, jsonData);

    return jsonData;
  } catch (error) {
    console.error("No hubo archivo, así que se creó", error);
  }
};
