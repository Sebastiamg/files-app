import { View, Text, Pressable } from "react-native";
import * as Localozation from "expo-localization";

import Icon from "react-native-vector-icons/Ionicons";
import { oldStyles } from "../common/styles/styles";
import { formatLocaleDate } from "../utils/formatLocaleDate";
import { useContext } from "react";
import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { sortDates } from "../utils/sortDates";

export default function OldTables() {
  const activitiesState = useContext(ActivitiesStateContext);

  sortDates(activitiesState.activities);

  return (
    <View>
      <Text style={[oldStyles.old__date__main__title]}>List of Days</Text>
      {Object.entries(sortDates(activitiesState.activities))
        .reverse()
        .map(([date, activitie]) => (
          <View style={[oldStyles.old__date__container]} key={date}>
            <Text style={[oldStyles.old__date__title]}>
              {formatLocaleDate(date)}
            </Text>
            <Pressable style={[oldStyles.old__date__expand]}>
              <Icon name="caret-down-outline" size={30} />
            </Pressable>
          </View>
        ))}
    </View>
  );
}
