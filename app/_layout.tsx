import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <View>
      <Text>Hola puta e sto es el supuesto header</Text>
      <Slot />
    </View>
  );
}
