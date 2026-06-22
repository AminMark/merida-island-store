import Droplet from "lucide-react/dist/esm/icons/droplet.js";
import Leaf from "lucide-react/dist/esm/icons/leaf.js";
import Rabbit from "lucide-react/dist/esm/icons/rabbit.js";
import Smile from "lucide-react/dist/esm/icons/smile.js";
import React from "react";

const benefits = [
  {
    icon: Droplet,
    title: "Hydrating Formula",
    text: "Deep hydration for soft, smooth skin.",
  },
  {
    icon: Leaf,
    title: "Clean Ingredients",
    text: "Safe, effective and non-toxic.",
  },
  {
    icon: Smile,
    title: "Sensitive Skin Friendly",
    text: "Gentle care for every skin type.",
  },
  {
    icon: Rabbit,
    title: "Cruelty-Free",
    text: "Beauty without compromise.",
  },
];

export function Benefits() {
  return (
    <section className="benefits-strip" id="benefits" aria-label="Benefits">
      {benefits.map(({ icon: Icon, title, text }) => (
        <article className="benefit-card" key={title}>
          <Icon size={34} />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
