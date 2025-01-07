import { StyleSheet } from "react-native";

const colors = {
  primarys: "#F8961E",
  secondary: "#F94144",
  text: "#252422",
  text_secondary: "#fff8f0",
  text_3: "#fff8f0",

  disable: "#d6d6d6",
  enable: "#F6F4F4",

  on: "#adc178",
  off: "#bc4749",

  // Azul:
  primary: "#184e77",
  level2: "#1e6091",
  level3: "#1a759f",
  level4: "#168aad",

  level5: "#2a6f97ff",
  level6: "#2c7da0ff",
  level7: "#468fafff",
  level8: "#61a5c2ff",
  level9: "#89c2d9ff",
  level10: "#a9d6e5ff",
  level11: "#cae9ff",

  // orange - yellow
  oLevel1: "#ffb703",
  oLevel2: "#fd9e02",
  oLevel3: "#fb8500",

  // purple
  pLevel1: "#4e148c",
  pLevel2: "#613dc1",
  pLevel3: "#858ae3",

  textWhite: "#F1F8FD",
};

export const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    width: "100%",
  },
  header__title: {
    color: colors.level11,
    backgroundColor: colors.primary,
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 8,
  },
  header__names__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.level2,
  },
  header__owner: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "bold",
    paddingVertical: 5,
    flex: 0.5,
    textAlign: "center",
  },
  header__developer: {
    flex: 0.5,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  header__developer__title: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 2,
    color: colors.level8,
  },
});

export const setNameStyles = StyleSheet.create({
  setName: {
    backgroundColor: colors.level3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  setName__text: {
    color: colors.text_secondary,
    fontSize: 17,
    fontWeight: "bold",
  },
  setName__input__container: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 5,
    marginVertical: 5,
  },
  setName__input: {
    backgroundColor: colors.text_secondary,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 0.8,
    fontWeight: "600",
    fontSize: 15,
  },
  setName__input__disabled: {
    backgroundColor: colors.disable,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 0.8,
    fontWeight: "600",
    fontSize: 15,
    color: colors.primary,
  },
  setName__icon: {
    backgroundColor: colors.text_secondary,
    borderRadius: 5,
    flex: 0.2,
  },
  setName__icon2: {
    textAlign: "center",
    padding: 5,
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
    backgroundColor: colors.level10,
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
    backgroundColor: colors.level2,
  },
});

export const layoutStyles = StyleSheet.create({
  main__container: {
    flex: 1,
    flexDirection: "column",
  },
  scroll__container: {
    backgroundColor: colors.level11,
  },
  scroll__content__container: {
    height: "auto",
    flexGrow: 1,
    padding: 10,
  },
});

export const formStyles = StyleSheet.create({
  form__container: {
    borderBlockColor: colors.primary,
    width: "100%",
    height: "auto",
    borderWidth: 2,
    borderRadius: 5,
    gap: 3,
    backgroundColor: colors.level7,
    boxShadow: "0px 0px 2px black, 0px 0px 2px black,",
  },
  form__title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
    borderBottomColor: "black",
    borderRadius: 5,
    backgroundColor: colors.level5,
    elevation: 7,
    // boxShadow: "0px 1px 10px",
  },

  form__date__container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: "stretch",
    justifyContent: "center",
    alignSelf: "center",
  },
  form__date__title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
  },
  form__date__input: {
    backgroundColor: colors.textWhite,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    flex: 0.8,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "condensedBold",
    borderWidth: 2,
    borderRightWidth: 0,
  },
  form__date__icon: {
    backgroundColor: colors.oLevel2,
    width: "100%",
    height: "auto",
    borderTopRightRadius: 5,
    borderBottomEndRadius: 5,
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    borderWidth: 2,
  },
  form__date__icon2: {
    textAlign: "center",
    width: "100%",
  },
  form__hour__container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.level3,
  },

  form__save__data__container: {
    borderWidth: 2,
    width: "98%",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    backgroundColor: colors.oLevel3,
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
  list__item__header__empty: {
    width: 77.9,
  },

  list__item__date: {
    width: 100,
  },
  list__item__details: {
    width: 250,
  },
  list__item__quantity: {
    width: 90,
    textAlign: "center",
  },
  list__item__start_hour: {
    width: 60,
    textAlign: "center",
  },
  list__item__pause: {
    width: 75,
    textAlign: "center",
  },
  list__item__restart: {
    width: 75,
    textAlign: "center",
  },
  list__item__end_hour: {
    width: 60,
    textAlign: "center",
  },
  list__item__delete_cell: {
    width: 40,
    backgroundColor: "#c72424",
  },
  list__item__edit_cell: {
    width: 40,
    backgroundColor: colors.level3,
  },

  // xd
  horizontalScroll: {
    flex: 1,
    marginVertical: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: colors.level9,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.oLevel1,
    borderRadius: 5,
    borderWidth: 2,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  headerCell: {
    minWidth: 10,
    height: "100%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  cell: {
    minWidth: 10,
    paddingHorizontal: 10,
    verticalAlign: "middle",
    borderRightWidth: 1,
  },
  cellText: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  cellDetails: {
    textAlign: "left",
  },
  zebraRow: {
    backgroundColor: colors.level10,
  },
  isEditignRow: {
    backgroundColor: colors.pLevel3,
  },
  cell__icon: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    marginHorizontal: 20,
  },
});

export const oldStyles = StyleSheet.create({
  old__date__main__title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },

  old__date__container: {
    flexDirection: "row",
    backgroundColor: colors.level7,
    borderRadius: 10,
    marginBottom: 10,
  },
  old__date__title: {
    flex: 0.8,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "left",
    verticalAlign: "middle",
    padding: 10,
  },
  old__date__expand: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.level6,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  },
});
