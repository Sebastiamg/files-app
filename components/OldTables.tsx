import { View, Text } from "react-native";

import { oldStyles } from "../common/styles/styles";
import { useContext } from "react";
import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { sortDates } from "../utils/sortDates";
import OldTableItem from "./OldTableItem";
import { formatDateAndTime } from "../utils/formatDateTime";

export default function OldTables() {
  const activitiesState = useContext(ActivitiesStateContext);

  const isTodayDate = () => {
    const isTodayDameLastDate = Object.keys(
      sortDates(activitiesState.activities),
    ).pop();
    return formatDateAndTime(new Date(), "date") === isTodayDameLastDate;
  };
  isTodayDate();

  return (
    <View style={[oldStyles.old__date__main__container]}>
      {/* list */}
      {Object.entries(sortDates(activitiesState.activities)).length > 1 && (
        <Text style={[oldStyles.old__date__main__title]}>List of Days</Text>
      )}
      {Object.entries(sortDates(activitiesState.activities))
        .reverse()
        .slice(isTodayDate() ? 1 : 0)
        .map(([date, activities]) => (
          <OldTableItem key={date} date={date} activities={activities} />
        ))}
      {/* sorter */}
    </View>
  );
}
