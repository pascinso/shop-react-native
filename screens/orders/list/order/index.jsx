import { useStore } from "./utils";

export function useOrder({ total, date, items }) {
  const {
    styles: { orderStyles, summaryStyles, totalStyles, dateStyles },
    View,
    Text,
    Detail,
  } = useStore();

  return (
    <View style={orderStyles}>
      <View style={summaryStyles}>
        <Text style={totalStyles}>${total}</Text>
        <Text style={dateStyles}>{date}</Text>
      </View>

      <Detail items={items} />
    </View>
  );
}
