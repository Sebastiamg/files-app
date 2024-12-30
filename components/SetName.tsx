import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { setNameStyles } from "../common/styles/styles";
import { setJsonName } from "../services/json.service";
import { formatName } from "../utils/formatName";
import { ShowToast } from "../utils/showToast";

interface Props {
  ownerName: string;
  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
}

export default function SetName({ setOwnerName, ownerName }: Props) {
  const [editableInput, setEditableInput] = useState(false);

  function defineOwnerAndDisableInput() {
    setJsonName(formatName(ownerName))
      .then((msj) => {
        ShowToast(msj as string, "success");
      })
      .catch((err) => ShowToast(err, "danger"));
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
    if (editableInput) {
      defineOwnerAndDisableInput();
    }
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
