import { useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  FlatList,
} from "react-native";

import { getJsonData } from "../services/json.service";
import { ActivitiesContext } from "./contexts/ActivitiesContext";
import Icon from "react-native-vector-icons/Ionicons";
import { Activity } from "../common/interfaces/data.interface";
import { formatName } from "../utils/formatName";
import { SafeAreaView } from "react-native-safe-area-context";
import { listStyles } from "../common/styles/styles";

export default function ActivityList() {
  const [state, dispatch] = useContext(ActivitiesContext);

  useEffect(() => {
    getJsonData().then(({ activities }) => {
      dispatch({ type: "set-activities-from-db", payload: { activities } });
    });
  }, [state]);

  const activityKeys: (keyof Activity)[] = [
    "date",
    "details",
    "quantity",
    "start_hour",
    "pause",
    "restart",
    "end_hour",
  ];

  const renderRow = ({ item, index }: { item: Activity; index: number }) => (
    <View style={[listStyles.row, !(index % 2) ? listStyles.zebraRow : null]}>
      <Text
        style={[listStyles.cell, listStyles.cellText, listStyles.list__item0]}
      >
        {item.date || "no date"}
      </Text>
      <Text
        style={[
          listStyles.cell,
          listStyles.cellText,
          listStyles.cellDetails,
          listStyles.list__item1,
        ]}
      >
        {item.details || "No details"}
      </Text>
      <Text
        style={[listStyles.cell, listStyles.cellText, listStyles.list__item2]}
      >
        {item.quantity || "-"}
      </Text>
      <Text
        style={[listStyles.cell, listStyles.cellText, listStyles.list__item3]}
      >
        {item.start_hour || "00:00"}
      </Text>
      <Text
        style={[listStyles.cell, listStyles.cellText, listStyles.list__item4]}
      >
        {item.pause || "-"}
      </Text>
      <Text
        style={[listStyles.cell, listStyles.cellText, listStyles.list__item5]}
      >
        {item.restart || "-"}
      </Text>
      <Text
        style={[listStyles.cell, listStyles.cellText, listStyles.list__item6]}
      >
        {item.end_hour || "00:00"}
      </Text>
    </View>
  );

  return (
    <ScrollView horizontal={true} style={listStyles.horizontalScroll}>
      {state.todayActivities && (
        <View>
          <Text style={listStyles.title}>Today Activities</Text>
          {/* Encabezado de la tabla */}
          <View style={listStyles.header}>
            {activityKeys.map((key, i) => (
              <Text
                key={i}
                style={[
                  listStyles.headerCell,
                  listStyles.headerText,
                  listStyles[`list__item${i}` as keyof typeof listStyles],
                ]}
              >
                {formatName(key)}
              </Text>
            ))}
          </View>

          {/* Cuerpo de la tabla */}
          <FlatList
            data={state.todayActivities}
            keyExtractor={(item) => item.id}
            renderItem={renderRow}
          />
        </View>
      )}
    </ScrollView>
  );
}
