import { ToastAndroid } from "react-native";

export const showToastWithGravity = (message: string) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
