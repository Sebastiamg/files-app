import { useContext } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { listStyles } from "../common/styles/styles";
import { Activity } from "../common/interfaces/data.interface";
import Icon from "react-native-vector-icons/Ionicons";
import {
  deleteActivityFromJsonData,
  getJsonData,
} from "../services/json.service";
import { ActivitiesDispatchContext } from "./contexts/ActivitiesContext";

interface Props {
  item: Activity;
  index: number;
}

export default function RowItem({ item, index }: Props) {
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  function deleteActivity(activity: Activity) {
    Alert.alert("Are you sure?", "Delete Row", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deleteActivityFromJsonData(activity.date, activity.id);
          activitiesDispatch({
            type: "update-activities-after-removing",
            payload: { activityId: activity.id },
          });
        },
      },
    ]);
  }

  return (
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
      <Pressable onPress={() => deleteActivity(item)}>
        <Icon name="trash-bin-outline" size={30} />
      </Pressable>
    </View>
  );
}
