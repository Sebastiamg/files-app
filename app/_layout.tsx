import { useEffect, useMemo, useReducer, useState } from "react";
import { View, ScrollView } from "react-native";
import { Slot } from "expo-router";

import { ToastProvider } from "react-native-toast-notifications";

import { getJsonData } from "../services/json.service";
import { layoutStyles } from "../common/styles/styles";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import {
  activityReducer,
  initialActivityState,
} from "../common/reducers/dailyActiviry-reducer";
import {
  ActivityDispatchContext,
  ActivityStateContext,
} from "../components/contexts/ActivityContext";
import Icon from "react-native-vector-icons/Ionicons";
import {
  activitiesReducer,
  initialActivitiesState,
} from "../common/reducers/activities-reducer";
import {
  ActivitiesDispatchContext,
  ActivitiesStateContext,
} from "../components/contexts/ActivitiesContext";

export default function Layout() {
  const [ownerName, setOwnerName] = useState<string>("");

  const [activityState, activityDispatch] = useReducer(
    activityReducer,
    initialActivityState,
  );
  const [activitiesState, activitiesDispatch] = useReducer(
    activitiesReducer,
    initialActivitiesState,
  );

  useEffect(() => {
    getJsonData().then((data) => {
      console.log("caca: ", data);
      setOwnerName(data.name.length ? data.name : ownerName);
    });
  }, []);

  return (
    <ActivitiesStateContext.Provider value={activitiesState}>
      <ActivitiesDispatchContext.Provider value={activitiesDispatch}>
        <ActivityStateContext.Provider value={activityState}>
          <ActivityDispatchContext.Provider value={activityDispatch}>
            <View style={layoutStyles.main__container}>
              <ToastProvider
                dangerIcon={
                  <Icon name="close-circle-outline" size={25} color="black" />
                }
                successIcon={
                  <Icon name="checkmark-outline" size={25} color="black" />
                }
              >
                <Header ownerName={ownerName} setOwnerName={setOwnerName} />
                <ScrollView style={layoutStyles.scroll__container}>
                  <Slot />
                </ScrollView>
                <NavBar />
              </ToastProvider>
            </View>
          </ActivityDispatchContext.Provider>
        </ActivityStateContext.Provider>
      </ActivitiesDispatchContext.Provider>
    </ActivitiesStateContext.Provider>
  );
}
