import Pencil from "lucide-react/dist/esm/icons/pencil.js";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.js";
import React from "react";

export function AdminProductTable({
  products,
  onEdit,
  onDelete,
  onToggleStock,
}) {
  return (
    <section className="admin-card table-card">
      <div className="admin-table-heading">
        <div>
          <p className="section-eyebrow">Catalogue</p>
          <h2>Products</h2>
        </div>
        <span>{products.length} items</span>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Best Seller</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td data-label="Image">
                  <img className="table-thumb" src={product.imageUrl} alt="" />
                </td>
                <td data-label="Name">{product.name}</td>
                <td data-label="Category">{product.category}</td>
                <td data-label="Price">${Number(product.price).toFixed(2)}</td>
                <td data-label="Stock">
                  <button
                    className={`stock-toggle ${product.inStock ? "in" : "out"}`}
                    type="button"
                    onClick={() => onToggleStock(product.id)}
                  >
                    {product.inStock ? "In Stock" : "Sold Out"}
                  </button>
                </td>
                <td data-label="Best Seller">{product.bestSeller ? "Yes" : "No"}</td>
                <td data-label="Actions">
                  <div className="table-actions">
                    <button type="button" onClick={() => onEdit(product)}>
                      <Pencil size={15} /> Edit
                    </button>
                    <button type="button" onClick={() => onDelete(product.id)}>
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
