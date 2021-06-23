import { useStore } from "./utils";

export function useProductItem({ title, price, image, id, buttons, onSelect }) {
  const {
    styles: { productStyles, imageStyles, buttonsStyles, detailsStyles },
    primary,
    getTexts,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
  } = useStore();

  return (
    <TouchableOpacity
      onPress={onSelect.bind(null, {
        id,
        title,
        price,
        image,
      })}
      useForeground
    >
      <View style={productStyles}>
        <Image style={imageStyles} source={image} />

        <View style={detailsStyles}>
          {getTexts({ title, price: price.toFixed(2) }).map(
            ({ style: { styles }, name }) => (
              <Text key={name} style={styles}>
                {name}
              </Text>
            )
          )}
        </View>

        <View style={buttonsStyles}>
          {buttons?.map(({ name, onPress }) => (
            <Button
              key={name}
              color={primary}
              title={name}
              onPress={onPress.bind(null, {
                id,
                title,
                price,
                image,
              })}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default useProductItem;
