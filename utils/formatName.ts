export function formatName(name: string) {
  return name
    .split(/[\s_]/)
    .map((string) => {
      return string
        .charAt(0)
        .toUpperCase()
        .concat(string.substring(1).toLocaleLowerCase());
    })
    .join(" ");
}
