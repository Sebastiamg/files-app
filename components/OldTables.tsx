import { View, Text } from "react-native";

import { oldStyles } from "../common/styles/styles";
import { useContext } from "react";
import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { sortDates } from "../utils/sortDates";
import OldTableItem from "./OldTableItem";

export default function OldTables() {
  const activitiesState = useContext(ActivitiesStateContext);

  return (
    <View style={[oldStyles.old__date__main__container]}>
      {/* list */}
      {Object.entries(sortDates(activitiesState.activities)).length > 1 && (
        <Text style={[oldStyles.old__date__main__title]}>List of Days</Text>
      )}
      {Object.entries(sortDates(activitiesState.activities))
        .reverse()
        .slice(1)
        .map(([date, activities]) => (
          <OldTableItem key={date} date={date} activities={activities} />
        ))}
      {/* sorter */}
    </View>
  );
}
