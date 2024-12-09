import React from "react";
import {Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header">
      <h1>Product Catalog</h1>
      <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
      </nav>
    </header>
    );
};

export default Header;