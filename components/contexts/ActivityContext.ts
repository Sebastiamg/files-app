import { createContext } from "react";

import {
  activityActions,
  initialActivityState,
} from "../../common/reducers/dailyActiviry-reducer";

export const ActivityStateContext =
  createContext<typeof initialActivityState>(initialActivityState);
export const ActivityDispatchContext = createContext<
  React.Dispatch<activityActions>
>(() => {});
