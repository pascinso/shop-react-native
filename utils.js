import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useStatusBar } from "tools";
import { Text } from "react-native";
import { useNavigator } from "./screens/index.routes";

export function useStore() {
  const [isFontLoaded] = useFonts({
    openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  return {
    isFontLoaded,
    Text,
    NavigationContainer,
    StatusBar: useStatusBar,
    Navigator: useNavigator,
  };
}
