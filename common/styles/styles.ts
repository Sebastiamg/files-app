import { StyleSheet } from "react-native";

const colors = {
  primary: "#F8961E",
  secondary: "#F94144",
  text: "#252422",
  text_secondary: "#fff8f0",
  text_3: "#fff8f0",

  disable: "#d6d6d6",
  enable: "#F6F4F4",

  on: "#adc178",
  off: "#bc4749",

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
    backgroundColor: "white",
    width: "100%",
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
    flex: 0.5,
    borderLeftWidth: 2,
    borderLeftColor: "#3b3b3b",
  },
  header__developer__title: {
    color: colors.text_secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
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
    backgroundColor: colors.disable,
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
    gap: 2,
    backgroundColor: colors.text_3,
  },
  navBar__button: {
    width: "50%",
    textAlign: "center",
    height: "auto",
    backgroundColor: colors.disable,
    // borderRadius: 5,
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
    flex: 1,
    gap: 1,
    flexDirection: "column",
  },
  scroll__container: {
    // padding: 10,
  },
  scroll__content__container: {
    height: "auto",
    flexGrow: 1,
    padding: 10,
  },
});

export const formStyles = StyleSheet.create({
  form__container: {
    borderBlockColor: "black",
    width: "100%",
    height: "auto",
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    gap: 3,
    // backgroundColor: "red",
  },
  form__title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  form__date__container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
    padding: 2,
  },
  form__date__title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    width: "100%",
  },
  form__date__input: {
    backgroundColor: colors.disable,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    flex: 0.8,
    alignContent: "center",
    alignItems: "center",
    elevation: 5,
    flexBasis: 1,
    flexShrink: 1,
  },
  form__date__icon: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    borderTopRightRadius: 5,
    borderBottomEndRadius: 5,
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 5,
    flexBasis: 1,
    flexShrink: 1,
  },
  form__date__icon2: {
    textAlign: "center",
    flex: 1,
    height: "auto",
    width: "100%",
  },
  form__hour__container: {
    flex: 1,
    flexDirection: "row",
  },

  form__save__data__container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.orangeCrayola,
    borderRadius: 5,
  },
  form__save__data__title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export const inputStyles = StyleSheet.create({
  input__component: {
    backgroundColor: colors.enable,
    borderRadius: 5,
    padding: 10,
    flex: 0.8,
    alignContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export const voiceStyles = StyleSheet.create({
  voice__mic__on: {
    backgroundColor: colors.off,
  },
  voice__mic__off: {
    backgroundColor: colors.on,
  },
  voice__input__container: {
    height: 90,
    textAlignVertical: "top",
  },
});

export const listStyles = StyleSheet.create({
  list__item0: {
    width: 100,
  },
  list__item1: {
    width: 250,
  },
  list__item2: {
    width: 90,
  },
  list__item3: {
    width: 75,
  },
  list__item4: {
    width: 75,
  },
  list__item5: {
    width: 75,
  },
  list__item6: {
    width: 75,
  },
  list__item7: {
    width: 150,
  },
  list__item8: {
    width: 150,
  },

  // xd
  horizontalScroll: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: colors.enable,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.carrotOrange,
    padding: 3,
    borderRadius: 5,
    borderWidth: 2,
  },
  headerCell: {
    minWidth: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderRadius: 5,
    borderBottomWidth: 2,
    padding: 10,
    // height: 40,
  },
  cell: {
    minWidth: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  cellText: {
    fontSize: 14,
    textAlign: "center",
  },
  cellDetails: {
    textAlign: "left",
  },
  zebraRow: {
    backgroundColor: colors.disable,
  },

  cell__icon: {
    flex: 1,
    backgroundColor: "#c72424",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    marginHorizontal: 20,
  },
});

export const buttonsStyles = StyleSheet.create({
  main_donwnload: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.paynesGray,
  },
  main_donwnload_text: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationColor: "white",
  },
});
