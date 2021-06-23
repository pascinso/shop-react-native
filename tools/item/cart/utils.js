import { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function useStore() {
  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          itemStyles: {
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          },
          dataStyles: {
            flexDirection: "row",
            alignItems: "center",
          },
          quantityStyles: {
            fontFamily: "openSans",
            color: "#888",
            fontSize: 16,
            paddingRight: 10,
          },
          titleStyles: {
            fontFamily: "openSansBold",
            fontSize: 16,
          },
          amountStyles: {
            fontFamily: "openSansBold",
            fontSize: 16,
          },
          trashStyles: {
            paddingLeft: 20,
          },
        }),
      []
    ),
    Platform,
    View,
    Text,
    TouchableOpacity,
    Ionicons,
  };
}
