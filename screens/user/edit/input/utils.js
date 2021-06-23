import { useMemo } from "react";
import { StyleSheet, TextInput, Text } from "react-native";

export function useStore() {
  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          labelStyles: {
            fontFamily: "openSansBold",
            paddingVertical: 8,
          },
          inputStyles: {
            paddingHorizontal: 2,
            paddingVertical: 5,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginBottom: 8,
          },
        }),
      []
    ),
    TextInput,
    Text,
  };
}
