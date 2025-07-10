import { createContext } from "react";
import { useState, useEffect } from "react";
import raw_all_product from "./all_products";

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  new_price: number;
  old_price: number;
  quantity?: number;
  price: number;
  size?: string; // Added size property
};

type ShopContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  all_product: Product[];
  cartItems: Product[];
  addToCart: (
    product: Product,
    quantity: number,
    price: number,
    size: string
  ) => void;
  removeFromCart: (productId: number, size?: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateSize: (productId: number, size: string) => void;
  getUnitPrice: (product: Product, size?: string) => number;
  selectedCrypto: string;
  setSelectedCrypto: (value: string) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const all_product: Product[] = raw_all_product.map((item: any) => ({
  ...item,
  price: item.new_price, // or whatever logic you want for price
}));

const ShopProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });
  const contextValue = { all_product };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getUnitPrice = (product: Product, size: string = "s") => {
    let unitPrice = product.new_price;
    if (size === "m") unitPrice += 5000;
    if (size === "l") unitPrice += 10000;
    if (size === "xl") unitPrice += 15000;
    if (size === "xxl") unitPrice += 20000;
    return unitPrice;
  };

  const addToCart = (
    product: Product,
    quantity: number,
    _: number,
    size: string = "s"
  ) => {
    const unitPrice = getUnitPrice(product, size);

    const newItem: Product = {
      ...product,
      quantity,
      size,
      price: unitPrice * quantity,
    };

    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existing) {
        const updatedQuantity = (existing.quantity ?? 1) + quantity;
        return prevItems.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? {
                ...item,
                quantity: updatedQuantity,
                price: unitPrice * updatedQuantity,
              }
            : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: any, size?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const clearCart = () => setCartItems([] as Product[]);

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.size) {
          const unitPrice = getUnitPrice(item, item.size);
          return {
            ...item,
            quantity,
            price: unitPrice * quantity,
          };
        }
        return item;
      })
    );
  };
  const updateSize = (productId: number, newSize: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, size: newSize } : item
      )
    );
  };

  const [selectedCrypto, setSelectedCrypto] = useState("btc");


  return (
    <ShopContext.Provider
      value={{
        darkMode,
        setDarkMode,
        ...contextValue,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        updateSize,
        getUnitPrice,
        selectedCrypto, 
        setSelectedCrypto,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopProvider, ShopContext };
