export function formatNumber(num: string | number) {
  return num
    .toString()
    .substring(num.toString().charAt(0) === "0" ? 1 : 0)
    .replace(/[^0-9]/g, "");
}
