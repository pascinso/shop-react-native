import { useStore } from "./utils";

export function useCart() {
  const {
    styles: { cartStyles, summaryStyles, summaryTextStyles, amountStyles },
    cart: { total = 0, items = {} },
    accent,
    onDelete,
    onOrder,
    View,
    Text,
    Button,
    FlatList,
    Item,
  } = useStore();

  return (
    <View style={cartStyles}>
      <View style={summaryStyles}>
        <Text style={summaryTextStyles}>
          Total: <Text style={amountStyles}>${total.toFixed(2)}</Text>
        </Text>

        <Button
          color={accent}
          title="Order Now"
          disabled={Object.keys(items).length === 0}
          onPress={onOrder}
        />
      </View>

      <FlatList
        data={Object.values(items)}
        renderItem={({ item: { id, quantity, title, total: price } }) => (
          <Item
            quantity={quantity}
            title={title}
            total={price}
            onDelete={onDelete.bind(null, { id })}
          />
        )}
      />
    </View>
  );
}
