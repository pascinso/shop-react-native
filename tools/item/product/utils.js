import { useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import defaultStyles, { colors } from "tools/styles";

export function useStore() {
  const { create } = useMemo(() => StyleSheet, []);
  const { OS, Version } = useMemo(() => Platform, []);
  const { primary } = useMemo(() => colors, []);

  return {
    styles: useMemo(
      () =>
        create({
          productStyles: {
            height: 300,
            margin: 20,
            ...defaultStyles.card,
          },
          imageStyles: {
            width: "100%",
            height: "60%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",
          },
          detailsStyles: {
            alignItems: "center",
            padding: 10,
          },
          buttonsStyles: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          },
        }),
      [create]
    ),
    primary,
    getTexts: useCallback(
      ({ title, price }) => [
        {
          style: create({
            styles: {
              fontSize: 18,
              fontFamily: "openSansBold",
              paddingVertical: 2,
            },
          }),
          name: title,
        },
        {
          style: create({
            styles: {
              fontSize: 14,
              color: "#888",
              fontFamily: "openSans",
            },
          }),
          name: `$${price}`,
        },
      ],
      [create]
    ),
    View,
    Text,
    Image,
    Button,
    TouchableOpacity:
      OS === "android" && Version >= 21
        ? TouchableNativeFeedback
        : TouchableOpacity,
  };
}
