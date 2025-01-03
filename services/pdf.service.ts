import { shareAsync, isAvailableAsync } from "expo-sharing";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { ShowToast } from "../utils/showToast";

import { getJsonData } from "./json.service";
import { formatDateAndTime } from "../utils/formatDateTime";

export async function sharePDF(html: string) {
  try {
    if (!html || html.trim().length === 0) {
      throw new Error("Invalid or empty HTML");
    }

    const { name } = await getJsonData();

    let options = {
      html,
      fileName: `${formatDateAndTime(new Date().toString(), "date")}_${name}_Daily_Report`,
    };

    const file = await RNHTMLtoPDF.convert(options);

    if ((await isAvailableAsync()) && file.filePath) {
      await shareAsync("file://" + file.filePath);
    } else {
      console.log("Sharing is not available on this device");
    }

    console.log("Archivo compartido exitosamente.");
  } catch (error) {
    const err = error as { message: string };
    ShowToast(err.message, "danger");
  }
}

export async function logPPdfs() {}
