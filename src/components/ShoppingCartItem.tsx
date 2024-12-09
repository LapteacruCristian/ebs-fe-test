import React from "react";
import { useCart } from "../context/ShoppingCartContext";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, image, category, price, quantity }) => {
  const { updateItemQuantity, removeFromCart } = useCart();

  return (
    <tr>
      <td>
        <img src={image} alt={title} className="shopping-cart-item-image" />
      </td>
      <td>{title}</td>
      <td>{category}</td>
      <td>${price}</td>

      <td className="shopping-cart-quantity">
        <button onClick={() => updateItemQuantity(id, quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => updateItemQuantity(id, quantity + 1)}>+</button>
      </td>

      <td>
        <span
          onClick={() => removeFromCart(id)}
          className="shopping-cart-remove"
          role="button"
        >
          x
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
