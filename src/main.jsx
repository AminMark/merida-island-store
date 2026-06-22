import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AdminPage } from "./admin/AdminPage";
import { loadProducts, saveProducts } from "./lib/products";
import "./styles.css";

function Root() {
  const [products, setProducts] = useState(() => loadProducts());
  const isAdminRoute = window.location.pathname === "/admin";

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const appContext = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products]
  );

  return isAdminRoute ? <AdminPage {...appContext} /> : <App {...appContext} />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

