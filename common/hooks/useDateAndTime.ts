import { useContext, useRef, useState } from "react";

import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { formatDateAndTime } from "../../utils/formatDateTime";
import { Activity } from "../interfaces/data.interface";
import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "../../components/contexts/ActivityContext";

export type dateTime = "date" | "time";

type stateProps = { componentType: dateTime; componentTitle: keyof Activity };

export function useDateAndTime({ componentType, componentTitle }: stateProps) {
  const activityState = useContext(ActivityStateContext);
  const activityDispatch = useContext(ActivityDispatchContext);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const dataTypeRef = useRef(componentType).current;
  const iconRef = useRef(
    componentType === "date" ? "calendar-outline" : "time-outline",
  ).current;

  function showDateModal() {
    // setDateOrTime(formatDateAndTime(new Date().toString(), componentType));
    setShowDatePicker(true);
  }

  function changeDateOrTime(e: DateTimePickerEvent, date: Date) {
    if (e.type === "set") {
      // setDateOrTime(formatDateAndTime(date, componentType));
      activityDispatch({
        type: "add-any",
        payload: {
          key: componentTitle,
          value: formatDateAndTime(date, componentType),
        },
      });
    }
    setShowDatePicker(false);
  }

  return {
    dateOrTime: activityState[componentTitle] as string,
    showDateModal,
    changeDateOrTime,
    showDatePicker,
    dataTypeRef,
    iconRef,
  };
}
