import { useMemo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useCartItem } from "../item/cart";

export function useStore() {
  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          detailsStyles: {
            width: "100%",
          },
        }),
      []
    ),
    FlatList,
    CartItem: useCartItem,
  };
}
