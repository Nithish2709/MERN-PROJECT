import About from "./components/About";
import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import Product from "./components/product";
import Home from "./components/Home";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/protectedRoute";
import AddProduct from "./components/Addproducts";

function App() {
  const [cart, setcart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("email"))
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const lagout = () => {
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  return (
   
      <div className="app-root">
        <header className="app-header">
          <div className="header-inner">
            <h1 className="app-logo">My App</h1>

            <nav className="main-nav">
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact Us
                </Link>
                <Link to="/products" className="nav-link">
                  Products
                </Link>
                <Link to="/cart" className="nav-link nav-cart">
                  <span>Cart</span>
                  <span className="cart-badge">{cart.length}</span>
                </Link>
                <Link to="/addproduct" className="nav-link">
                  Add Product
                </Link>
              </div>

              <div className="nav-auth">
                {isLoggedIn ? (
                  <button onClick={lagout} className="btn btn-outline">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <div className="app-main-inner">
            <Routes>
              <Route path="/" element={<Home cart={cart} setcart={setcart} />}>
                Home
              </Route>
              <Route path="/about" element={<About />}>
                About
              </Route>
              <Route path="/contact" element={<Contact />}>
                Contact
              </Route>
              <Route
                path="/products"
                element={<Products cart={cart} setcart={setcart} />}
              >
                Products
              </Route>
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart cart={cart} setcart={setcart} />
                  </ProtectedRoute>
                }
              />
              <Route path="/buynow/:id" element={<BuyNow />} />
              <Route
                path="/login"
                element={<Login onLogin={() => setIsLoggedIn(true)} />}
              />
              <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-inner">
            <p className="footer-title">My App Storefront</p>
            <p className="footer-text">
              Modern demo e‑commerce React application with protected cart,
              product management, and clean navigation.
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} My App. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
   
  );
}

export default App;
