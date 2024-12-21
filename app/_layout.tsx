import { View } from "react-native";
import { Slot } from "expo-router";

import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import { deleteJsonFile, getJsonData } from "../services/json.service";

export default function Layout() {
  const [ownerName, setOwnerName] = useState<string>("No name");

  useEffect(() => {
    getJsonData().then((data) => {
      setOwnerName(data.name.length ? data.name : ownerName);
    });

    // deleteJsonFile();
  }, []);

  return (
    <View>
      <Header ownerName={ownerName} setOwnerName={setOwnerName} />
      <Slot />
    </View>
  );
}
