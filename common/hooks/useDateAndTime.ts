import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRef, useState } from "react";
import { formatDateAndTime } from "../../utils/formatDateTime";
import { activityActions } from "../reducers/dailyActiviry-reducer";
import { Activity } from "../interfaces/data.interface";

export type dateTime = "date" | "time";

type stateProps = { componentType: dateTime; componentTitle: keyof Activity };

export function useDateAndTime(
  { componentType, componentTitle }: stateProps,
  dispatch: React.Dispatch<activityActions>,
) {
  const [dateOrTime, setDateOrTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dataTypeRef = useRef(componentType).current;
  const iconRef = useRef(
    componentType === "date" ? "calendar-outline" : "time-outline",
  ).current;

  function showDateModal() {
    // Current date on show modal
    setDateOrTime(new Date());
    setShowDatePicker(true);
  }

  function changeDateOrTime(evt: DateTimePickerEvent, date: Date) {
    setDateOrTime(date);
    setShowDatePicker(false);

    dispatch({
      type: "add-any",
      payload: {
        key: componentTitle,
        value: formatDateAndTime(date, componentType),
      },
    });
  }

  return {
    dateOrTime,
    setDateOrTime,
    dateOrTimeFormated: formatDateAndTime(dateOrTime, componentType),
    showDateModal,
    changeDateOrTime,
    showDatePicker,
    dataTypeRef,
    iconRef,
  };
}
