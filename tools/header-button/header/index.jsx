import { useStore } from "./utils";

export function useHeader(props) {
  const { color, HeaderButton, Ionicons } = useStore();

  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color || color}
    />
  );
}
export default useHeader;
