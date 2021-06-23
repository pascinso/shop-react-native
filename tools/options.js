import { Platform } from "react-native";
import colors from "./styles/colors.json";

const { OS } = Platform;
const { primary } = colors;

export const defaultOptions = {
  headerStyle: {
    backgroundColor: OS === "android" ? primary : "white",
    shadowColor: "grey",
  },
  headerTitleStyle: {
    fontFamily: "openSansBold",
  },
  headerBackTitleStyle: {
    fontFamily: "openSans",
  },
  headerTintColor: OS === "android" ? "white" : primary,
};
