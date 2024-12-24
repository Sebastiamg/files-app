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

  const [dateOrTime, setDateOrTime] = useState<Date | string>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    console.log(dateOrTime);
    if (componentTitle !== "date") {
      // setDateOrTime(state[componentTitle]);
      // console.log(state[componentTitle]);
    }
  }, []);

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
    dateOrTimeFormated: formatDateAndTime(new Date(dateOrTime), componentType),
    showDateModal,
    changeDateOrTime,
    showDatePicker,
    dataTypeRef,
    iconRef,
  };
}
