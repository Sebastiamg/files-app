import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { Activity, Data } from "../common/interfaces/data.interface";
import { ShowToast } from "../utils/showToast";
import jsonBase from "../jsonbase.json";
import sortActivities from "../utils/sortActivities";
import { sortDates } from "../utils/sortDates";

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
    ShowToast("Error reading file, so it was created", "danger");
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
      activities: {
        ...jsonActivities,
        [activity.date]: sortActivities([...activitiesDay]),
      },
    };

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newJsonData));
    ShowToast("Activity edited", "success");
    return newJsonData;
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
  }
}

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
      activities: {
        ...jsonActivities,
        [activityDate]: newActivities,
      },
    };

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newJsonData));
    ShowToast("Activity deleted", "success");
  } catch (error) {
    ShowToast(`${error}`, "danger");
    console.error(error);
  }
}
