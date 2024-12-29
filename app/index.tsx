import { View } from "react-native";

import ActivityList from "../components/ActivityList";
import Form from "../components/Form";
import CreatePdf from "../components/CreatePdf";

export default function Index() {
  return (
    <View>
      <Form />
      <CreatePdf />
      <ActivityList />
    </View>
  );
}
