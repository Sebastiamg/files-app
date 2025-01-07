import { Data } from "../common/interfaces/data.interface";

export function sortDates(dates: Data["activities"]) {
  const sortedDates = Object.entries(dates).sort((a, b) => {
    console.log(a);
    if (a[0] > b[0]) {
      return 1;
    } else if (b[0] > a[0]) {
      return -1;
    }

    return -1;
  });

  return Object.fromEntries(sortedDates);
}
