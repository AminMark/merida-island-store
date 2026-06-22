import Menu from "lucide-react/dist/esm/icons/menu.js";
import Search from "lucide-react/dist/esm/icons/search.js";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag.js";
import UserRound from "lucide-react/dist/esm/icons/user-round.js";
import X from "lucide-react/dist/esm/icons/x.js";
import React, { useState } from "react";
import { config } from "../config";

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "Best Sellers", href: "#products" },
  { label: "Ingredients", href: "#benefits" },
  { label: "Reviews", href: "#reviews" },
  { label: "About Us", href: "#about" },
];

export function Header({ cartCount, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="announcement">Free shipping on orders over $75</div>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand-mark" href="/" aria-label="Merida Island home">
          <img src={config.headerLogoPath} alt="Merida Island logo" />
          <span>
            {config.brandName}
            <small>{config.brandTagline}</small>
          </span>
        </a>

        <div className={`nav-links ${isMenuOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button className="icon-button desktop-icon" type="button" aria-label="Search">
            <Search size={22} />
          </button>
          <button className="icon-button desktop-icon" type="button" aria-label="Account">
            <UserRound size={22} />
          </button>
          <button
            className="cart-button"
            type="button"
            aria-label={`Open cart with ${cartCount} items`}
            onClick={onCartClick}
          >
            <ShoppingBag size={21} />
            <span>{cartCount}</span>
          </button>
          <a className="shop-now-button" href="#products">
            Shop Now
          </a>
        </div>
      </nav>
    </header>
  );
}
