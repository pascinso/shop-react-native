import { useStore } from "./utils";

export function useNavigator() {
  const {
    options: { tabBarOptions, screenOptions },
    tab: { Navigator, Screen },
    useProducts,
    useOrders,
    useUser,
  } = useStore();

  return (
    <Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Screen name="Products" component={useProducts} />
      <Screen name="Orders" component={useOrders} />
      <Screen name="User" component={useUser} />
    </Navigator>
  );
}
