export function formatName(text: string, isPlainText = false) {
  if (isPlainText) {
    return text
      .charAt(0)
      .toUpperCase()
      .concat(text.substring(1).toLocaleLowerCase());
  } else {
    return text
      .split(/[\s_]/)
      .map((string, index) => {
        return string
          .charAt(0)
          .toUpperCase()
          .concat(string.substring(1).toLocaleLowerCase());
      })
      .join(" ");
  }
}
