import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/api";

export default function Products({ setcart, cart }) {
  const [products, setproducts] = useState([]);
  // ADD HERE: State for search and category
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // ADD HERE: Function to fetch products with filters
  const fetchProducts = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    fetch(`${API}/api/Product?${params}`)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]); // ADD HERE: Re-fetch when search or category changes

  const addTocart = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    setcart([...cart, item]);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const res = await fetch(
      `${API}/api/deleteProduct/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.status === 200) {
      alert("Product deleted successfully");
      setproducts(products.filter((product) => product._id !== id));
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <div>
          <h2 className="products-title">Products</h2>
          <p className="products-subtitle">
            Browse all available items, add them to your cart, or manage your
            catalog.
          </p>
        </div>
        <p className="products-counter">
          Total products: <span>{products.length}</span>
        </p>
      </header>

      {/* ADD HERE: Search and Filter Controls */}
      <div className="products-filters" style={{marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{minWidth: '200px', flex: '1'}}
        />
        <input
          type="text"
          placeholder="Enter category (e.g. Electronics, Kitchen)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
          style={{minWidth: '200px', flex: '1'}}
        />
        {(search || category) && (
          <button
            onClick={() => {setSearch(''); setCategory('');}}
            className="btn btn-outline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="products-empty">
          <p>No products found.</p>
          <p>Add a new product from the “Add Product” page to get started.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <article
              key={p._id || p.id}
              className="product-card"
            >
              <div className="product-image-wrapper">
                <img
                  src={p.image}
                  alt={p.name}
                  className="product-image"
                />
              </div>

              <div className="product-body">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">
                  ₹ {Number(p.price).toLocaleString("en-IN")}
                </p>
                <p className="product-description">
                  {p.description || "No description available."}
                </p>
              </div>

              <div className="product-actions">
                <button
                  onClick={() => addTocart(p)}
                  className="btn btn-primary btn-sm"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${p._id}`}
                  className="btn btn-ghost btn-sm"
                >
                  View
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
