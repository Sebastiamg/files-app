import { ScrollView } from "react-native";
import ActivityList from "../components/ActivityList";
import CreateTodayPdf from "../components/CreateTodayPdf";
import OldTables from "../components/OldTables";

export default function Tables() {
  return (
    <ScrollView>
      <CreateTodayPdf />
      <ActivityList />
      <OldTables />
    </ScrollView>
  );
}
