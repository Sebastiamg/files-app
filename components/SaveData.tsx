import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "./contexts/ActivityContext";
import { formStyles } from "../common/styles/styles";
import { ActivitiesDispatchContext } from "./contexts/ActivitiesContext";
import { resetJsonData } from "../services/json.service";

export default function SaveData() {
  const activityDispatch = useContext(ActivityDispatchContext);
  const activityState = useContext(ActivityStateContext);
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  const saveData = () => {
    activityDispatch({ type: "save_in_db" });

    // solo si está en la misma pantalla
    // activitiesDispatch({
    //   type: "update-today-activities",
    //   payload: { activity: activityState },
    // });
  };

  const saveData1 = () => {
    resetJsonData();
  };

  return (
    <TouchableOpacity
      style={[formStyles.form__save__data__container]}
      onPress={saveData}
    >
      <Text style={[formStyles.form__save__data__title]}>Save Data</Text>
    </TouchableOpacity>
  );
}
