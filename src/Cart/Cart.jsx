import React, { useContext, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import LoadingPage from '../Components/LoadingPage/LoadingPage';
import { toast } from 'react-hot-toast';
import { CartContext } from '../Context/cartContext';

export default function Cart() {
  const {
    fetchCart,
    addToCart,
    updateProductCart,
    deleteCartItem,
    deleteAllItem,
    setnumber,
    number,
    setCartId,
    cartItems
  } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    setnumber(cartItems.length);
  }, [cartItems]);

  const handleDelete = (productId) => {
    deleteCartItem(productId);
    toast.success("Product removed from cart");
  };

  const handleQuantityChange = (product, type) => {
    let newQty = product.quantity;
    if (type === 'inc') newQty += 1;
    else if (type === 'dec') newQty -= 1;
  
    if (newQty < 1) {
      deleteCartItem(product.productId);
      toast.success("Product removed from cart");
    } else {
      updateProductCart(product.productId, newQty);
      toast.success("Quantity updated");
    }
  };

  if (!cartItems) return <LoadingPage />;

  return (
    <div className="container mx-auto px-6 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

      {cartItems?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((product) => (
            <div
              key={product?.productId}
              className="bg-white p-4 rounded-xl shadow-md md:flex items-center gap-4 justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">Product ID: {product.productId}</h3>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(product, 'dec')}
                  className="px-3 py-1 bg-transparent border border-blue-500 text-gray-800 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-transparent">{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product, 'inc')}
                  className="px-3 py-1 bg-transparent border border-blue-500 text-gray-800 rounded-r"
                >
                  +
                </button>

                <button
                  onClick={() => handleDelete(product.productId)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-red-800 text-3xl font-bold my-8">No Items In Cart</h2>
      )}
    </div>
  );
}
