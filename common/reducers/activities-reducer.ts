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
    }
  | {
      type: "update-today-activities";
      payload: { activity: Activity };
    }
  | {
      type: "update-activities-after-removing";
      payload: { activityId: string };
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
  let updatedActivities;
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

    case "update-today-activities":
      updatedActivities = [...state.todayActivities, action.payload.activity];
      return {
        ...state,
        todayActivities: updatedActivities,
      };

    case "update-activities-after-removing":
      updatedActivities = state.todayActivities.filter((activity) => {
        return activity.id !== action.payload.activityId;
      });
      return {
        ...state,
        todayActivities: updatedActivities,
      };

    default:
      return {
        ...state,
      };
  }
};
