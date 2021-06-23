import { useStore } from "./utils";

export function useCartItem({ quantity, total, title, onDelete }) {
  const {
    styles: {
      itemStyles,
      trashStyles,
      dataStyles,
      quantityStyles,
      titleStyles,
      amountStyles,
    },
    View,
    Text,
    TouchableOpacity,
    Ionicons,
    Platform: { OS },
  } = useStore();

  return (
    <View style={itemStyles}>
      <View style={dataStyles}>
        <Text style={quantityStyles}>{quantity}</Text>
        <Text style={titleStyles}>
          {title?.length <= 14 ? title : `${title?.substring(0, 14)}...`}
        </Text>
      </View>

      <View style={dataStyles}>
        <Text style={amountStyles}>${total.toFixed(2)}</Text>

        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={trashStyles}>
            <Ionicons
              name={OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default useCartItem;
