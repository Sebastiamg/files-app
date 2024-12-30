import { useRef, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { activityActions } from "../common/reducers/dailyActiviry-reducer";
import { Activity } from "../common/interfaces/data.interface";
import { formStyles, inputStyles } from "../common/styles/styles";
import { formatName } from "../utils/formatName";
import { formatNumber } from "../utils/formatNumbres";

interface Props {
  componentTitle: keyof Activity;
  activityDispatch: React.Dispatch<activityActions>;
  initialState: string;
}

export default function InputComponent({
  componentTitle,
  activityDispatch,
  initialState,
}: Props) {
  const [value, setValue] = useState<string>(initialState);

  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    setValue(formatNumber(text));
    activityDispatch({
      type: "add-any",
      payload: { key: componentTitle, value: formatNumber(text) },
    });
  };

  const handleIconPress = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const setInputValue = () => {
    activityDispatch({
      type: "add-any",
      payload: { key: componentTitle, value: formatNumber(value) },
    });
  };

  return (
    <View style={[formStyles.form__date__container]}>
      <Text style={[formStyles.form__date__title]}>
        {formatName(componentTitle)}:
      </Text>
      <TextInput
        keyboardType="numeric"
        style={[inputStyles.input__component]}
        value={initialState}
        onChangeText={(e) => handleChange(e)}
        ref={inputRef}
        onEndEditing={setInputValue}
      />
      <Pressable
        style={[formStyles.form__date__icon]}
        onPress={handleIconPress}
      >
        <Icon
          name="calculator-outline"
          size={30}
          color="black"
          style={formStyles.form__date__icon2}
        />
      </Pressable>
    </View>
  );
}
