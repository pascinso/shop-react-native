import { createStackNavigator } from "@react-navigation/stack";
import { useMemo } from "react";
import { defaultOptions } from "tools/options";
import { useCart } from "./cart";
import { useDetail } from "./detail";
import { useOverview } from "./overview";

export function useStore() {
  return {
    stack: useMemo(() => createStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        defaultOptions,
      }),
      []
    ),
    useOverview,
    useDetail,
    useCart,
  };
}
