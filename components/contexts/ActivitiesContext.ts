import { createContext } from "react";

import {
  activitiesActions,
  initialActivitiesState,
} from "../../common/reducers/activities-reducer";

export const ActivitiesContext = createContext<
  [typeof initialActivitiesState, React.Dispatch<activitiesActions>]
>([initialActivitiesState, () => {}]);
