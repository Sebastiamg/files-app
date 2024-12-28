import { useEffect, useReducer, useState } from "react";
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
import { ActivityContext } from "../components/contexts/ActivityContext";
import Icon from "react-native-vector-icons/Ionicons";
import {
  activitiesReducer,
  initialActivitiesState,
} from "../common/reducers/activities-reducer";
import { ActivitiesContext } from "../components/contexts/ActivitiesContext";

export default function Layout() {
  const [ownerName, setOwnerName] = useState<string>("No name");

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
      setOwnerName(data.name.length ? data.name : ownerName);
    });
  }, []);

  return (
    <ActivitiesContext.Provider value={[activitiesState, activitiesDispatch]}>
      <ActivityContext.Provider value={[activityState, activityDispatch]}>
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
      </ActivityContext.Provider>
    </ActivitiesContext.Provider>
  );
}
