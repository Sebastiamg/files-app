import { View } from "react-native";

import Form from "../components/Form";
import ActivityList from "../components/ActivityList";
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
