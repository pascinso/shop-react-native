import "react-native-gesture-handler";
import { useStore } from "./utils";

export default function App() {
  const { isFontLoaded, Text, StatusBar, NavigationContainer, Navigator } =
    useStore();

  return !isFontLoaded ? (
    <Text>Loading fonts</Text>
  ) : (
    <NavigationContainer>
      <StatusBar />
      <Navigator />
    </NavigationContainer>
  );
}
