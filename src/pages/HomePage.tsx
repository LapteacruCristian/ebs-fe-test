import React, { useEffect, useState } from "react";
import { useCart } from "../context/ShoppingCartContext";
import ItemCart from "../components/ItemCard";

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
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortType, setSortType] = useState<string>("asc");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {addToCart} = useCart();
  const {removeFromCart} = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setItems(data);
        setFilteredItems(data); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = await response.json();
        setCategories(["all", ...data]);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory === "all" ? [...items] : items.filter((item) => item.category === selectedCategory);

    const sorted = filtered.sort((a, b) => sortType === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredItems(sorted);
  }, [items, selectedCategory, sortType]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  
  return(
    <div>
    <div className="filter-sort-container">
        <div className="filter-options-container">
        <p>Filter by Category:</p>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
        </div>
        <div className="sort-options-container">
        <p>Sort by Price:</p>
        <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
            <option value="asc">low to high</option>
            <option value="desc">high to low</option>
        </select>
        </div>
    </div>

    <div className="item-grid">
        {filteredItems.map((item) => (
            <ItemCart
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            category={item.category}
            image={item.image}
            addToCart = {() => addToCart(item)}
            removeFromCart = {() => removeFromCart(item.id)}
            ></ItemCart>
        ))}
    </div>
    </div>
);
};

export default HomePage;
