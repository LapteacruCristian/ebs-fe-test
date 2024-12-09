import React from "react";
import { useCart } from "../context/ShoppingCartContext";
import CartItem from "../components/ShoppingCartItem";

const ShoppingCart: React.FC = () => {
  const { cartItems, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-header">
        <h1>Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="shopping-cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
            </tbody>
          </table>

          <div className="shopping-cart-summary">
            <h2>Total: ${total}</h2>
            <button onClick={clearCart} className="shopping-cart-clear">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
