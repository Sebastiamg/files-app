import uuid from "react-native-uuid";

import { storeJsonData } from "../../services/json.service";
import { formatDateAndTime } from "../../utils/formatDateTime";
import { formatName } from "../../utils/formatName";
import { ShowToast } from "../../utils/showToast";
import { Activity } from "../interfaces/data.interface";
import {
  removeAllKeys,
  storeActivityEntrie,
} from "../../services/asyncStorage.service";

export type activityActions =
  | { type: "add-any"; payload: { key: keyof Activity; value: string } }
  | { type: "reset-data" }
  | { type: "log-state" }
  // db methods
  | { type: "save_in_db" };

type initialState = Activity;

export const initialActivityState: initialState = {
  id: "",
  date: formatDateAndTime(new Date().toString(), "date"),
  details: "",
  quantity: "0",
  start_hour: "",
  pause: "",
  restart: "",
  end_hour: "",
};

export const activityReducer = (
  state: Activity = initialActivityState,
  action: activityActions,
) => {
  switch (action.type) {
    case "add-any":
      const { key, value } = action.payload;
      storeActivityEntrie(key, value);

      return {
        ...state,
        [key]: value,
      };

    case "reset-data":
      return initialActivityState;

    case "log-state":
      return state;

    case "save_in_db":
      const skipStrings: (keyof Activity)[] = ["id", "pause", "restart"];

      // set id
      state.id = uuid.v4();

      try {
        for (
          let i = 0, entrie = Object.entries(state);
          i < Object.entries(state).length;
          i++
        ) {
          const [key, value] = entrie[i];

          if (skipStrings.includes(key as keyof Activity)) continue;
          if (value.length <= 0) {
            throw new Error(`${formatName(key)} is Empty`);
          }
        }

        // validate pause and restart
        if (state.pause!.length > 1 && state.restart!.length < 1)
          throw new Error("Restart hour is missing");

        if (state.restart!.length > 1 && state.pause!.length < 1)
          throw new Error("Pause hour is missing");

        // Save in JSON
        storeJsonData(state).then(() => {
          state = initialActivityState;
          removeAllKeys();
        });

        return initialActivityState;
      } catch (err: unknown) {
        const { message } = err as { message: string };
        ShowToast(message, "danger");
        return state;
      }

    default:
      return state;
  }
};
