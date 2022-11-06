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
    console.log(item)
    const updatedCartItems = cartItems.map(product => {
      if(product.name === item.name && product.selected_size === item.selected_size) {
        return {
          ...product,
          quantity: product.quantity + 1
        }
      } else {
        return product;
      }
    });
    setCartItems(updatedCartItems);
  }
  
  function removeItemFromCart(item: ICartData) {
    // const updatedCartItems = cartItems.map(product => {
    //   if(product.name === item.name && product.selected_size === item.selected_size && product.quantity > 1) {
    //     return {
    //       ...product,
    //       quantity: product.quantity - 1
    //     }
    //   } 
    //   if(product.quantity === 1) {

    //   }
    // });
    // setCartItems(updatedCartItems);
  }

  

  useEffect(() => {
    
  }, [cartItems])

  return (
    <GlobalCartContext.Provider
      value={{
        cartItems,
        addItemToCart
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