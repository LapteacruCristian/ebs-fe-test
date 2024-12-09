import React, { useEffect, useState } from "react";
import { useCart } from "../context/ShoppingCartContext";
import ItemCard from "../components/ItemCard";

interface Item {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

const HomePage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const {addToCart} = useCart();
    const {removeFromCart} = useCart();

    useEffect(() =>{
        const fetchItems = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setItems(data);
        };
        fetchItems();
    }, []);

    return(
        <div className="item-grid">
            {items.map((item) => (
                <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                image={item.image}
                addToCart = {() => addToCart(item)}
                removeFromCart = {() => removeFromCart(item.id)}
                ></ItemCard>
            ))}
        </div>
    );
};

export default HomePage;
