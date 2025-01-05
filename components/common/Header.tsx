import { View, Text, Pressable } from "react-native";

import { headerStyles } from "../../common/styles/styles";
import SetName from "../SetName";
import { downloadJsonFile } from "../../services/json.service";

interface Props {
  ownerName: string;
  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
}

function donwnloadData() {
  downloadJsonFile();
}

export default function Header({ ownerName, setOwnerName }: Props) {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.header__title}>Production Activities</Text>
      <View style={headerStyles.header__names__container}>
        <Text style={headerStyles.header__owner}>{ownerName}</Text>
        <Pressable
          onLongPress={donwnloadData}
          style={headerStyles.header__developer}
        >
          <Text style={headerStyles.header__developer__title}>Beta</Text>
        </Pressable>
      </View>
      <SetName setOwnerName={setOwnerName} ownerName={ownerName} />
    </View>
  );
}
