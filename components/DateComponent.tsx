import { View, Text, Pressable, PointerEvent } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

import { formStyles } from "../common/styles/styles";
import { dateTime, useDateAndTime } from "../common/hooks/useDateAndTime";
import { formatName } from "../utils/formatName";
import { Activity } from "../common/interfaces/data.interface";
import { useEffect } from "react";

interface Props {
  componentType: dateTime;
  componentTitle: keyof Activity;
}

export default function DateComponent({
  componentType,
  componentTitle,
}: Props) {
  const {
    dateOrTime,
    showDateModal,
    showDatePicker,
    changeDateOrTime,
    dataTypeRef,
    iconRef,
  } = useDateAndTime({ componentType, componentTitle });

  return (
    <View style={[formStyles.form__date__container]}>
      <Text style={[formStyles.form__date__title]}>
        {formatName(componentTitle)}:
      </Text>
      <Text style={[formStyles.form__date__input]} children={dateOrTime} />
      <Pressable style={[formStyles.form__date__icon]} onPress={showDateModal}>
        <Icon
          name={iconRef}
          size={30}
          color="black"
          style={formStyles.form__date__icon2}
        />
      </Pressable>
      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date(new Date().toString())}
          mode={dataTypeRef}
          is24Hour={true}
          onChange={(e, date) => changeDateOrTime(e, date as Date)}
        />
      )}
    </View>
  );
}
