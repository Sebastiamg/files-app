import { useContext } from "react";
import { View, Text } from "react-native";

import { formStyles } from "../common/styles/styles";
import DateComponent from "./DateComponent";
import InputComponent from "./InputComponent";
import SpeechInput from "./SpeechInput";
import SaveData from "./SaveData";
import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "./contexts/ActivityContext";

export default function Form() {
  const activityState = useContext(ActivityStateContext);
  const activityDispatch = useContext(ActivityDispatchContext);

  return (
    <View style={formStyles.form__container}>
      <Text style={formStyles.form__title}>Add Daily Activity</Text>

      {/* 1. Date component */}
      <DateComponent componentType={"date"} componentTitle={"date"} />

      {/* 2. Details component */}
      <SpeechInput componentTitle={"details"} />

      {/* 3. Quantity component */}
      <InputComponent
        initialState={activityState.quantity}
        componentTitle="quantity"
        activityDispatch={activityDispatch}
      />

      {/* 4. Start Hour component */}
      <DateComponent componentType={"time"} componentTitle={"start_hour"} />

      <View style={[formStyles.form__hour__container]}>
        {/* 5. Pause Hour component */}
        <DateComponent componentType={"time"} componentTitle={"pause"} />

        {/* 6. Restart Hour component */}
        <DateComponent componentType={"time"} componentTitle={"restart"} />
      </View>

      {/* 7. End Hour component */}
      <DateComponent componentType={"time"} componentTitle={"end_hour"} />

      {/* 8. SaveAll component */}
      <SaveData />
    </View>
  );
}
