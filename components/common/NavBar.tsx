import { usePathname, router } from "expo-router";
import { Pressable, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { navStyles } from "../../common/styles/styles";

export default function NavBar() {
  const pagePath = usePathname();

  function isPress(press: boolean, routeName: string) {
    return [
      navStyles.navBar__button,
      press ? navStyles.navBar__button__pressed : null,
      pagePath === "/" + routeName ? navStyles.navBar__screen__focused : null,
    ];
  }

  return (
    <View style={navStyles.navBar__container}>
      <Pressable
        style={({ pressed }) => isPress(pressed, "")}
        onPressIn={() => router.replace("/")}
      >
        <Icon
          style={navStyles.navBar__icon}
          name="extension-puzzle-outline"
          size={30}
          color="black"
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => isPress(pressed, "tables")}
        onPressIn={() => router.replace("/tables")}
      >
        <Icon
          style={navStyles.navBar__icon}
          name="list-outline"
          size={30}
          color="black"
        />
      </Pressable>
    </View>
  );
}
