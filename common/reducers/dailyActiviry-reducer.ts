import { getJsonData, storeJsonData } from "../../services/json.service";
import { formatDateAndTime } from "../../utils/formatDateTime";
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
      return {
        ...state,
        [action.payload.key]: action.payload.value,
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
      storeJsonData(state).then((res) => {
        console.log(res);
      });

      return state;

    default:
      return state;
  }
};
