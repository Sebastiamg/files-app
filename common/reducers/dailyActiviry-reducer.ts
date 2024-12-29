import { getJsonData, storeJsonData } from "../../services/json.service";
import { formatDateAndTime } from "../../utils/formatDateTime";
import { formatName } from "../../utils/formatName";
import { ShowToast } from "../../utils/showToast";
import { Activity } from "../interfaces/data.interface";

export type activityActions =
  | {
      type: "add-date";
      payload: { date: string };
    }
  | { type: "add-any"; payload: { key: keyof Activity; value: string } }
  | { type: "reset-data" }
  | { type: "log-state" }
  | { type: "logfomdb" }
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
    case "add-date":
      return {
        ...state,
        date: action.payload.date,
      };

    case "add-any":
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };

    case "reset-data":
      console.log("Data reseted...");
      return initialActivityState;

    case "log-state":
      for (let [key, value] of Object.entries(state)) {
        console.log(key, "->", value);
      }

    case "logfomdb":
      getJsonData().then((res) => {
        console.log(res);
      });

      return state;

    case "save_in_db":
      const skipStrings: (keyof Activity)[] = [
        "id",
        "date",
        "pause",
        "restart",
      ];

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

        storeJsonData(state).then((res) => {
          state = initialActivityState;
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
