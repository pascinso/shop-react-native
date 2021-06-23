import { useStore } from "./utils";

export function useProducts() {
  const {
    screenOptions: { defaultOptions },
    stack: { Navigator, Screen },
    useOverview,
    useDetail,
    useCart,
  } = useStore();

  return (
    <Navigator screenOptions={defaultOptions}>
      <Screen name="All Products" component={useOverview} />
      <Screen name="Product Detail" component={useDetail} />
      <Screen name="Your Cart" component={useCart} />
    </Navigator>
  );
}
