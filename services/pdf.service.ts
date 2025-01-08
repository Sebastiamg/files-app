import { shareAsync, isAvailableAsync } from "expo-sharing";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { ShowToast } from "../utils/showToast";

import { getJsonName } from "./json.service";
import { formatDateAndTime } from "../utils/formatDateTime";

export async function sharePDF(html: string, fileName?: string) {
  try {
    if (!html || html.trim().length === 0) {
      throw new Error("Invalid or empty HTML");
    }

    const name = await getJsonName();

    let options = {
      html,
      fileName:
        fileName ||
        `${formatDateAndTime(new Date().toString(), "date")}_${name || "Anonymus"}_Daily_Report`,
    };

    const file = await RNHTMLtoPDF.convert(options);

    if ((await isAvailableAsync()) && file.filePath) {
      await shareAsync("file://" + file.filePath);
    } else {
      console.log("Sharing is not available on this device");
    }

    ShowToast("File shared successfully", "success");
  } catch (error) {
    const err = error as { message: string };
    ShowToast(err.message, "danger");
  }
}

export async function logPPdfs() {}
