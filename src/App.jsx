import React, { useMemo, useState } from "react";
import { Benefits } from "./components/Benefits";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { Reviews } from "./components/Reviews";

export function App({ products }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  function addToCart(product, quantity) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          imageUrl: product.imageUrl,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <Benefits />
        <ProductGrid
          id="products"
          eyebrow="Best Sellers"
          title="Loved by Glowing Skin Everywhere"
          products={products}
          onAddToCart={addToCart}
        />
        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="section-shell about-layout">
            <div>
              <p className="section-eyebrow">About Merida Island</p>
              <h2 id="about-title">Endless beauty, refined for every day.</h2>
            </div>
            <p>
              Merida Island Endless Beauty brings refined cosmetic essentials
              designed for everyday confidence, natural radiance, and timeless
              beauty.
            </p>
          </div>
        </section>
        <Reviews />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onQuantityChange={updateCartQuantity}
      />
    </>
  );
}
