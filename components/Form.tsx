import { View, Text, Pressable } from "react-native";

import { formStyles } from "../common/styles/styles";
import DateComponent from "./DateComponent";
import { useContext, useEffect, useReducer } from "react";
import {
  activityActions,
  activityReducer,
  initialActivityState,
} from "../common/reducers/dailyActiviry-reducer";
import InputComponent from "./InputComponent";
import SpeechInput from "./SpeechInput";
import {
  ActivityContext,
  DispatchActivityContext,
} from "./contexts/ActivityContext";

export default function Form() {
  // const [state, dispatch] = useReducer(activityReducer, initialActivityState);

  const state = useContext(ActivityContext);
  const dispatch = useContext(
    DispatchActivityContext,
  ) as React.Dispatch<activityActions>;

  const logActivity = () => {
    console.log(state);
    // dispatch({ type: "reset-data" });
    // dispatch({ type: "log-state" });
  };

  return (
    <View style={formStyles.form__container}>
      <Text style={formStyles.form__title}>Add Daily Activity</Text>

      {/* 1. Date component */}
      <DateComponent componentType={"date"} componentTitle={"date"} />

      {/* 2. Details component */}
      <SpeechInput componentTitle={"details"} />

      {/* 3. Quantity component */}
      <InputComponent
        initialState={state.quantity}
        componentTitle="quantity"
        dispatch={dispatch}
      />

      {/* 4. Start Hour component */}
      <DateComponent componentType={"time"} componentTitle={"start_hour"} />

      {/* 5. Pause Hour component */}
      <DateComponent componentType={"time"} componentTitle={"pause"} />

      {/* 6. Restart Hour component */}
      <DateComponent componentType={"time"} componentTitle={"restart"} />

      {/* 7. End Hour component */}
      <DateComponent componentType={"time"} componentTitle={"end_hour"} />

      {/* 8. SaveAll component */}

      {/* LOG DATA */}
      <Pressable onPress={logActivity}>
        <Text>LOG DATA</Text>
      </Pressable>
      <Pressable onPress={logActivity}>
        <Text>DELETE DATA</Text>
      </Pressable>
    </View>
  );
}
