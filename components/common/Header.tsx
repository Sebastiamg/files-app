import { View, Text } from "react-native";

import { styles } from "../../common/styles/styles";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.header__title}>Actividades de Producción</Text>
      <Text style={styles.header__owner}>Naty Jarrín</Text>
    </View>
  );
}
