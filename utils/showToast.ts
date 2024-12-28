import { Toast } from "react-native-toast-notifications";

type toastType = "success" | "warning" | "danger";

export function ShowToast(message: string, ttype: toastType) {
  Toast.show(message, {
    type: ttype,
    placement: "top",
    animationType: "zoom-in",
  });
}
