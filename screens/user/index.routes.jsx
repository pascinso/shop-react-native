import { useStore } from "./utils";

export function useUser() {
  const {
    screenOptions: { defaultOptions },
    stack: { Navigator, Screen },
    useProducts,
    useEdit,
  } = useStore();

  return (
    <Navigator screenOptions={defaultOptions}>
      <Screen name="Your Products" component={useProducts} />
      <Screen name="Edit Product" component={useEdit} />
    </Navigator>
  );
}
