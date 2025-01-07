import { useState } from "react";
import { View, Pressable, TextInput, Text } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { listStyles } from "../common/styles/styles";
import { Activity } from "../common/interfaces/data.interface";
import { formatDateAndTime } from "../utils/formatDateTime";
import { formatNumber } from "../utils/formatNumbres";

interface Props {
  rowContentValue: keyof Activity;
  editableInput: boolean;
  setActivityEditing: React.Dispatch<React.SetStateAction<Activity>>;
  value: string | undefined;
  rowType?: "text" | "number" | "time";
  isTime?: boolean;
}

export default function RowCell({
  rowContentValue,
  rowType = "text",
  isTime = false,
  editableInput,
  setActivityEditing,
  value,
}: Props) {
  const [isShowingPicker, setIsShowingPicker] = useState(false);

  const handleInputPress = () => {
    if (editableInput && isTime && !isShowingPicker) {
      setIsShowingPicker(true);
    }
  };

  const handleChange = (text: string | DateTimePickerEvent) => {
    if (typeof text === "string") {
      setActivityEditing((currentValue) => ({
        ...currentValue,
        [rowContentValue as keyof Activity]:
          rowContentValue === "quantity" ? formatNumber(text) : text,
      }));
    } else {
      setActivityEditing((currentValue) => ({
        ...currentValue,
        [rowContentValue as keyof Activity]: formatDateAndTime(
          new Date(text.nativeEvent.timestamp),
          "time",
        ),
      }));
      setIsShowingPicker(false);
    }
  };

  return (
    <Pressable>
      <View>
        {!isTime ? (
          <TextInput
            style={[
              listStyles.cell,
              listStyles.cellText,
              listStyles.cellDetails,
              listStyles[
                `list__item__${rowContentValue}` as keyof typeof listStyles
              ],
            ]}
            editable={editableInput}
            multiline
            keyboardType={rowType === "number" ? "numeric" : "url"}
            onChangeText={(text) => handleChange(text)}
          >
            {value || "-"}
          </TextInput>
        ) : (
          <Text
            style={[
              listStyles.cell,
              listStyles.cellText,
              listStyles.cellDetails,
              listStyles[
                `list__item__${rowContentValue}` as keyof typeof listStyles
              ],
            ]}
            onPress={handleInputPress}
            children={value || "-"}
          />
        )}
      </View>
      <View>
        {isTime && isShowingPicker && (
          <DateTimePicker
            testID="lsdafñlk"
            value={new Date()}
            is24Hour
            mode="time"
            onChange={(e, x) => handleChange(e)}
            maximumDate={new Date()}
          />
        )}
      </View>
    </Pressable>
  );
}
