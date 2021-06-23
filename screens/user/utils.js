import { createStackNavigator } from "@react-navigation/stack";
import { useMemo } from "react";
import { defaultOptions } from "tools/options";
import { useEdit } from "./edit";
import { useProducts } from "./products";

export function useStore() {
  return {
    stack: useMemo(() => createStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        defaultOptions,
      }),
      []
    ),
    useProducts,
    useEdit,
  };
}
