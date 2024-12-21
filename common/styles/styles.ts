import { StyleSheet } from "react-native";

const colors = {
  primary: "#F8961E",
  secondary: "#F94144",
  text: "#252422",
  text_secondary: "#fff8f0",
  text_3: "#fff8f0",

  disabled: "#d6d6d6",

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

export const headerStyles = StyleSheet.create({
  header: {
    // backgroundColor: colors.primary,
  },
  header__title: {
    color: colors.text,
    backgroundColor: "#ffbc0a",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 8,
  },
  header__names__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: colors.primary,
  },
  header__owner: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
    flex: 0.5,
    textAlign: "center",
  },
  header__developer: {
    color: colors.text_secondary,
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
    flex: 0.5,
    textAlign: "center",
    borderLeftWidth: 2,
    borderLeftColor: "#3b3b3b",
  },
});

export const setNameStyles = StyleSheet.create({
  setName: {
    backgroundColor: colors.cerulean,
    padding: 10,
  },
  setName__text: {
    color: colors.text_secondary,
    fontSize: 20,
    fontWeight: "bold",
  },
  setName__input__container: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 5,
    marginVertical: 10,
  },
  setName__input: {
    backgroundColor: colors.text_secondary,
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 0.8,
    fontWeight: "bold",
  },
  setName__input__disabled: {
    backgroundColor: colors.disabled,
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 0.8,
    fontWeight: "bold",
  },
  setName__icon: {
    backgroundColor: colors.text_secondary,
    borderRadius: 5,
    flex: 0.2,
  },
  setName__icon2: {
    textAlign: "center",
    padding: 7,
  },
});

export const navStyles = StyleSheet.create({
  navBar__container: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "stretch",
    gap: 2,
    backgroundColor: colors.text_3,
  },
  navBar__button: {
    width: "50%",
    textAlign: "center",
    height: "auto",
    backgroundColor: colors.disabled,

    borderRadius: 5,
  },
  navBar__button__pressed: {
    elevation: 10,
    opacity: 0.9,
  },
  navBar__icon: {
    padding: 15,
    textAlign: "center",
  },
  navBar__screen__focused: {
    backgroundColor: colors.cerulean,
  },
});

export const layoutStyles = StyleSheet.create({
  main__container: {
    position: "relative",
    flex: 1,
  },
  scroll__container: {
    height: "auto",
  },
});
