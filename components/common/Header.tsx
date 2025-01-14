import { View, Text, Pressable } from "react-native";

import { headerStyles } from "../../common/styles/styles";
import SetName from "../SetName";
import { downloadJsonFile, uploadJsonFile } from "../../services/json.service";

interface Props {
  ownerName: string;
  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
}

function donwnloadData() {
  downloadJsonFile();
}

function uploadData() {
  uploadJsonFile();
}

export default function Header({ ownerName, setOwnerName }: Props) {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.header__title}>Production Activities</Text>
      <View style={headerStyles.header__names__container}>
        <Pressable onLongPress={uploadData} style={headerStyles.header__owner}>
          <Text style={headerStyles.header__owner__title}>{ownerName}</Text>
        </Pressable>
        <Pressable
          onLongPress={donwnloadData}
          style={headerStyles.header__developer}
        >
          <Text style={headerStyles.header__developer__title}>1.0</Text>
        </Pressable>
      </View>
      <SetName setOwnerName={setOwnerName} ownerName={ownerName} />
    </View>
  );
}
