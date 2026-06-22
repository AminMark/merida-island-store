import React from "react";

const reviews = [
  {
    name: "Nour A.",
    text: "The Radiance Serum feels refined and light. My skin looks soft without feeling shiny.",
  },
  {
    name: "Mariam H.",
    text: "Everything from the texture to the packaging feels elegant. The cream is my daily favorite.",
  },
  {
    name: "Lina S.",
    text: "Gentle, polished, and beautiful on sensitive skin. It feels like a proper luxury ritual.",
  },
];

export function Reviews() {
  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-eyebrow">Reviews</p>
          <h2 id="reviews-title">A Softer Kind of Luxury</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars" aria-label="5 stars">
                ★★★★★
              </div>
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
