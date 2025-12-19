import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/api";

export default function Home({ setcart, cart }) {
  // ADD HERE: State for products and filters
  const [newProducts, setNewProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ADD HERE: Fetch functions
  const fetchNewProducts = () => {
    fetch(`${API}/api/Product?type=new`)
      .then(res => res.json())
      .then(data => setNewProducts(data.slice(0, 4))); // Show only 4 products
  };

  const fetchTrendingProducts = () => {
    fetch(`${API}/api/Product?type=trending`)
      .then(res => res.json())
      .then(data => setTrendingProducts(data.slice(0, 4))); // Show only 4 products
  };

  const fetchFilteredProducts = () => {
    if (!search && !category) {
      setFilteredProducts([]);
      return;
    }
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    fetch(`${API}/api/Product?${params}`)
      .then(res => res.json())
      .then(data => setFilteredProducts(data));
  };

  // ADD HERE: Add to cart function
  const addTocart = (product) => {
    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.img,
    };
    setcart([...cart, item]);
  };

  useEffect(() => {
    fetchNewProducts();
    fetchTrendingProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [search, category]);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-kicker">Modern React Storefront</p>
          <h1 className="home-title">
            Manage products, protect your cart, and shop with a clean interface.
          </h1>
          <p className="home-subtitle">
            Add items, review details, and complete purchases with a minimal,
            responsive UI powered by React Router and local authentication.
          </p>

          <div className="home-actions">
            <Link to="/products" className="btn btn-primary">
              Browse products
            </Link>
            <Link to="/addproduct" className="btn btn-ghost">
              Add a new product
            </Link>
          </div>
        </div>

        <div className="home-hero-panel">
          <div className="home-stat">
            <span className="home-stat-label">Cart protection</span>
            <span className="home-stat-value">ProtectedRoute</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-label">Storage</span>
            <span className="home-stat-value">localStorage cart</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-label">API endpoint</span>
            <span className="home-stat-value">/api/Product</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="home-section">
        <div className="products-header">
          <div>
            <h2 className="products-title">Search & Filter</h2>
            <p className="products-subtitle">Find products by name or category</p>
          </div>
        </div>
        
        <div className="home-filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Enter category (e.g. Electronics)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          />
          {(search || category) && (
            <button
              onClick={() => {setSearch(''); setCategory('');}}
              className="btn btn-outline"
            >
              Clear
            </button>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <article key={p._id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={p.img} alt={p.name} className="product-image" />
                </div>
                <div className="product-body">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">₹ {Number(p.price).toLocaleString("en-IN")}</p>
                  <p className="product-description">{p.description}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => addTocart(p)} className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                  <Link to={`/product/${p._id}`} className="btn btn-ghost btn-sm">
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newly Added Products Section */}
      <section className="home-section">
        <div className="products-header">
          <div>
            <h2 className="products-title">Newly Added Products</h2>
            <p className="products-subtitle">Latest products in our catalog</p>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">View All</Link>
        </div>
        
        {newProducts.length > 0 ? (
          <div className="products-grid">
            {newProducts.map((p) => (
              <article key={p._id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={p.img} alt={p.name} className="product-image" />
                </div>
                <div className="product-body">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">₹ {Number(p.price).toLocaleString("en-IN")}</p>
                  <p className="product-description">{p.description}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => addTocart(p)} className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                  <Link to={`/product/${p._id}`} className="btn btn-ghost btn-sm">
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="products-empty">
            <p>No new products available.</p>
          </div>
        )}
      </section>

      {/* Trending Products Section */}
      <section className="home-section">
        <div className="products-header">
          <div>
            <h2 className="products-title">Trending Products</h2>
            <p className="products-subtitle">Popular items based on views and activity</p>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">View All</Link>
        </div>
        
        {trendingProducts.length > 0 ? (
          <div className="products-grid">
            {trendingProducts.map((p) => (
              <article key={p._id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={p.img} alt={p.name} className="product-image" />
                </div>
                <div className="product-body">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">₹ {Number(p.price).toLocaleString("en-IN")}</p>
                  <p className="product-description">{p.description}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => addTocart(p)} className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                  <Link to={`/product/${p._id}`} className="btn btn-ghost btn-sm">
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="products-empty">
            <p>No trending products available.</p>
          </div>
        )}
      </section>
    </div>
  );
}
