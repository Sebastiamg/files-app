import { createContext } from "react";
import { Activity } from "../../common/interfaces/data.interface";
import {
  activityActions,
  initialActivityState,
} from "../../common/reducers/dailyActiviry-reducer";

export const ActivityContext = createContext<Activity>(initialActivityState);
export const DispatchActivityContext =
  createContext<React.Dispatch<activityActions> | null>(null);
