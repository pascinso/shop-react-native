import { useStore } from "./utils";

export function useProducts() {
  const {
    styles: { userStyles, alertStyles },
    products,
    buttons,
    onEdit,
    Product,
    FlatList,
    View,
    Text,
  } = useStore();

  return !products || products.length === 0 ? (
    <View style={alertStyles}>
      <Text>Your products are empty!</Text>
    </View>
  ) : (
    <FlatList
      style={userStyles}
      data={products}
      renderItem={({ item: { title, price, image, id } }) => (
        <Product
          title={title}
          price={price}
          image={image}
          id={id}
          buttons={buttons}
          onSelect={onEdit}
        />
      )}
    />
  );
}
