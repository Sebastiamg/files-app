import * as Localozation from "expo-localization";
import { formatName } from "./formatName";

export function formatLocaleDate(stringDate: string) {
  const langLocale = Localozation.getLocales()[0].languageTag;
  const localeDate = new Date(
    stringDate.concat("T00:00:00"),
  ).toLocaleDateString(langLocale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatName(localeDate, true);
}
