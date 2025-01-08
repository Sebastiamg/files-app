import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { formatLocaleDate } from "../utils/formatLocaleDate";
import { oldStyles } from "../common/styles/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Activity } from "../common/interfaces/data.interface";
import RowItem from "./RowItem";
import { sharePDF } from "../services/pdf.service";
import { htmlBaseES } from "../utils/htmlBaseES";
import { deleteDayFromJsonDate, getJsonName } from "../services/json.service";
import { ActivitiesDispatchContext } from "./contexts/ActivitiesContext";

interface Props {
  date: string;
  activities: Activity[];
}

export default function OldTableItem({ date, activities }: Props) {
  const [isShowingTable, setIsShowingTable] = useState(false);
  const activitiesDispatch = useContext(ActivitiesDispatchContext);

  function showTable() {
    setIsShowingTable(!isShowingTable);
  }

  async function downloadOldDate() {
    sharePDF(
      htmlBaseES(activities, await getJsonName()),
      `${date}_${(await getJsonName()) || "Anonymus"}_Daily_Report`,
    );
  }

  async function deleteOldDate() {
    Alert.alert("Are you sure?", "Delete Whole Day", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteDayFromJsonDate(date);
          activitiesDispatch({
            type: "update-activities-after-remove-day",
            payload: { dayDate: date },
          });
        },
      },
    ]);
  }

  return (
    <View>
      {/* desplegable */}
      <View style={[oldStyles.old__date__container]}>
        <Text style={[oldStyles.old__date__title]}>
          {formatLocaleDate(date)}
        </Text>
        <Pressable
          onPress={showTable}
          style={[
            oldStyles.old__date__expand,
            isShowingTable ? oldStyles.old__date__expand__expanded : null,
          ]}
        >
          <Icon
            name={isShowingTable ? "caret-up-outline" : "caret-down-outline"}
            size={30}
          />
        </Pressable>
      </View>
      {/* Tabla */}
      {isShowingTable && (
        <View>
          {/* buttons */}
          <View style={[oldStyles.old__date__buttons__container]}>
            <Pressable
              onPress={downloadOldDate}
              style={[
                oldStyles.old__date__buttons__icon,
                oldStyles.old__date__button__download,
              ]}
            >
              <Icon name="download-outline" size={30}></Icon>
            </Pressable>
            <Pressable
              onPress={deleteOldDate}
              style={[
                oldStyles.old__date__buttons__icon,
                oldStyles.old__date__button__delete,
              ]}
            >
              <Icon name="trash-outline" size={30}></Icon>
            </Pressable>
          </View>
          <ScrollView horizontal={true}>
            {/* list */}
            <FlatList
              data={activities}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <RowItem
                  item={item}
                  index={index}
                  key={item.id}
                  isARowEditing={false}
                  setIsThisRowEditign={() => {}}
                  hiddeDate
                />
              )}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}
