export function formatName(name: string) {
  return name
    .split(" ")
    .map((string) => {
      return string
        .charAt(0)
        .toUpperCase()
        .concat(string.substring(1).toLocaleLowerCase());
    })
    .join(" ");
}
