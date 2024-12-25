import { formatDateAndTime } from "../../utils/formatDateTime";
import { Activity } from "../interfaces/data.interface";

export type activityActions =
  | {
      type: "add-date";
      payload: { date: string };
    }
  | { type: "add-any"; payload: { key: keyof Activity; value: string } }
  | { type: "reset-data" }
  | { type: "log-state" };

type initialState = Activity;

export const initialActivityState: initialState = {
  id: "",
  date: formatDateAndTime(new Date().toISOString(), "date"),
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

      return state;

    default:
      return state;
  }
};
