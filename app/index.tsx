import { View, Text } from "react-native";

export default function Index() {
  return (
    <View>
      {Array.from({ length: 100 }).map((_, i) => {
        return <Text key={i}>maricas maricón {i}</Text>;
      })}
    </View>
  );
}
