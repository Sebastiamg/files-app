import { useContext, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

import { activityActions } from "../common/reducers/dailyActiviry-reducer";
import { ActivityDispatchContext } from "./contexts/ActivityContext";
import { ShowToast } from "../utils/showToast";
import {
  getJsonData,
  resetJsonData,
  storeJsonData,
} from "../services/json.service";
import { formStyles } from "../common/styles/styles";

export default function SaveData() {
  const activityDispatch = useContext(ActivityDispatchContext);

  const saveData = () => {
    console.log("caca");
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
