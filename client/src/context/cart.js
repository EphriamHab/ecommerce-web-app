import { useState, useContext, createContext, useEffect } from "react";
const CartContext = createContext()


const Cartprovider = ({children}) =>{
    const [cart,setCart]= useState([]);

    useEffect(()=>{
      let existingCartItem = localStorage.getItem('cart')
      if (existingCartItem && Array.isArray(JSON.parse(existingCartItem))) {
        setCart(JSON.parse(existingCartItem));
      }
    },[])
    const clearCart = () => {
      setCart([]); 
      localStorage.removeItem('cart');
    
    };
    return(
        <CartContext.Provider value={[cart,setCart, clearCart]}>
           {children} 
        </CartContext.Provider>
    )
}

//custom hook

const useCart = ()=>useContext(CartContext)

export {useCart, Cartprovider}