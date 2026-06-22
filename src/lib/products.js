import { defaultProducts } from "../data/defaultProducts";

const PRODUCTS_KEY = "merida_products";

export function loadProducts() {
  try {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);
    if (!savedProducts) {
      saveProducts(defaultProducts);
      return defaultProducts;
    }

    const parsedProducts = JSON.parse(savedProducts);
    if (!Array.isArray(parsedProducts)) {
      return defaultProducts;
    }

    const defaultById = new Map(defaultProducts.map((product) => [product.id, product]));
    return parsedProducts.map((product) => {
      const defaultProduct = defaultById.get(product.id);
      return defaultProduct
        ? {
            ...product,
            imageUrl: defaultProduct.imageUrl,
            inStock: defaultProduct.inStock,
          }
        : product;
    });
  } catch {
    return defaultProducts;
  }
}

export function saveProducts(products) {
  // Replace this localStorage write with a database/API call when a backend is added.
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function createProductId(name) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "product"}-${Date.now()}`;
}
