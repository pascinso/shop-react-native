import { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import defaultStyles, { colors } from "tools/styles";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useCartItem } from "tools";
import { useProps as productsProps } from "../overview/utils";

export function useStore() {
  const { params } = useRoute();
  const [cart, setCart] = useState(params);
  const { primary, accent } = useMemo(() => colors, []);
  const { deleteFromCart, putProducts } = useMemo(() => productsProps(), []);

  useFocusEffect(() =>
    putProducts((old) => {
      const { cart: oldCart } = old || {};
      const { items } = cart;
      if (
        oldCart &&
        Object.keys(items).length !== Object.keys(oldCart.items).length
      ) {
        setCart(oldCart);
      }
      return old;
    })
  );

  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          cartStyles: {
            flex: 1,
            padding: 20,
            backgroundColor: "white",
          },
          summaryStyles: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            marginBottom: 20,
            ...defaultStyles.card,
          },
          summaryTextStyles: {
            fontFamily: "openSansBold",
            fontSize: 18,
          },
          amountStyles: {
            color: primary,
          },
        }),
      [primary]
    ),
    accent,
    cart,
    onDelete: useCallback(
      ({ id }) => {
        deleteFromCart({ id, call: setCart });
        deleteFromCart({ id });
      },
      [deleteFromCart]
    ),
    onOrder: useCallback(
      () =>
        putProducts((old) => {
          const date = new Date();
          const { orders, cart: oldCart } = old || {};

          setCart({});

          return {
            ...old,
            cart: null,
            orders: !orders
              ? [
                  {
                    id: date.toString(),
                    ...oldCart,
                    date,
                  },
                ]
              : [
                  {
                    id: date.toString(),
                    ...oldCart,
                    date,
                  },
                  ...orders,
                ],
          };
        }),
      [putProducts]
    ),
    View,
    Text,
    Button,
    FlatList,
    Item: useMemo(
      () =>
        memo(
          useCartItem,
          (old, { quantity, total }) =>
            old.total === total && old.quantity === quantity
        ),
      []
    ),
  };
}
