import { dateTime } from "../common/hooks/useDateAndTime";

export function formatDateAndTime(
  value: string | Date,
  type: dateTime,
  lowercase = false,
) {
  if (lowercase) return value.toString().toLowerCase();

  const valueToDate = new Date(value);

  if (type === "date") {
    // return value;
    return valueToDate.toISOString().split("T")[0].split("-").join("-");
  } else {
    // cambiar
    return `${valueToDate.getHours()}:${valueToDate.getMinutes().toString().length === 1 ? "0" + valueToDate.getMinutes() : valueToDate.getMinutes()}`;
  }
}
