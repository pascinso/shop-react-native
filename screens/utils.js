import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import { LogBox, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "tools/styles";
import { useOrders } from "./orders/index.routes";
import { useProducts } from "./products/index.routes";
import { useUser } from "./user/index.routes";

export function useStore() {
  useMemo(() => LogBox.ignoreLogs(["Require cycle:"]), []);
  const { OS } = useMemo(() => Platform, []);
  const { primary } = useMemo(() => colors, []);

  return {
    options: useMemo(
      () => ({
        tabBarOptions: {
          activeTintColor: primary,
          style: { paddingBottom: 5 },
        },
        screenOptions({ route: { name }, navigation: { isFocused } }) {
          let icon;
          const size = 23;
          const color = isFocused() ? primary : undefined;

          if (name === "Products") {
            icon = (
              <Ionicons
                name={OS === "android" ? "md-cart" : "ios-cart"}
                size={size}
                color={color}
              />
            );
          }
          if (name === "Orders") {
            icon = (
              <Ionicons
                name={OS === "android" ? "md-list" : "ios-list"}
                size={size}
                color={color}
              />
            );
          }
          if (name === "User") {
            icon = (
              <Ionicons
                name={OS === "android" ? "md-create" : "ios-create"}
                size={size}
                color={color}
              />
            );
          }

          return {
            tabBarIcon() {
              return icon;
            },
          };
        },
      }),
      [OS, primary]
    ),
    tab: useMemo(() => createBottomTabNavigator(), []),
    useProducts,
    useOrders,
    useUser,
  };
}
