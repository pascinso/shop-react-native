import { useStore } from "./utils";

export function useOrderDetails({ items }) {
  const {
    styles: { detailsStyles },
    FlatList,
    CartItem,
  } = useStore();

  return (
    <FlatList
      style={detailsStyles}
      data={Object.values(items)}
      renderItem={({ item: { quantity, total: totalPrice, title } }) => (
        <CartItem quantity={quantity} total={totalPrice} title={title} />
      )}
    />
  );
}
export default useOrderDetails;
