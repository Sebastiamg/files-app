import { Activity } from "../common/interfaces/data.interface";

export default function sortActivities(activities: Activity[]) {
  return activities.sort((a, b) => {
    const aStartHour = +a.start_hour.replace(":", "");
    const bStartHour = +b.start_hour.replace(":", "");
    if (aStartHour < bStartHour) {
      return -1;
    } else if (aStartHour > bStartHour) {
      return 1;
    }
    return -1;
  });
}
