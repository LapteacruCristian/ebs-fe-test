import "./styles.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App: React.FC = () => (
  <Router>
    <div className="app-container">
    <Header/>
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<ShoppingCartPage/>}/>    
      </Routes>
    </main>
    <Footer/>
    </div>
  </Router>
);

export default App;
