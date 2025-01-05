import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { sharePDF } from "../services/pdf.service";

import { formStyles } from "../common/styles/styles";
import { getJsonName } from "../services/json.service";
import { htmlBaseES } from "../utils/htmlBaseES";

export default function CreateTodayPdf() {
  const { todayActivities } = useContext(ActivitiesStateContext);

  const printToFile = async () => {
    if (todayActivities) {
      await sharePDF(htmlBaseES(todayActivities, await getJsonName()));
    }
  };

  return (
    <View>
      {todayActivities ? (
        <Pressable
          onPress={printToFile}
          style={[formStyles.form__save__data__container]}
        >
          <Text style={[formStyles.form__save__data__title]}>
            Download Daily Report
          </Text>
        </Pressable>
      ) : (
        <Text style={[formStyles.form__save__data__title]}>
          No data to share
        </Text>
      )}
    </View>
  );
}
