import { formatDateAndTime } from "../../utils/formatDateTime";
import { Activity, Data } from "../interfaces/data.interface";

export type activitiesActions =
  | { type: "log-today-activities" }
  | {
      type: "set-activities-from-db";
      payload: { activities: Data["activities"] };
    }
  | {
      type: "get-today-activities";
    };

type initialState = {
  activities: Data["activities"];
  todayActivities: Activity[];
};

export const initialActivitiesState: initialState = {
  activities: {},
  todayActivities: [],
};

export const activitiesReducer = (
  state = initialActivitiesState,
  action: activitiesActions,
) => {
  const TODAY_DATE = formatDateAndTime(
    new Date(new Date().toDateString()),
    "date",
  );

  switch (action.type) {
    case "set-activities-from-db":
      return {
        activities: { ...action.payload.activities },
        todayActivities: action.payload.activities[TODAY_DATE],
      };
    case "log-today-activities":
      return {
        ...state,
      };

    case "get-today-activities":
      const TODAY_ACTIVITIES = state.activities[TODAY_DATE];
      return {
        ...state,
        todayActivities: TODAY_ACTIVITIES,
      };

    default:
      return {
        ...state,
      };
  }
};
