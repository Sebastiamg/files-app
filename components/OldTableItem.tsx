import React, { useState } from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import { formatLocaleDate } from "../utils/formatLocaleDate";
import { oldStyles } from "../common/styles/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Activity } from "../common/interfaces/data.interface";
import RowItem from "./RowItem";
import { sharePDF } from "../services/pdf.service";
import { htmlBaseES } from "../utils/htmlBaseES";
import { getJsonName } from "../services/json.service";

interface Props {
  date: string;
  activities: Activity[];
}

export default function OldTableItem({ date, activities }: Props) {
  const [isShowingTable, setIsShowingTable] = useState(false);

  function showTable() {
    setIsShowingTable(!isShowingTable);
  }

  async function downloadOldDate() {
    sharePDF(
      htmlBaseES(activities, await getJsonName()),
      `${date}_${(await getJsonName()) || "Anonymus"}_Daily_Report`,
    );
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
              style={[oldStyles.old__date__buttons__icon]}
            >
              <Icon name="download-outline" size={30}></Icon>
              {/* <Text>Download</Text> */}
            </Pressable>
            {/* <Pressable
              onPress={downloadOldDate}
              style={[oldStyles.old__date__buttons__icon]}
            >
              <Icon name="trash-outline" size={30}></Icon>
            </Pressable> */}
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
