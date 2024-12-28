import { useEffect, useReducer, useState } from "react";
import { View, ScrollView } from "react-native";
import { Slot } from "expo-router";

import { ToastProvider } from "react-native-toast-notifications";

import { deleteJsonFile, getJsonData } from "../services/json.service";
import { layoutStyles } from "../common/styles/styles";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";
import {
  activityReducer,
  initialActivityState,
} from "../common/reducers/dailyActiviry-reducer";
import {
  ActivityContext,
  DispatchActivityContext,
} from "../components/contexts/ActivityContext";
import Icon from "react-native-vector-icons/Ionicons";
import {
  activitiesReducer,
  initialActivitiesState,
} from "../common/reducers/activities-reducer";
import { ActivitiesContext } from "../components/contexts/ActivitiesContext";

export default function Layout() {
  const [ownerName, setOwnerName] = useState<string>("No name");

  const [state, dispatch] = useReducer(activityReducer, initialActivityState);
  const [activitiesState, activitiesDispatch] = useReducer(
    activitiesReducer,
    initialActivitiesState,
  );

  useEffect(() => {
    getJsonData().then((data) => {
      setOwnerName(data.name.length ? data.name : ownerName);
    });

    // deleteJsonFile();
  }, []);

  return (
    <ActivitiesContext.Provider value={[activitiesState, activitiesDispatch]}>
      <ActivityContext.Provider value={state}>
        <DispatchActivityContext.Provider value={dispatch}>
          <View style={layoutStyles.main__container}>
            <Header ownerName={ownerName} setOwnerName={setOwnerName} />
            <ScrollView style={layoutStyles.scroll__container}>
              <ToastProvider
                dangerIcon={
                  <Icon name="close-circle-outline" size={25} color="black" />
                }
                successIcon={
                  <Icon name="checkmark-outline" size={25} color="black" />
                }
              >
                <Slot />
              </ToastProvider>
            </ScrollView>
            <NavBar />
          </View>
        </DispatchActivityContext.Provider>
      </ActivityContext.Provider>
    </ActivitiesContext.Provider>
  );
}
