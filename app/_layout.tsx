import { View } from "react-native";
import { Slot } from "expo-router";

import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { deleteJsonFile, getJsonData } from "../services/json.service";
import { layoutStyles } from "../common/styles/styles";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";

export default function Layout() {
  const [ownerName, setOwnerName] = useState<string>("No name");

  useEffect(() => {
    getJsonData().then((data) => {
      setOwnerName(data.name.length ? data.name : ownerName);
    });

    // deleteJsonFile();
  }, []);

  return (
    <View style={layoutStyles.main__container}>
      <Header ownerName={ownerName} setOwnerName={setOwnerName} />
      <ScrollView style={layoutStyles.scroll__container}>
        <Slot />
      </ScrollView>
      <NavBar />
    </View>
  );
}
