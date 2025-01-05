export function formatNumber(num: string | number): string {
  if (num.toString().length > 0) {
    return num
      .toString()
      .substring(
        num.toString().charAt(0) === "0"
          ? Boolean(num.toString().charAt(1))
            ? 1
            : 0
          : 0,
      )
      .replace(/[^0-9]/g, "");
  } else {
    return "0";
  }
}
