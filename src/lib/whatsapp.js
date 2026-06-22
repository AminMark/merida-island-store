import { config } from "../config";

export function buildWhatsAppMessage({ customer, items, total }) {
  const lines = [
    `New Order - ${config.brandName} ${config.brandTagline}`,
    "",
    "Customer:",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address || "Not provided"}`,
    "",
    "Order:",
    "",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.name} x${item.quantity} - $${item.price.toFixed(2)} each`
    ),
    "",
    `Total: $${total.toFixed(2)}`,
    "",
    "Notes:",
    customer.notes || "No notes",
  ];

  return lines.join("\n");
}

export function createWhatsAppUrl(message) {
  const cleanNumber = config.whatsappNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

