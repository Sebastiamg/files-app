import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useContext, useEffect, useRef, useState } from "react";
import { formatDateAndTime } from "../../utils/formatDateTime";
import { activityActions } from "../reducers/dailyActiviry-reducer";
import { Activity } from "../interfaces/data.interface";
import {
  ActivityContext,
  DispatchActivityContext,
} from "../../components/contexts/ActivityContext";

export type dateTime = "date" | "time";

type stateProps = { componentType: dateTime; componentTitle: keyof Activity };

export function useDateAndTime({ componentType, componentTitle }: stateProps) {
  const state = useContext(ActivityContext);
  const dispatch = useContext(
    DispatchActivityContext,
  ) as React.Dispatch<activityActions>;

  const [dateOrTime, setDateOrTime] = useState<string>(
    state[componentTitle] as string,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dataTypeRef = useRef(componentType).current;
  const iconRef = useRef(
    componentType === "date" ? "calendar-outline" : "time-outline",
  ).current;

  function showDateModal() {
    console.log("date ahorita: ", new Date().toString());
    setDateOrTime(formatDateAndTime(new Date().toString(), componentType));
    setShowDatePicker(true);
  }

  function changeDateOrTime(_: DateTimePickerEvent, date: Date) {
    setDateOrTime(formatDateAndTime(date, componentType));
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
    showDateModal,
    changeDateOrTime,
    showDatePicker,
    dataTypeRef,
    iconRef,
  };
}
