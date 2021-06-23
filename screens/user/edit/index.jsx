import { useStore } from "./utils";

export function useEdit() {
  const {
    styles: { editStyles },
    fields,
    onChangeText,
    FlatList,
    Input,
  } = useStore();

  return (
    <FlatList
      style={editStyles}
      data={fields}
      renderItem={({ item: { id, defaultValue, isEditable } }) => (
        <Input
          id={id}
          isEditable={isEditable}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
        />
      )}
    />
  );
}
