import { useContext, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

import { activityActions } from "../common/reducers/dailyActiviry-reducer";
import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "./contexts/ActivityContext";
import { ShowToast } from "../utils/showToast";
import {
  downloadJsonFile,
  getJsonData,
  resetJsonData,
  storeJsonData,
} from "../services/json.service";
import { formStyles } from "../common/styles/styles";
import { ActivitiesDispatchContext } from "./contexts/ActivitiesContext";

export default function SaveData() {
  const activityDispatch = useContext(ActivityDispatchContext);
  const activityState = useContext(ActivityStateContext);
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  const reset = false;
  const saveData = () => {
    if (reset) {
      resetJsonData();
    } else {
      activityDispatch({ type: "save_in_db" });
      activitiesDispatch({
        type: "update-today-activities",
        payload: { activity: activityState },
      });
    }
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
