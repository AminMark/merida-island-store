# Merida Island — Endless Beauty

A polished React + Vite ecommerce landing page for a luxury cosmetics brand. The storefront includes a product catalogue, cart drawer, customer checkout fields, and WhatsApp Business order handoff. The `/admin` page lets you manage products in localStorage without a backend.

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Change Brand, WhatsApp Number, or Admin Password

Edit [src/config.js](/Users/mohamedamin/Documents/New%20project/src/config.js):

```js
export const config = {
  brandName: "Merida Island",
  brandTagline: "Endless Beauty",
  whatsappNumber: "+201000000000",
  adminPassword: "admin123",
};
```

The WhatsApp number is converted automatically into a `wa.me` checkout link.

## Admin Page

Go to:

```text
/admin
```

Use the temporary password:

```text
admin123
```

From the admin page you can add, edit, delete, mark best sellers, and toggle product stock status. Product data is saved in the browser with localStorage, so it works without a backend. When you add a backend later, replace the localStorage helper functions in [src/lib/products.js](/Users/mohamedamin/Documents/New%20project/src/lib/products.js) with API/database calls.

## Add Products

1. Open `/admin`.
2. Sign in with the temporary password.
3. Fill in product name, category, description, price, image URL, stock status, and best seller status.
4. Click `Add Product`.

Use local image paths like `/products/radiance-serum.svg`, or use a hosted image URL.

## Deploy on Vercel

1. Push this project to GitHub.
2. Create a new Vercel project from the repository.
3. Vercel should detect Vite automatically.
4. Use these settings if needed:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy.

The included [vercel.json](/Users/mohamedamin/Documents/New%20project/vercel.json) rewrites `/admin` and other routes back to the Vite app.

