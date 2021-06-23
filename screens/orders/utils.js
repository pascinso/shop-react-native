import { createStackNavigator } from "@react-navigation/stack";
import { useMemo } from "react";
import { defaultOptions } from "tools/options";
import { useList } from "./list";

export function useStore() {
  return {
    stack: useMemo(() => createStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        defaultOptions,
      }),
      []
    ),
    useList,
  };
}
