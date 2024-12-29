import { createContext } from "react";

import {
  activitiesActions,
  initialActivitiesState,
} from "../../common/reducers/activities-reducer";

export const ActivitiesStateContext = createContext<
  typeof initialActivitiesState
>(initialActivitiesState);
export const ActivitiesDispatchContext = createContext<
  React.Dispatch<activitiesActions>
>(() => {});
