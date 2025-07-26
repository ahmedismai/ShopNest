import { createContext, useEffect, useState } from 'react';
import {
  GetAllCart,
  addProductToCart,
  deleteCartItem,
  updateProductCart
} from '../lib/api';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [number, setnumber] = useState(null);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const carts = await GetAllCart();
      const cart = carts[0];
      if (cart?.id) {
        setCartId(cart.id);
        setCartItems(cart.products || []);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const payload = {
        userId: 1,
        products: [{ productId, quantity }]
      };
      const cart = await addProductToCart(payload);
      setCartItems(cart.products);
      setCartId(cart.id);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateProductCartHandler = async (productId, newQuantity) => {
    try {
      const updatedProducts = cartItems.map((item) =>
        item.productId === productId
          ? { productId, quantity: newQuantity }
          : item
      );

      const payload = {
        id: cartId,
        userId: 1,
        products: updatedProducts,
      };

      const updated = await updateProductCart(payload);
      setCartItems(updated.products);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const deleteCartItemHandler = async (productId) => {
    try {
      const filtered = cartItems.filter(item => item.productId !== productId);
      const payload = {
        id: cartId,
        userId: 1,
        products: filtered,
      };

      const updated = await updateProductCart(payload);
      setCartItems(updated.products);
    } catch (err) {
      console.error("Error deleting item from cart:", err);
    }
  };

  const deleteAllItemHandler = async () => {
    await deleteCartItem(cartId);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        fetchCart,
        addToCart,
        updateProductCart: updateProductCartHandler,
        deleteCartItem: deleteCartItemHandler,
        deleteAllItem: deleteAllItemHandler,
        setnumber,
        number,
        setCartId,
        cartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
