import { useStore } from "./utils";

export function useOverview() {
  const {
    styles: { productsStyles },
    products,
    buttons,
    onViewDetail,
    FlatList,
    Product,
  } = useStore();

  return (
    <FlatList
      style={productsStyles}
      data={products.inStock}
      renderItem={({ item: { title, price, image, id } }) => (
        <Product
          id={id}
          title={title}
          price={price}
          image={image}
          buttons={buttons}
          onSelect={onViewDetail}
        />
      )}
    />
  );
}
