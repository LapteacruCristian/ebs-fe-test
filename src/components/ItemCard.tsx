import React from "react";

interface ItemCardProps{
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    addToCart: () => void;
    removeFromCart: ()=> void;
}

const ItemCard: React.FC<ItemCardProps> = ({title, price, category, image, addToCart, removeFromCart}) => {
    return(
        <div className="item-card">
            <img src={image} alt={title}/>
            <h3>{title}</h3>
            <p className="category">{category}</p>
            <p>${price}</p>
            <div className="item-card-btn">
                <button onClick={addToCart}>Add</button>
                <button onClick={removeFromCart}>Remove</button>
            </div>
        </div>
    );
}

export default ItemCard;