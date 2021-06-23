import { useStore } from "./utils";

export function useDetail() {
  const {
    styles: { detailStyles, imageStyles, buttonWrapper, buttonText },
    image,
    texts,
    onAddToCart,
    Image,
    TouchableOpacity,
    ScrollView,
    Text,
  } = useStore();

  return (
    <ScrollView style={detailStyles}>
      <Image style={imageStyles} source={image} />

      <TouchableOpacity style={buttonWrapper} onPress={onAddToCart}>
        <Text style={buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      {texts.map(({ name, style: { sheet } }) => (
        <Text key={name} style={sheet}>
          {name}
        </Text>
      ))}
    </ScrollView>
  );
}
