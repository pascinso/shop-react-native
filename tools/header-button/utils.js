import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import { useMemo } from "react";
import { useHeader } from "./header";

export function useStore() {
  return {
    OS: useMemo(() => Platform, []),
    Header: useHeader,
    HeaderButtons,
    Item,
  };
}
