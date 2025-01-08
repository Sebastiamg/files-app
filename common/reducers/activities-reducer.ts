import { formatDateAndTime } from "../../utils/formatDateTime";
import sortActivities from "../../utils/sortActivities";
import { sortDates } from "../../utils/sortDates";
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
      type: "update-today-activities-after-removing";
      payload: { activityId: string; activityDate?: string };
    }
  | {
      type: "update-today-activities-after-updating";
      payload: { activity: Activity };
    }
  | {
      type: "update-activities-after-remove-day";
      payload: { dayDate: string };
    }
  | {
      type: "update-old-activity-after-removing";
      payload: { activityId: string; activityDate: string };
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
  let updatedTodayActivities, updatedActivities, updatedOldActivity;
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
      updatedTodayActivities = [
        ...state.todayActivities,
        action.payload.activity,
      ];
      return {
        ...state,
        todayActivities: updatedTodayActivities,
      };

    case "update-today-activities-after-removing":
      updatedTodayActivities = state.todayActivities.filter((activity) => {
        return activity.id !== action.payload.activityId;
      });
      return {
        ...state,
        todayActivities: updatedTodayActivities,
      };

    case "update-today-activities-after-updating":
      const activityToUpdateIndex = state.todayActivities.findIndex(
        (item) => item.id === action.payload.activity.id,
      );
      state.todayActivities[activityToUpdateIndex] = action.payload.activity;
      return {
        ...state,
        todayActivities: sortActivities([...state.todayActivities]),
      };

    case "update-activities-after-remove-day":
      updatedActivities = state.activities;
      delete updatedActivities[action.payload.dayDate];

      return {
        ...state,
        activities: updatedActivities,
      };

    case "update-old-activity-after-removing":
      const updatedOldActivity = state.activities[
        action.payload.activityDate
      ].filter((activity) => {
        return activity.id !== action.payload.activityId;
      });

      return {
        ...state,
        activities: sortDates({
          ...state.activities,
          [action.payload.activityDate]: sortActivities(updatedOldActivity),
        }),
      };

    default:
      return {
        ...state,
      };
  }
};
