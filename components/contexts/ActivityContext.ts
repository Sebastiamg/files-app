import { createContext } from "react";

import {
  activityActions,
  initialActivityState,
} from "../../common/reducers/dailyActiviry-reducer";

export const ActivityContext = createContext<
  [typeof initialActivityState, React.Dispatch<activityActions>]
>([initialActivityState, () => {}]);
