import { useStore } from "./utils";

export function useList() {
  const {
    styles: { listStyles, alertStyles },
    orders,
    moment,
    FlatList,
    View,
    Text,
    Order,
  } = useStore();

  return !orders ? (
    <View style={alertStyles}>
      <Text>Your orders are empty!</Text>
    </View>
  ) : (
    <FlatList
      style={listStyles}
      data={orders}
      renderItem={({ item: { total, date, items } }) => (
        <Order
          total={total}
          date={moment(date).format("MMMM Do YYYY, hh:mm")}
          items={items}
        />
      )}
    />
  );
}
