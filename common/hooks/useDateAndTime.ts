import { useContext, useEffect, useRef, useState } from "react";

import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { formatDateAndTime } from "../../utils/formatDateTime";
import { Activity } from "../interfaces/data.interface";
import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "../../components/contexts/ActivityContext";
import { getActivityEntrie } from "../../services/asyncStorage.service";

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

  useEffect(() => {
    getActivityEntrie(componentTitle).then((data) => {
      if (data) {
        activityDispatch({
          type: "add-any",
          payload: {
            key: componentTitle,
            value: data,
          },
        });
      }
    });
  }, []);

  function showDateModal() {
    setShowDatePicker(true);
  }

  function changeDateOrTime(e: DateTimePickerEvent, date: Date) {
    if (e.type === "set") {
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

  function resetWithLongPress() {
    activityDispatch({
      type: "add-any",
      payload: {
        key: componentTitle,
        value: "",
      },
    });
  }

  return {
    dateOrTime: activityState[componentTitle] as string,
    showDateModal,
    changeDateOrTime,
    showDatePicker,
    dataTypeRef,
    iconRef,
    resetWithLongPress,
  };
}
