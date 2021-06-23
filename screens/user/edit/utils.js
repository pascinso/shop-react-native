import {
  memo,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useHeaderButton as SaveHeader } from "tools";
import { useProps as productsProps } from "../../products/overview/utils";
import { useProps as userProductsProps } from "../products/utils";
import { useInput } from "./input";

export function useStore() {
  const [inputs, setInputs] = useState(null);
  const [isDisabled, disable] = useState(false);
  const { setOptions, goBack } = useNavigation();
  const { params } = useRoute();
  const { putProducts } = useMemo(() => productsProps(), []);
  const { putUserProducts } = useMemo(() => userProductsProps(), []);
  const fields = useMemo(() => {
    const { image: { uri } = {}, price, title, description } = params || {};

    return [
      {
        id: "title",
        defaultValue: title,
      },
      {
        id: "URL",
        defaultValue: uri,
      },
      {
        id: "price",
        defaultValue: `${(0).toFixed(2)}`,
        isEditable: !price,
      },
      {
        id: "description",
        defaultValue: description,
      },
    ];
  }, [params]);

  useEffect(() => {
    if (
      !inputs ||
      Object.keys(inputs).length !== fields.length ||
      Object.keys(inputs).find((key) => inputs[key] === "")
    ) {
      disable((old) => old || true);
      return;
    }
    disable((old) => (old ? false : old));
  }, [inputs, fields]);

  useLayoutEffect(
    () =>
      setOptions({
        headerTitle: params ? "Edit Product" : "Add Product",
      }),
    [params, setOptions]
  );

  useLayoutEffect(() => {
    const Checkmark = memo(
      (props) => <SaveHeader {...props} />,
      (old, next) => old.isDisabled === next.isDisabled
    );
    Checkmark.displayName = "Checkmark";

    setOptions({
      headerRight() {
        return (
          <Checkmark
            title="Save"
            iconSuffix="checkmark"
            isDisabled={isDisabled}
            onPress={setInputs.bind(null, (oldInputs) => {
              if (Object.values(params).find((value) => value)) {
                const getProducts = (old) => {
                  const oldIndex = old.findIndex(
                    (product) => product.id === params.id
                  );
                  const oldProducts = [...old];
                  oldProducts[oldIndex] = {
                    id: params.id,
                    title: oldInputs?.title || params.title,
                    ownerID: "u1",
                    description: oldInputs?.description || params.description,
                    image: {
                      uri: oldInputs?.URL || params.image.uri,
                    },
                    price: oldInputs?.price || params.price,
                  };

                  return oldProducts;
                };

                putUserProducts((old) => getProducts(old));
                putProducts((old) => {
                  const { inStock, userProducts } = old || {};

                  goBack();

                  return {
                    ...old,
                    inStock: getProducts(inStock),
                    userProducts: getProducts(userProducts),
                  };
                });
                return oldInputs;
              }
              const newProduct = {
                id: new Date().toString(),
                title: oldInputs?.title,
                ownerID: "u1",
                description: oldInputs?.description,
                image: {
                  uri: oldInputs?.URL,
                },
                price: +oldInputs?.price,
              };
              putUserProducts((old) => [newProduct, ...old]);
              putProducts((old) => {
                const { inStock, userProducts } = old || {};

                goBack();

                return {
                  ...old,
                  inStock: [newProduct, ...inStock],
                  userProducts: [newProduct, ...userProducts],
                };
              });

              return oldInputs;
            })}
          />
        );
      },
    });
  }, [isDisabled, params, putProducts, putUserProducts, setOptions, goBack]);

  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          editStyles: {
            flex: 1,
            backgroundColor: "white",
            padding: 20,
          },
        }),
      []
    ),
    fields,
    onChangeText: useCallback(
      (id, text) =>
        setInputs((old) => ({
          ...old,
          [id]: text,
        })),
      []
    ),
    FlatList,
    Input: useMemo(() => memo(useInput), []),
    Button,
  };
}
