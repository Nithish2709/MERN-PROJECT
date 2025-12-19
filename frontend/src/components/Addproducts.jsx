import React, { useState } from "react";
import { API } from "../utils/api";

export default function AddProducts() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "", // ADD HERE: Category field
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name: form.name,
      price: form.price,
      img: form.image,
      description: form.description,
      category: form.category, // ADD HERE: Include category
    };

    try {
      const res = await fetch(`${API}/api/postProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("Product added successfully");
        setForm({
          name: "",
          price: "",
          image: "",
          description: "",
          category: "", // ADD HERE: Reset category
        });
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-page">
      <header className="add-product-header">
        <h2 className="add-product-title">Add Product</h2>
        <p className="add-product-subtitle">
          Fill in the details below to add a new product to your store.
        </p>
      </header>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="e.g. Electronics, Kitchen, Fashion"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary add-product-submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
