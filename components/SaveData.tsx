import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import { activityActions } from "../common/reducers/dailyActiviry-reducer";
import { ActivityContext } from "./contexts/ActivityContext";
import { ShowToast } from "../utils/showToast";
import {
  getJsonData,
  resetJsonData,
  storeJsonData,
} from "../services/json.service";
import { formStyles } from "../common/styles/styles";

export default function SaveData() {
  const [activityState, activityDispatch] = useContext(ActivityContext);

  const saveData = () => {
    activityDispatch({ type: "save_in_db" });
    // resetJsonData();
    // activityDispatch({ type: "logfomdb" });
    // ShowToast("Input de mensaje debe ser puesto", "success");
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
