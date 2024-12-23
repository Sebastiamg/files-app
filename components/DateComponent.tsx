import { View, Text, Pressable } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

import { formStyles } from "../common/styles/styles";
import { dateTime, useDateAndTime } from "../common/hooks/useDateAndTime";
import { formatName } from "../utils/formatName";
import { activityActions } from "../common/reducers/dailyActiviry-reducer";
import { Activity } from "../common/interfaces/data.interface";

interface Props {
  componentType: dateTime;
  componentTitle: keyof Activity;
  dispatch: React.Dispatch<activityActions>;
}

export default function DateComponent({
  componentType,
  componentTitle,
  dispatch,
}: Props) {
  const {
    dateOrTime,
    showDateModal,
    showDatePicker,
    changeDateOrTime,
    dataTypeRef,
    dateOrTimeFormated,
    iconRef,
  } = useDateAndTime({ componentType, componentTitle }, dispatch);

  return (
    <View>
      <View style={[formStyles.form__date__container]}>
        <Text style={[formStyles.form__date__title]}>
          {formatName(componentTitle)}:
        </Text>
        <Text
          style={[formStyles.form__date__input]}
          children={dateOrTimeFormated}
        />
        <Pressable
          style={[formStyles.form__date__icon]}
          onPress={showDateModal}
        >
          <Icon
            name={iconRef}
            size={30}
            color="black"
            style={formStyles.form__date__icon2}
          />
        </Pressable>
      </View>

      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={dateOrTime}
          mode={dataTypeRef}
          is24Hour={true}
          onChange={(e, date) => changeDateOrTime(e, date!)}
        />
      )}
    </View>
  );
}
