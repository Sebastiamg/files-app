import { View } from "react-native";
import { Slot } from "expo-router";

import { useContext, useEffect, useReducer, useState } from "react";
import { ScrollView } from "react-native";

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

export default function Layout() {
  const [ownerName, setOwnerName] = useState<string>("No name");

  const [state, dispatch] = useReducer(activityReducer, initialActivityState);

  useEffect(() => {
    getJsonData().then((data) => {
      setOwnerName(data.name.length ? data.name : ownerName);
    });

    // deleteJsonFile();
  }, []);

  return (
    <ActivityContext.Provider value={state}>
      <DispatchActivityContext.Provider value={dispatch}>
        <View style={layoutStyles.main__container}>
          <Header ownerName={ownerName} setOwnerName={setOwnerName} />
          <ScrollView style={layoutStyles.scroll__container}>
            <Slot />
          </ScrollView>
          <NavBar />
        </View>
      </DispatchActivityContext.Provider>
    </ActivityContext.Provider>
  );
}
