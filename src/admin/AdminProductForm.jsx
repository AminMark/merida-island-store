import React, { useEffect, useState } from "react";
import { createProductId } from "../lib/products";

const emptyForm = {
  name: "",
  category: "",
  description: "",
  price: "",
  imageUrl: "",
  inStock: true,
  bestSeller: false,
};

export function AdminProductForm({ editingProduct, onCancel, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editingProduct || emptyForm);
  }, [editingProduct]);

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      ...form,
      id: form.id || createProductId(form.name),
      price: Number(form.price),
      imageUrl: form.imageUrl || "/products/radiance-serum.svg",
    });
    setForm(emptyForm);
  }

  return (
    <form className="admin-card product-form" onSubmit={handleSubmit}>
      <div>
        <p className="section-eyebrow">
          {editingProduct ? "Edit Product" : "Add Product"}
        </p>
        <h2>{editingProduct ? editingProduct.name : "New cosmetic item"}</h2>
      </div>

      <label>
        Product name
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
        />
      </label>
      <label>
        Category
        <input
          value={form.category}
          onChange={(event) => updateField("category", event.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          rows="4"
          required
        />
      </label>
      <div className="form-grid">
        <label>
          Price
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
            required
          />
        </label>
        <label>
          Stock status
          <select
            value={form.inStock ? "in" : "out"}
            onChange={(event) => updateField("inStock", event.target.value === "in")}
          >
            <option value="in">In Stock</option>
            <option value="out">Sold Out</option>
          </select>
        </label>
      </div>
      <label>
        Image URL
        <input
          value={form.imageUrl}
          onChange={(event) => updateField("imageUrl", event.target.value)}
          placeholder="/products/radiance-serum.svg"
        />
      </label>
      <label className="check-row">
        <input
          type="checkbox"
          checked={form.bestSeller}
          onChange={(event) => updateField("bestSeller", event.target.checked)}
        />
        Best Seller
      </label>
      <div className="form-actions">
        {editingProduct && (
          <button className="ghost-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="primary-button" type="submit">
          {editingProduct ? "Save Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
