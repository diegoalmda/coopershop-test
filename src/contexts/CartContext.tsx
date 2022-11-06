import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ICartData, ICartItem } from '../types/DataType';

type CartContextType  = {
  cartItems: ICartData[];
  addItemToCart: (item: ICartItem) => void;
  removeItemFromCart: (item: ICartItem) => void;
}

const GlobalCartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode
}

function GlobalCartContextProvider({
  children,
}: CartContextProviderProps) {
  
  const [cartItems, setCartItems] = useState<ICartData[]>([]);

  function addItemToCart(item: ICartItem) {    
    const indexItemMatched = 
      cartItems.findIndex(product => (product.name === item.name && product.selected_size === item.selected_size));

    if (indexItemMatched !== -1) {
      let auxItems = [...cartItems];
      auxItems[indexItemMatched].quantity = cartItems[indexItemMatched].quantity + 1; 
      setCartItems(auxItems);
    } else {
      let auxItems = [...cartItems];
      auxItems.push({
        ...item,
        quantity: 1
      });
      setCartItems(auxItems);
    }    
  }
  
  function removeItemFromCart(item: ICartItem) {
    const indexItemMatched = 
      cartItems.findIndex(product => (product.name === item.name && product.selected_size === item.selected_size));

    if (indexItemMatched !== -1 && cartItems[indexItemMatched].quantity > 1) {
      let auxItems = [...cartItems];
      auxItems[indexItemMatched].quantity = cartItems[indexItemMatched].quantity - 1; 
      setCartItems(auxItems);
    } else {
      let auxItems = [...cartItems];
      auxItems.splice(indexItemMatched, 1);
      setCartItems(auxItems);
    }
  }  

  useEffect(() => {
    
  }, [cartItems])

  return (
    <GlobalCartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart
      }}
    >
      {children}
    </GlobalCartContext.Provider>
  )
}

function useCartContext() {
  const context = useContext(GlobalCartContext);

  return context;
}

export { GlobalCartContextProvider, useCartContext};