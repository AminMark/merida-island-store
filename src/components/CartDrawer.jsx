import Minus from "lucide-react/dist/esm/icons/minus.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.js";
import X from "lucide-react/dist/esm/icons/x.js";
import React, { useMemo, useState } from "react";
import { buildWhatsAppMessage, createWhatsAppUrl } from "../lib/whatsapp";

const emptyCustomer = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onRemove,
  onQuantityChange,
}) {
  const [customer, setCustomer] = useState(emptyCustomer);
  const [error, setError] = useState("");

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  function updateCustomer(field, value) {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value,
    }));
  }

  function handleCheckout(event) {
    event.preventDefault();

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim()) {
      setError("Please add your name and phone number.");
      return;
    }

    setError("");
    const message = buildWhatsAppMessage({
      customer,
      items: cartItems,
      total: subtotal,
    });
    window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  function handleBackToShopping() {
    onClose();
    window.setTimeout(() => {
      document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
    }, 180);
  }

  return (
    <div className={`cart-layer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <button
        className="cart-backdrop"
        type="button"
        aria-label="Close cart"
        onClick={onClose}
      />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="drawer-header">
          <div>
            <p className="section-eyebrow">Your Order</p>
            <h2>Cart</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close cart" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.imageUrl} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="cart-row">
                    <div className="quantity-control small">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="remove-button"
                      type="button"
                      onClick={() => onRemove(item.id)}
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-cart">Your cart is waiting for something beautiful.</p>
          )}
        </div>

        <form className="checkout-form" onSubmit={handleCheckout}>
          <div className="subtotal-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <label>
            Name
            <input
              value={customer.name}
              onChange={(event) => updateCustomer("name", event.target.value)}
              placeholder="Your full name"
              required
            />
          </label>
          <label>
            Phone
            <input
              value={customer.phone}
              onChange={(event) => updateCustomer("phone", event.target.value)}
              placeholder="+20..."
              required
            />
          </label>
          <label>
            Address
            <textarea
              value={customer.address}
              onChange={(event) => updateCustomer("address", event.target.value)}
              placeholder="Delivery address"
              rows="3"
            />
          </label>
          <label>
            Notes
            <textarea
              value={customer.notes}
              onChange={(event) => updateCustomer("notes", event.target.value)}
              placeholder="Shade preference, delivery notes..."
              rows="3"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button checkout-button" type="submit">
            Send Order on WhatsApp
          </button>
          <button
            className="secondary-button checkout-button"
            type="button"
            onClick={handleBackToShopping}
          >
            Back to Shopping
          </button>
        </form>
      </aside>
    </div>
  );
}
