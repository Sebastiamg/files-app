import { View, Text } from "react-native";

export default function tables() {
  return (
    <View>
      {Array.from({ length: 100 }).map((_, i) => {
        return <Text key={i}>----------------------------------- {i}</Text>;
      })}
    </View>
  );
}
