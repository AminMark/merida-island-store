import Minus from "lucide-react/dist/esm/icons/minus.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import React, { useState } from "react";
import { config } from "../config";

const reviewCounts = {
  "radiance-serum": 128,
  "hydrating-cream": 96,
  "gentle-cleanser": 72,
  "eye-renewal-cream": 43,
  "rose-glow-toner": 54,
  "soft-matte-lip-tint": 39,
};

export function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const isSoldOut = !product.inStock;

  function changeQuantity(nextQuantity) {
    setQuantity(Math.max(1, nextQuantity));
  }

  return (
    <article className={`product-card ${isSoldOut ? "is-sold-out" : ""}`}>
      <div className="product-image-wrap">
        {product.bestSeller && <span className="badge best">Best Seller</span>}
        {isSoldOut && <span className="badge sold">Sold Out</span>}
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <img
          className="product-brand-logo"
          src={config.logoPath}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className="product-content">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-rating" aria-label="Five star rating">
            <span>★★★★★</span>
            <small>({reviewCounts[product.id] || 24})</small>
          </div>
        </div>
        <div className="product-meta">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <span className={isSoldOut ? "stock sold-text" : "stock"}>
            {isSoldOut ? "Sold Out" : "In Stock"}
          </span>
        </div>
        <div className="product-actions">
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => changeQuantity(quantity - 1)}
              disabled={isSoldOut}
            >
              <Minus size={15} />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => changeQuantity(quantity + 1)}
              disabled={isSoldOut}
            >
              <Plus size={15} />
            </button>
          </div>
          <button
            className="add-cart-button"
            type="button"
            disabled={isSoldOut}
            onClick={() => onAddToCart(product, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
