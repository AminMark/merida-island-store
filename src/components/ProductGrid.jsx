import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  id,
  eyebrow,
  title,
  products,
  onAddToCart,
  compact = false,
}) {
  if (!products.length) {
    return null;
  }

  return (
    <section className={`product-section ${compact ? "compact" : ""}`} id={id}>
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
