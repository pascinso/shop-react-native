import { useMemo } from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "tools/styles";

export function useStore() {
  const { primary } = useMemo(() => colors, []);
  const { OS } = useMemo(() => Platform, []);

  return {
    HeaderButton,
    Ionicons,
    color: OS === "android" ? "white" : primary,
  };
}
