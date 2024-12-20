import { View, Text } from "react-native";
import { Slot } from "expo-router";

import Header from "../components/common/Header";
import { styles } from "../common/styles/styles";

export default function Layout() {
  return (
    <View>
      <Header />
      <Slot />
    </View>
  );
}
