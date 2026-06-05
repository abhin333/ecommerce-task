import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
    brand: [],
    minPrice: "",
    maxPrice: "",
  });
  const [cartCount, setCartCount] = useState(0);

  return (
    <ProductContext.Provider
      value={{
        filters,
        setFilters,
        cartCount, setCartCount
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};