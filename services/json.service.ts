import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as DocumentPicker from "expo-document-picker";

import { Activity, Data } from "../common/interfaces/data.interface";
import { ShowToast } from "../utils/showToast";
import jsonBase from "../jsonbase.json";
import sortActivities from "../utils/sortActivities";
import { sortDates } from "../utils/sortDates";
import { Alert } from "react-native";

const fileUri = FileSystem.documentDirectory + "data.json";
const fileUriCache = FileSystem.cacheDirectory + "data.json";

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
    ShowToast("File has been deleted", "success");
    return true;
  } catch (error) {
    ShowToast("Error deleting file:" + error, "danger");
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
    ShowToast("Error reading file, so it was created", "success");
    console.log("Error reading file, so it was created:", error);
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

// -------------------- Donwload JSON file and sabe locally - PENDIGN
export async function downloadJsonFileAndSaveLocally() {
  await FileSystem.copyAsync({ from: fileUri, to: fileUriCache });

  // 1. Generar el contenido del archivo JSON
  const data = await getJsonData();
  const jsonString = JSON.stringify(data, null, 2);

  // 2. Crear un archivo temporal
  const fileUri1 = `${FileSystem.documentDirectory}info.json`;
  await FileSystem.writeAsStringAsync(fileUri1, jsonString);
  console.log("Archivo guardado temporalmente en:", fileUri1);

  // 3. Solicitar permisos de almacenamiento
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permiso denegado",
      "Se requieren permisos para guardar el archivo.",
    );
    return;
  }

  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri1);
    if (!fileInfo.exists) {
      console.log("El archivo no existe en la ruta:", fileUri1);
      return;
    }
    // 4. Guardar el archivo en la carpeta de Descargas
    const asset = await MediaLibrary.createAssetAsync(fileUriCache);
    const album = await MediaLibrary.getAlbumAsync("Download");
    if (album == null) {
      // Si no existe la carpeta "Download", se crea
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    } else {
      // Si ya existe, se añade el archivo
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    Alert.alert("Éxito", "Archivo guardado en la carpeta de Descargas.");
  } catch (error) {
    Alert.alert("Error", "No se pudo guardar el archivo en Descargas.");
    console.error("Error al guardar el archivo:", error);
  }
}

// -------------------- Upload JSON file
export async function uploadJsonFile() {
  try {
    const uploadedFile = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });

    if (!uploadedFile.canceled && !uploadedFile.assets)
      throw new Error("No file selected");

    const fileUri = uploadedFile.assets![0].uri;
    const jsonData = JSON.parse(await FileSystem.readAsStringAsync(fileUri));

    console.log(jsonData);
    return jsonData;
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
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
    return "Error changing name" + error;
  }
}

// -------------------- Get main name
export async function getJsonName(): Promise<string> {
  try {
    const jsonData = await FileSystem.readAsStringAsync(fileUri);
    const data: Data = JSON.parse(jsonData);
    return data.name;
  } catch (error) {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jsonBase));
    console.log(error);
    return "No name";
  }
}

// -------------------- Save activity in JSON
export const storeJsonData = async (activity: Activity) => {
  try {
    const { activities, ...jsonData } = await getJsonData();

    const emptyDate = activities[activity.date] === undefined;

    const jsonDataPayload: Data = {
      ...jsonData,
      activities: sortDates({
        ...activities,
        [activity.date]: emptyDate
          ? [{ ...activity }]
          : sortActivities([...activities[activity.date], { ...activity }]),
      }),
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

// -------------------- Edit activity in JSON
export async function editActivityFromJsonData(activity: Activity) {
  try {
    const jsonData = await getJsonData();
    const jsonActivities = jsonData.activities;
    const activitiesDay = jsonActivities[activity.date];

    const activityToUpdate = activitiesDay.findIndex(
      (item) => item.id === activity.id,
    );
    activitiesDay[activityToUpdate] = activity;

    const newJsonData = {
      ...jsonData,
      activities: sortDates({
        ...jsonActivities,
        [activity.date]: sortActivities([...activitiesDay]),
      }),
    };

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newJsonData));
    ShowToast("Activity edited", "success");
    return newJsonData;
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
  }
}

// -------------------- Delete activity in JSON
export async function deleteActivityFromJsonData(
  activityDate: string,
  activityId: string,
) {
  try {
    const jsonData = await getJsonData();
    const jsonActivities = jsonData.activities;
    const activitiesDay = jsonActivities[activityDate];

    const newActivities = activitiesDay.filter((activity) => {
      return activity.id !== activityId;
    });

    const newJsonData = {
      ...jsonData,
      activities: sortDates({
        ...jsonActivities,
        [activityDate]: sortActivities(newActivities),
      }),
    };

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newJsonData));
    ShowToast("Activity deleted", "success");
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
  }
}

// -------------------- Edit Date in JSON
export async function deleteDayFromJsonDate(dateToDelete: string) {
  try {
    const jsonData = await getJsonData();

    const jsonActivities = jsonData.activities;
    delete jsonActivities[dateToDelete];

    const newJsonData = {
      ...jsonData,
      activities: sortDates(jsonActivities),
    };

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newJsonData));
    ShowToast("Date deleted", "success");
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
  }
}
