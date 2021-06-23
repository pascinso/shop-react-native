import { memo, useCallback, useMemo, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import { useProductItem, useHeaderButton as EditHeader } from "tools";
import { useNavigation } from "@react-navigation/native";
import { useProps as productsProps } from "../../products/overview/utils";

let putUserProducts;

export function useStore() {
  const [products, setProducts] = useState(null);
  const { putProducts, deleteFromCart } = useMemo(() => productsProps(), []);

  useMemo(() => (putUserProducts = setProducts), []);

  useMemo(
    () =>
      putProducts((old) => {
        setProducts(old.userProducts);
        return old;
      }),
    [putProducts]
  );

  const { navigate, setOptions } = useNavigation();
  const onEdit = useCallback(
    (params) =>
      putProducts((old) => {
        navigate("Edit Product", {
          ...params,
          description: old?.userProducts.find(
            (product) => product.id === params?.id
          )?.description,
        });
        return old;
      }),
    [navigate, putProducts]
  );

  useLayoutEffect(() => {
    const Edit = memo(() => (
      <EditHeader title="Edit" iconSuffix="create" onPress={onEdit} />
    ));
    Edit.displayName = "Edit";

    setOptions({
      headerRight() {
        return <Edit />;
      },
    });
  }, [setOptions, onEdit]);

  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          userStyles: {
            flex: 1,
            backgroundColor: "white",
          },
          alertStyles: {
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          },
        }),
      []
    ),
    products,
    buttons: useMemo(
      () => [
        {
          name: "Edit",
          onPress: onEdit,
        },
        {
          name: "Delete",
          onPress({ id }) {
            Alert.alert(
              "Are you sure?",
              "Do you really want to delete this product?",
              [
                { text: "No", style: "default" },
                {
                  text: "Yes",
                  style: "destructive",
                  onPress() {
                    setProducts((old) =>
                      old.filter((product) => product.id !== id)
                    );
                    putProducts((old) => ({
                      ...old,
                      userProducts: old.userProducts.filter(
                        (userProduct) => userProduct.id !== id
                      ),
                      inStock: old.inStock.filter(
                        (userProduct) => userProduct.id !== id
                      ),
                    }));
                    deleteFromCart({ id, isProduct: true });
                  },
                },
              ]
            );
          },
        },
      ],
      [putProducts, deleteFromCart, onEdit]
    ),
    onEdit,
    View,
    Text,
    FlatList,
    Product: useMemo(() => memo(useProductItem), []),
  };
}
export function useProps() {
  return {
    putUserProducts,
  };
}
