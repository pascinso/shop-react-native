import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useProductItem, useHeaderButton as CartHeader } from "tools";
import { useNavigation } from "@react-navigation/native";

let putProducts;

export function useProps() {
  return {
    putProducts,
    addToCart({ price, id, title }) {
      putProducts((old) => {
        const cart = { ...old?.cart };
        const items = { ...cart?.items };

        items[id] = {
          id,
          price,
          title,
          quantity: !items[id] ? 1 : items[id].quantity + 1,
          total: !items[id] ? price : +(items[id].total + price).toFixed(2),
        };

        return {
          ...old,
          cart: {
            ...cart,
            items,
            total: !cart.total ? price : +(cart.total + price).toFixed(2),
          },
        };
      });
    },
    deleteFromCart({ id, call, isProduct }) {
      function deleteProduct(old) {
        const items = { ...old?.items };
        let total = !items[id]
          ? +(0).toFixed(2)
          : +(old.total - items[id].price).toFixed(2);

        if (isProduct && items[id]) {
          total = +(old.total - items[id].total).toFixed(2);
          delete items[id];
        } else if (items[id]?.quantity > 1) {
          items[id] = {
            ...items[id],
            quantity: items[id].quantity - 1,
            total: +(items[id].total - items[id].price).toFixed(2),
          };
        } else {
          delete items[id];
        }

        return {
          ...old,
          items,
          total,
        };
      }
      if (!call) {
        putProducts((old) => ({
          ...old,
          cart: deleteProduct({ ...old?.cart }),
        }));
        return;
      }
      call((old) => deleteProduct(old));
    },
  };
}

export function useStore() {
  const inStock = useMemo(
    () => [
      {
        id: "p1",
        ownerID: "u1",
        title: "Red Shirt",
        image: {
          uri: "https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg",
        },
        description: "A red t-shirt, perfect for days with non-red weather.",
        price: 29.99,
      },
      {
        id: "p2",
        ownerID: "u1",
        title: "Blue Carpet",
        image: {
          uri: "https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        },
        description:
          "Fits your red shirt perfectly. To stand on. Not to wear it.",
        price: 99.99,
      },
      {
        id: "p3",
        ownerID: "u2",
        title: "Coffee Mug",
        image: {
          uri: "https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg",
        },
        description: "Can also be used for tea!",
        price: 8.99,
      },
      {
        id: "p4",
        ownerID: "u3",
        title: "The Book - Limited Edition",
        image: {
          uri: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg",
        },
        description:
          "What the content is? Why would that matter? It's a limited edition!",
        price: 15.99,
      },
      {
        id: "p5",
        ownerID: "u3",
        title: "PowerBook",
        image: {
          uri: "https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg",
        },
        description:
          "Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!",
        price: 2299.99,
      },
      {
        id: "p6",
        ownerID: "u1",
        title: "Pen & Paper",
        image: {
          uri: "https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg",
        },
        description:
          "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
        price: 5.49,
      },
    ],
    []
  );
  const [products, setProducts] = useState({
    inStock,
    userProducts: inStock.filter(({ ownerID }) => ownerID === "u1"),
  });
  useMemo(() => (putProducts = setProducts), []);

  const { navigate, setOptions } = useNavigation();
  const { addToCart } = useMemo(() => {
    const getProps = useProps;
    return getProps();
  }, []);
  const onViewDetail = useCallback(
    (params) =>
      setProducts((old) => {
        navigate("Product Detail", {
          ...params,
          description: old?.inStock.find((product) => product.id === params?.id)
            ?.description,
        });
        return old;
      }),
    [navigate]
  );

  useLayoutEffect(() => {
    function onCart() {
      setProducts((old) => {
        const { items = {}, total = 0 } = old?.cart || {};
        navigate("Your Cart", {
          items,
          total,
        });
        return old;
      });
    }
    const Cart = memo(() => (
      <CartHeader title="Cart" iconSuffix="cart" onPress={onCart} />
    ));
    Cart.displayName = "Cart";

    setOptions({
      headerRight() {
        return <Cart />;
      },
    });
  }, [setOptions, navigate]);

  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          productsStyles: {
            flex: 1,
            backgroundColor: "white",
          },
        }),
      []
    ),
    products,
    buttons: useMemo(
      () => [
        {
          name: "View detail",
          onPress: onViewDetail,
        },
        {
          name: "Add to cart",
          onPress(params) {
            addToCart(params);
          },
        },
      ],
      [onViewDetail, addToCart]
    ),
    onViewDetail,
    FlatList,
    Product: useMemo(() => memo(useProductItem), []),
  };
}
