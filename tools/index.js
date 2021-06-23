import { lazy, Suspense } from "react";

function load(path, props) {
  const Path = lazy(() => path);

  return (
    <Suspense fallback={null}>
      <Path {...props} />
    </Suspense>
  );
}

export const useStatusBar = () => load(import("./status-bar"));
export const useHeaderButton = (props) =>
  load(import("./header-button"), props);
export const useOrderDetails = (props) =>
  load(import("./order-details"), props);
export const useCartItem = (props) => load(import("./item/cart"), props);
export const useProductItem = (props) => load(import("./item/product"), props);
