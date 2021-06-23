import { useStore } from "./utils";

export function useInput({ id, isEditable, defaultValue, onChangeText }) {
  const {
    styles: { labelStyles, inputStyles },
    TextInput,
    Text,
  } = useStore();

  return (
    (id !== "price" || (id === "price" && isEditable)) && (
      <>
        <Text style={labelStyles}>
          {id === "price"
            ? "Price ($)"
            : id.replace(/^\w/, (c) => c.toUpperCase())}
        </Text>
        <TextInput
          style={inputStyles}
          defaultValue={defaultValue}
          keyboardType={id === "price" ? "number-pad" : "default"}
          onChangeText={onChangeText.bind(this, id)}
        />
      </>
    )
  );
}
