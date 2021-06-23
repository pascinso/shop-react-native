import { useStore } from "./utils";

export function useOrders() {
  const {
    screenOptions: { defaultOptions },
    stack: { Navigator, Screen },
    useList,
  } = useStore();

  return (
    <Navigator screenOptions={defaultOptions}>
      <Screen name="Your Orders" component={useList} />
    </Navigator>
  );
}
