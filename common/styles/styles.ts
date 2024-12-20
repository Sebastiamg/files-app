import { StyleSheet } from "react-native";

const colors = {
  primary: "#F8961E",
  secondary: "#F94144",
  text: "#252422",
  text_secondary: "#252422",

  imperialRed: "#f94144ff",
  orangeCrayola: "#f3722cff",
  carrotOrange: "#f8961eff",
  coral: "#f9844aff",
  saffron: "#f9c74fff",
  pistachio: "#90be6dff",
  zomp: "#43aa8bff",
  darkCyan: "#4d908eff",
  paynesGray: "#577590ff",
  cerulean: "#277da1ff",
};

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "column",
  },
  header__title: {
    color: colors.text,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 8,
  },

  header__owner: {
    color: colors.text,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
