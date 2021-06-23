import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import defaultStyles from "tools/styles";
import { useDetail } from "./detail";

export function useStore() {
  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          orderStyles: {
            margin: 20,
            padding: 10,
            alignItems: "center",
            ...defaultStyles.card,
          },
          summaryStyles: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingBottom: 15,
          },
          totalStyles: {
            fontFamily: "openSansBold",
            fontSize: 16,
          },
          dateStyles: {
            fontFamily: "openSans",
            fontSize: 16,
            color: "#888",
          },
        }),
      []
    ),
    View,
    Text,
    Detail: useDetail,
  };
}
