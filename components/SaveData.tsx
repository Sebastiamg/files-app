import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "./contexts/ActivityContext";
import { formStyles } from "../common/styles/styles";
import { ActivitiesDispatchContext } from "./contexts/ActivitiesContext";

export default function SaveData() {
  const activityDispatch = useContext(ActivityDispatchContext);
  const activityState = useContext(ActivityStateContext);
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  const saveData = () => {
    activityDispatch({ type: "save_in_db" });
    activitiesDispatch({
      type: "update-today-activities",
      payload: { activity: activityState },
    });
  };

  return (
    <TouchableOpacity
      style={[formStyles.form__save__data__container]}
      onPressIn={saveData}
    >
      <Text style={[formStyles.form__save__data__title]}>Save Data</Text>
    </TouchableOpacity>
  );
}
