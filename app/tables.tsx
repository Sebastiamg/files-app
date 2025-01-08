import { ScrollView } from "react-native";
import ActivityList from "../components/ActivityList";
import CreateTodayPdf from "../components/CreateTodayPdf";
import OldTables from "../components/OldTables";
import FromUntilDownloader from "../components/FromUntilDownloader";

export default function Tables() {
  return (
    <ScrollView>
      <CreateTodayPdf />
      <ActivityList />
      <FromUntilDownloader />
      <OldTables />
    </ScrollView>
  );
}
