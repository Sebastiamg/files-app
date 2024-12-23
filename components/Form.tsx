import { View, Text, Pressable } from "react-native";

import { formStyles } from "../common/styles/styles";
import DateComponent from "./DateComponent";
import { useReducer } from "react";
import {
  activityReducer,
  initialActivityState,
} from "../common/reducers/dailyActiviry-reducer";
import InputComponent from "./InputComponent";
import SpeechInput from "./SpeechInput";

export default function Form() {
  const [state, dispatch] = useReducer(activityReducer, initialActivityState);

  const logActivity = () => {
    console.log(state);
    // dispatch({ type: "reset-data" });
  };

  return (
    <View style={formStyles.form__container}>
      <Text style={formStyles.form__title}>Add Daily Activity</Text>
      {/* 1. Date component */}
      <DateComponent
        componentType={"date"}
        dispatch={dispatch}
        componentTitle={"date"}
      />
      {/* 2. Details component */}
      <SpeechInput componentTitle={"details"} dispatch={dispatch} />
      {/* 3. Quantity component */}
      <InputComponent componentTitle="quantity" dispatch={dispatch} />
      {/* 4. Start Hour component */}
      <DateComponent
        componentType={"time"}
        dispatch={dispatch}
        componentTitle={"start_hour"}
      />
      {/* 5. Pause Hour component */}
      <DateComponent
        componentType={"time"}
        dispatch={dispatch}
        componentTitle={"pause"}
      />
      {/* 6. Restart Hour component */}
      <DateComponent
        componentType={"time"}
        dispatch={dispatch}
        componentTitle={"restart"}
      />
      {/* 7. End Hour component */}
      <DateComponent
        componentType={"time"}
        dispatch={dispatch}
        componentTitle={"end_hour"}
      />
      {/* 8. SaveAll Hour component */}
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
