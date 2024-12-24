import { dateTime } from "../common/hooks/useDateAndTime";

export function formatDateAndTime(
  value: Date,
  type: dateTime,
  lowercase = false,
) {
  if (lowercase) return value.toString().toLowerCase();

  if (type === "date") {
    return value.toISOString().split("T")[0].split("-").reverse().join("/");
  } else {
    return `${value.getHours()}:${value.getMinutes().toString().length === 1 ? "0" + value.getMinutes() : value.getMinutes()}`;
  }
}
