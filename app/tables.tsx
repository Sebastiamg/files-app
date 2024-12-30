import { View, Text, ScrollView } from "react-native";
import ActivityList from "../components/ActivityList";
import CreateTodayPdf from "../components/CreateTodayPdf";

export default function Tables() {
  return (
    <ScrollView>
      <CreateTodayPdf />
      <ActivityList />
    </ScrollView>
  );
}
