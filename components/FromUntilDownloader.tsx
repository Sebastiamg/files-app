import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { donwnloaderStyles } from "../common/styles/styles";
import { formatDateAndTime } from "../utils/formatDateTime";
import { sharePDF } from "../services/pdf.service";
import { htmlBaseES } from "../utils/htmlBaseES";
import { getJsonName } from "../services/json.service";

export default function FromUntilDownloader() {
  const activitiesState = useContext(ActivitiesStateContext);

  const [fromDate, setFromDate] = useState(
    formatDateAndTime(new Date(), "date"),
  );
  const [toDate, setToDate] = useState(formatDateAndTime(new Date(), "date"));

  const [fromDatePicker, setFromDatePicker] = useState(false);
  const [toDatePicker, setToDatePicker] = useState(false);

  const handleFromDatePciker = () => {
    setFromDatePicker(true);
  };

  const handleToDatePciker = () => {
    setToDatePicker(true);
  };

  const handleDatesChange = (e: DateTimePickerEvent, type: "from" | "to") => {
    const date = formatDateAndTime(new Date(e.nativeEvent.timestamp), "date");

    if (type === "from") {
      setFromDate(date);
    } else {
      setToDate(date);
    }

    setFromDatePicker(false);
    setToDatePicker(false);
  };

  const downloadActivities = async () => {
    const fromEntrieIndex = Object.entries(
      activitiesState.activities,
    ).findIndex(([key]) => key === fromDate || fromDate < key);

    const toEntrieIndex = Object.entries(
      activitiesState.activities,
    ).findLastIndex(([key]) => key === toDate);

    const slicedActivityDates = Object.entries(
      activitiesState.activities,
    ).slice(fromEntrieIndex, toEntrieIndex + 1);

    const mixedActivities = [
      ...Object.values(Object.fromEntries(slicedActivityDates)),
    ].flat(1);

    sharePDF(
      htmlBaseES(mixedActivities, await getJsonName()),
      `${fromDate}_to_${toDate}_${(await getJsonName()) || "Anonymus"}_Daily_Reports`,
    );
  };

  return (
    <View>
      {Object.keys(activitiesState.activities).length > 1 && (
        <View style={[donwnloaderStyles.downloader__container]}>
          <View style={[donwnloaderStyles.downloader__item]}>
            <Text style={[donwnloaderStyles.downloader__label]}>From</Text>
            <Text
              onPress={handleFromDatePciker}
              style={[donwnloaderStyles.downloader__input]}
              children={fromDate}
            />
            {fromDatePicker && (
              <DateTimePicker
                value={new Date()}
                onChange={(e) => handleDatesChange(e, "from")}
                maximumDate={new Date()}
                minimumDate={
                  new Date(Object.keys(activitiesState.activities)[0])
                }
              />
            )}
          </View>
          <View style={[donwnloaderStyles.downloader__item]}>
            <Text style={[donwnloaderStyles.downloader__label]}>To</Text>
            <Text
              onPress={handleToDatePciker}
              style={[donwnloaderStyles.downloader__input]}
              children={toDate}
            />
            {toDatePicker && (
              <DateTimePicker
                value={new Date()}
                onChange={(e) => handleDatesChange(e, "to")}
                maximumDate={new Date()}
                minimumDate={
                  new Date(
                    Object.keys(activitiesState.activities)[0].concat(
                      "T00:00:00Z",
                    ),
                  )
                }
              />
            )}
          </View>
          <Pressable
            onPress={downloadActivities}
            style={[donwnloaderStyles.downloader__download]}
          >
            <Text style={[donwnloaderStyles.downloader__download__text]}>
              Download
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
