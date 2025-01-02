import { useContext, useEffect } from "react";
import { View, Text, ScrollView, FlatList, Pressable } from "react-native";

import { getJsonData } from "../services/json.service";
import {
  ActivitiesStateContext,
  ActivitiesDispatchContext,
} from "./contexts/ActivitiesContext";
import { Activity } from "../common/interfaces/data.interface";
import { formatName } from "../utils/formatName";
import { listStyles } from "../common/styles/styles";
import RowItem from "./RowItem";
import sortActivities from "../utils/sortActivities";

export default function ActivityList() {
  const activitiesState = useContext(ActivitiesStateContext);
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  useEffect(() => {
    getJsonData().then(({ activities }) => {
      activitiesDispatch({
        type: "set-activities-from-db",
        payload: { activities },
      });
    });
  }, []);

  const activityKeys: (keyof Activity)[] = [
    "date",
    "details",
    "quantity",
    "start_hour",
    "pause",
    "restart",
    "end_hour",
  ];

  return (
    <ScrollView horizontal={true} style={listStyles.horizontalScroll}>
      {activitiesState.todayActivities && (
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
            // data={activitiesState.todayActivities}
            data={activitiesState.todayActivities}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <RowItem item={item} index={index} key={index} />
            )}
            ListEmptyComponent={
              <Text style={{ padding: 10, fontWeight: "bold" }}>
                No data to show
              </Text>
            }
          />
        </View>
      )}
    </ScrollView>
  );
}
