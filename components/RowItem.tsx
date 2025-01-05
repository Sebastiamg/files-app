import { useContext, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { listStyles } from "../common/styles/styles";
import { Activity } from "../common/interfaces/data.interface";
import {
  deleteActivityFromJsonData,
  editActivityFromJsonData,
} from "../services/json.service";
import { ActivitiesDispatchContext } from "./contexts/ActivitiesContext";
import RowCell from "./RowCell";

interface Props {
  item: Activity;
  index: number;
  isARowEditing: boolean;
  setIsThisRowEditign: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RowItem({
  item,
  index,
  isARowEditing,
  setIsThisRowEditign,
}: Props) {
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  const [editableInputs, setEditableInputs] = useState(false);
  const [activityEditing, setActivityEditing] = useState<Activity>(item);

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

  const handleEdit = () => {
    if (editableInputs) {
      setEditableInputs(false);
      setIsThisRowEditign(false);
      Alert.alert("Are you sure?", "Edit Activity", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: async () => {
            await editActivityFromJsonData(activityEditing);
            activitiesDispatch({
              type: "update-activities-after-updating",
              payload: { activity: activityEditing },
            });
          },
        },
      ]);
    } else {
      if (isARowEditing) return;
      setEditableInputs(true);
      setIsThisRowEditign(true);
    }
  };

  return (
    <View
      style={[
        listStyles.row,
        !(index % 2) ? listStyles.zebraRow : null,
        editableInputs ? listStyles.isEditignRow : null,
      ]}
    >
      <Text
        style={[
          listStyles.cell,
          listStyles.cellText,
          listStyles.list__item__date,
        ]}
      >
        {item.date || "no date"}
      </Text>

      {/* TABLE DETAILS */}
      <RowCell
        editableInput={editableInputs}
        value={activityEditing.details}
        rowContentValue="details"
        setActivityEditing={setActivityEditing}
      />

      {/* TABLE QUANTITY */}
      <RowCell
        editableInput={editableInputs}
        value={activityEditing.quantity}
        rowContentValue="quantity"
        rowType="number"
        setActivityEditing={setActivityEditing}
      />

      {/* TABLE START HOUR */}
      <RowCell
        editableInput={editableInputs}
        value={activityEditing.start_hour}
        rowContentValue="start_hour"
        isTime
        setActivityEditing={setActivityEditing}
      />

      {/* TABLE PAUSE */}
      <RowCell
        editableInput={editableInputs}
        value={activityEditing.pause}
        rowContentValue="pause"
        isTime
        setActivityEditing={setActivityEditing}
      />

      {/* TABLE RESTART */}
      <RowCell
        editableInput={editableInputs}
        value={activityEditing.restart}
        rowContentValue="restart"
        isTime
        setActivityEditing={setActivityEditing}
      />

      {/* TABLE END HOUR */}
      <RowCell
        editableInput={editableInputs}
        value={activityEditing.end_hour}
        rowContentValue="end_hour"
        isTime
        setActivityEditing={setActivityEditing}
      />

      <Pressable
        onPress={handleEdit}
        style={[listStyles.cell__icon, listStyles.list__item__edit_cell]}
      >
        <Icon
          name={editableInputs ? "checkmark-sharp" : "pencil-outline"}
          size={30}
          color="#0b3263"
        />
      </Pressable>
      <Pressable
        onPress={() => deleteActivity(item)}
        style={[listStyles.cell__icon, listStyles.list__item__delete_cell]}
      >
        <Icon name="close" size={30} color="#6b1918" />
      </Pressable>
    </View>
  );
}
