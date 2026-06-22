import React, { useState } from "react";
import { config } from "../config";
import { AdminLogin } from "./AdminLogin";
import { AdminProductForm } from "./AdminProductForm";
import { AdminProductTable } from "./AdminProductTable";

const SESSION_KEY = "merida_admin_session";

export function AdminPage({ products, setProducts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(SESSION_KEY) === "true"
  );
  const [editingProduct, setEditingProduct] = useState(null);

  function handleLogin(password) {
    if (password !== config.adminPassword) {
      return false;
    }

    localStorage.setItem(SESSION_KEY, "true");
    setIsAuthenticated(true);
    return true;
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }

  function saveProduct(product) {
    setProducts((currentProducts) => {
      const productExists = currentProducts.some((item) => item.id === product.id);
      if (productExists) {
        return currentProducts.map((item) =>
          item.id === product.id ? product : item
        );
      }
      return [product, ...currentProducts];
    });
    setEditingProduct(null);
  }

  function deleteProduct(productId) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
    if (editingProduct?.id === productId) {
      setEditingProduct(null);
    }
  }

  function toggleStock(productId) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="section-eyebrow">Merida Island</p>
          <h1>Product Admin</h1>
          <p>Manage the storefront catalogue stored locally in this browser.</p>
        </div>
        <div className="admin-actions">
          <a className="secondary-button" href="/">
            View Store
          </a>
          <button className="ghost-button" type="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <section className="admin-layout">
        <AdminProductForm
          editingProduct={editingProduct}
          onCancel={() => setEditingProduct(null)}
          onSave={saveProduct}
        />
        <AdminProductTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={deleteProduct}
          onToggleStock={toggleStock}
        />
      </section>
    </main>
  );
}
