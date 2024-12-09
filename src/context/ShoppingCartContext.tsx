import React, { createContext, ReactNode, useContext, useState } from "react";

interface CartItem {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((cartItem)=> cartItem.id === id);
            if(existingItem){
                return  prevCart.filter((item) => item.id !== id);
            }else{
                console.warn(`Item with id ${id} not found in the cart.`);
                return prevCart;
            }
        });
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((cartItem)=> cartItem.id === id);
            if(existingItem){
                if(quantity <= 0){
                    return  prevCart.filter((item) => item.id !== id);
                }else{
                    return prevCart.map(item => item.id === id ? {... item, quantity}:item);
                }
            }else{
                console.warn(`Item with id ${id} not found in the cart.`);
                return prevCart;
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems: cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};