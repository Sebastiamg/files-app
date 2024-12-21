import { View, Text } from "react-native";

import { headerStyles } from "../../common/styles/styles";
import SetName from "../SetName";

interface Props {
  ownerName: string;
  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({ ownerName, setOwnerName }: Props) {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.header__title}>Actividades de Producción</Text>
      <View style={headerStyles.header__names__container}>
        <Text style={headerStyles.header__owner}>{ownerName}</Text>
        <Text style={headerStyles.header__developer}>Michael Ortiz</Text>
      </View>
      <SetName setOwnerName={setOwnerName} ownerName={ownerName} />
    </View>
  );
}
