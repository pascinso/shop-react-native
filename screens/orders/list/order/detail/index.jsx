import { useStore } from "./utils";

export function useDetail({ items }) {
  const { isShown, primary, show, Button, OrderDetails } = useStore();

  return (
    <>
      <Button
        title={`${!isShown ? "Show" : "Hide"} Details`}
        color={primary}
        onPress={show.bind(null, (old) => !old)}
      />
      {isShown && <OrderDetails items={items} />}
    </>
  );
}
