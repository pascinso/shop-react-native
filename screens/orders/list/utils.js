import { memo, useMemo, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { useProps as productsProps } from "../../products/overview/utils";
import { useOrder } from "./order";

export function useStore() {
  const [orders, setOrders] = useState(null);
  const { putProducts } = useMemo(() => productsProps(), []);

  useMemo(
    () =>
      putProducts((old) => {
        setOrders(old.orders);
        return old;
      }),
    [putProducts]
  );

  useFocusEffect(() =>
    putProducts((old) => {
      const { orders: oldOrders } = old || {};
      if (oldOrders !== orders) {
        setOrders(oldOrders);
      }
      return old;
    })
  );

  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          listStyles: {
            flex: 1,
            backgroundColor: "white",
          },
          alertStyles: {
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          },
        }),
      []
    ),
    orders,
    moment,
    FlatList,
    View,
    Text,
    Order: useMemo(() => memo(useOrder), []),
  };
}
