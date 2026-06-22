import Instagram from "lucide-react/dist/esm/icons/instagram.js";
import React from "react";
import { config } from "../config";

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid">
        <div>
          <a className="brand-mark footer-brand" href="/">
            <img src={config.footerLogoPath} alt="Merida Island logo" />
            <span>
              {config.brandName}
              <small>{config.brandTagline}</small>
            </span>
          </a>
          <p>
            Refined cosmetic essentials for everyday confidence, natural
            radiance, and timeless beauty.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="#products">Products</a>
          <a href="#products">Best Sellers</a>
          <a href="#about">About</a>
          <a href="/admin">Admin</a>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={`https://wa.me/${config.whatsappNumber.replace(/[^\d]/g, "")}`}>
            WhatsApp {config.whatsappNumber}
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Merida Island Endless Beauty.</span>
      </div>
    </footer>
  );
}
