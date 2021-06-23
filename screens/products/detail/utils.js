import { useCallback, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from "tools/styles";
import { useProps as productsProps } from "../overview/utils";

export function useStore() {
  const {
    params: { id, title, image, description, price },
  } = useRoute();
  const { setOptions } = useNavigation();
  const { primary } = useMemo(() => colors, []);
  const { create } = useMemo(() => StyleSheet, []);
  const { addToCart } = useMemo(() => productsProps(), []);

  useLayoutEffect(
    () =>
      setOptions({
        headerTitle: title,
      }),
    [title, setOptions]
  );

  return {
    styles: useMemo(
      () =>
        create({
          detailStyles: {
            flex: 1,
            backgroundColor: "white",
          },
          imageStyles: {
            width: "100%",
            height: 300,
          },
          buttonWrapper: {
            marginVertical: 10,
            alignItems: "center",
          },
          buttonText: {
            color: primary,
            fontSize: 16,
          },
        }),
      [primary, create]
    ),
    texts: useMemo(
      () => [
        {
          name: `$${price}`,
          style: create({
            sheet: {
              fontSize: 20,
              fontFamily: "openSansBold",
              color: "#888",
              textAlign: "center",
              marginVertical: 20,
            },
          }),
        },
        {
          name: description,
          style: create({
            sheet: {
              fontSize: 14,
              fontFamily: "openSans",
              textAlign: "center",
              marginHorizontal: 20,
            },
          }),
        },
      ],
      [price, description, create]
    ),
    image,
    onAddToCart: useCallback(
      () => addToCart({ price, id, title }),
      [addToCart, price, id, title]
    ),
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
  };
}
