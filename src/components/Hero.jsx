import Leaf from "lucide-react/dist/esm/icons/leaf.js";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check.js";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import React, { useEffect, useState } from "react";

const heroSlides = [
  {
    src: "/hero-slides/slide-01.png",
    alt: "Orange facial spray bottle on turquoise water",
  },
  {
    src: "/hero-slides/slide-02.png",
    alt: "Pink powder compact on a clean white background",
  },
  {
    src: "/hero-slides/slide-03.png",
    alt: "Glossy lip tint collection in warm pink shades",
  },
  {
    src: "/hero-slides/slide-04.png",
    alt: "Foundation applicators with product texture swatch",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <p className="section-eyebrow">Merida Island — Endless Beauty</p>
        <h1>
          Beauty That
          <span>Never Ends</span>
        </h1>
        <p className="hero-subtitle">
          Luxury cosmetics crafted to enhance your natural glow.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#products">
            Shop Best Sellers
          </a>
          <a className="secondary-button" href="#products">
            Discover The Routine
          </a>
        </div>
        <div className="trust-badges" aria-label="Product promises">
          <span>
            <Leaf size={17} /> Clean Ingredients
          </span>
          <span>
            <ShieldCheck size={17} /> Dermatologist Tested
          </span>
          <span>
            <Sparkles size={17} /> Cruelty-Free
          </span>
        </div>
      </div>
      <div className="hero-visual" aria-label="Merida Island cosmetics display">
        <div className="hero-slider" aria-live="polite">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.src}
              className={`hero-products-image ${index === activeSlide ? "is-active" : ""}`}
              src={slide.src}
              alt={slide.alt}
            />
          ))}
        </div>
        <div className="hero-dots" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <span
              key={slide.src}
              className={index === activeSlide ? "is-active" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
