import { View, Text, TextInput, Pressable } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { setNameStyles } from "../common/styles/styles";
import { useState } from "react";
import { setJsonName } from "../services/json.service";
import { formatName } from "../utils/formatName";

interface Props {
  ownerName: string;
  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
}

export default function SetName({ setOwnerName, ownerName }: Props) {
  const [editableInput, setEditableInput] = useState(false);

  function defineOwnerAndDisableInput() {
    setJsonName(formatName(ownerName)).then((data) => console.log(data));
    setEditableInput(false);
  }

  function handlePress() {
    if (editableInput === false) {
      setEditableInput(true);
    } else {
      defineOwnerAndDisableInput();
    }
  }

  function handleChange(text: string) {
    setOwnerName(formatName(text));
  }

  function handleEndEditing() {
    defineOwnerAndDisableInput();
  }

  return (
    <View style={setNameStyles.setName}>
      <Text style={setNameStyles.setName__text}>Enter your name</Text>
      <View style={setNameStyles.setName__input__container}>
        <TextInput
          style={
            editableInput
              ? setNameStyles.setName__input
              : setNameStyles.setName__input__disabled
          }
          placeholder="Name"
          value={ownerName}
          editable={editableInput}
          onChangeText={(text) => handleChange(text)}
          onEndEditing={handleEndEditing}
        />
        <Pressable onPress={handlePress} style={setNameStyles.setName__icon}>
          <Icon
            name={editableInput ? "checkmark-outline" : "create-outline"}
            size={30}
            color="black"
            style={setNameStyles.setName__icon2}
          />
        </Pressable>
      </View>
    </View>
  );
}
