import { useMemo, useState } from "react";
import { Button, FlatList } from "react-native";
import { colors } from "tools/styles";
import { useOrderDetails } from "tools";

export function useStore() {
  const { primary } = useMemo(() => colors, []);
  const [isShown, show] = useState(false);

  return {
    isShown,
    primary,
    show,
    Button,
    OrderDetails: useOrderDetails,
    FlatList,
  };
}
