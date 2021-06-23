import { useStore } from "./utils";

export function useHeaderButton({ title, isDisabled, iconSuffix, onPress }) {
  const { OS, Header, HeaderButtons, Item } = useStore();

  return (
    <HeaderButtons HeaderButtonComponent={Header}>
      <Item
        title={title}
        iconName={OS === "android" ? `md-${iconSuffix}` : `ios-${iconSuffix}`}
        disabled={isDisabled}
        onPress={onPress}
        color={isDisabled && "rgba(194,24,91,0.4)"}
      />
    </HeaderButtons>
  );
}
export default useHeaderButton;
