import { dateTime } from "../common/hooks/useDateAndTime";

export function formatDateAndTime(
  value: string | Date,
  type: dateTime,
  lowercase = false,
) {
  if (lowercase) return value.toString().toLowerCase();

  let valueToDate = new Date(value);

  function checkLength(value: string | number) {
    if (value.toString().length === 1) return `0${value}`;

    return value;
  }

  if (type === "date") {
    // return valueToDate.toISOString().split("T")[0].split("-").join("-");
    return `${valueToDate.getFullYear()}-${checkLength(valueToDate.getMonth() + 1)}-${checkLength(valueToDate.getDate())}`;
  } else {
    return `${valueToDate.getHours()}:${checkLength(valueToDate.getMinutes())}`;
  }
}
