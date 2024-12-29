import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

export async function sharePDF(html: string) {
  if (html.length > 10) {
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  } else {
    return "No HTML data";
  }
}
