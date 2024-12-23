export function formatNumber(num: string | number) {
  return num.toString().replace(/[^0-9]/g, "");
}
