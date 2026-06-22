import React, { useEffect, useState } from "react";
import { compressProductImage } from "../lib/imageCompression";
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
  const [imageMessage, setImageMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    setForm(editingProduct || emptyForm);
    setImageMessage(editingProduct?.imageUrl ? "Current product image" : "");
    setImageError("");
    setIsCompressing(false);
  }, [editingProduct]);

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageError("");
    setImageMessage("Optimizing image...");
    setIsCompressing(true);

    try {
      const optimizedImage = await compressProductImage(file);
      updateField("imageUrl", optimizedImage.dataUrl);
      setImageMessage(`Optimized: ${optimizedImage.summary}`);
    } catch (error) {
      setImageError(error.message);
      setImageMessage("");
    } finally {
      setIsCompressing(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.imageUrl) {
      setImageError("Please upload a product photo.");
      return;
    }

    onSave({
      ...form,
      id: form.id || createProductId(form.name),
      price: Number(form.price),
      imageUrl: form.imageUrl,
    });
    setForm(emptyForm);
    setImageMessage("");
    setImageError("");
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
      <label className="image-upload-field">
        Product photo
        <span className="upload-dropzone">
          <strong>{form.imageUrl ? "Replace image" : "Upload image"}</strong>
          <small>Compressed automatically for faster web loading</small>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required={!form.imageUrl}
          />
        </span>
      </label>
      {form.imageUrl && (
        <div className="image-preview">
          <img src={form.imageUrl} alt="Product preview" />
          <span>{imageMessage || "Ready to save"}</span>
        </div>
      )}
      {imageMessage && !form.imageUrl && (
        <p className="form-note" aria-live="polite">
          {imageMessage}
        </p>
      )}
      {imageError && (
        <p className="form-error" aria-live="polite">
          {imageError}
        </p>
      )}
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
        <button className="primary-button" type="submit" disabled={isCompressing}>
          {isCompressing
            ? "Optimizing..."
            : editingProduct
              ? "Save Product"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}
