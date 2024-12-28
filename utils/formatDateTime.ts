import { dateTime } from "../common/hooks/useDateAndTime";

export function formatDateAndTime(
  value: string | Date,
  type: dateTime,
  lowercase = false,
) {
  if (lowercase) return value.toString().toLowerCase();

  let valueToDate = new Date(value);

  if (type === "date") {
    // return valueToDate.toISOString().split("T")[0].split("-").join("-");
    return `${valueToDate.getFullYear()}-${valueToDate.getMonth() + 1}-${valueToDate.getDate()}`;
  } else {
    return `${valueToDate.getHours()}:${valueToDate.getMinutes().toString().length === 1 ? "0" + valueToDate.getMinutes() : valueToDate.getMinutes()}`;
  }
}
