import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

const Products = () => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [modalOpen, setModalOpen] = useState(false);
const [editProduct, setEditProduct] = useState(null);
const [error, setError] = useState("");

const [formProduct, setFormProduct] = useState({
name: "",
price: "",
description: "",
imageFile: null,
});

const token = localStorage.getItem("adminToken");
const API_URL = import.meta.env.VITE_BACKEND_END_API_URL;

// ================================
// FETCH PRODUCTS
// ================================
const fetchProducts = async () => {
setLoading(true);
setError("");
try {
if (!token) throw new Error("Unauthorized. Please login.");


  const res = await fetch(`${API_URL}/products`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  setProducts(data.data ?? []);
} catch (err) {
  console.error(err);
  setError(err.message);
  setProducts([]);
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchProducts();
}, []);

// ================================
// ADD OR UPDATE PRODUCT
// ================================
const handleSubmit = async (e) => {
e.preventDefault();
setError("");

if (!formProduct.imageFile && !editProduct)
  return setError("Please select an image.");

try {
  const formData = new FormData();
  formData.append("name", formProduct.name);
  formData.append("price", formProduct.price);
  formData.append("description", formProduct.description);
  if (formProduct.imageFile) formData.append("image", formProduct.imageFile);

  const url = editProduct
    ? `${API_URL}/products/${editProduct.id}`
    : `${API_URL}/products`;
  const method = editProduct ? "PATCH" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`, 
    },
    body: formData,
  });

  if (!res.ok)
    throw new Error(editProduct ? "Failed to update product" : "Failed to add product");

  const data = await res.json();

  if (editProduct) {
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? data.product : p))
    );
  } else {
    setProducts((prev) => [data.product, ...prev]);
  }

  setModalOpen(false);
  setEditProduct(null);
  setFormProduct({ name: "", price: "", description: "", imageFile: null });
} catch (err) {
  console.error(err);
  setError(err.message);
}


};

// ================================
// DELETE PRODUCT
// ================================
const handleDelete = async (id) => {
if (!confirm("Are you sure you want to delete this product?")) return;

try {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete product");

  setProducts((prev) => prev.filter((p) => p.id !== id));
} catch (err) {
  console.error(err);
  setError(err.message);
}


};

// ================================
// OPEN EDIT MODAL
// ================================
const handleEdit = (product) => {
setEditProduct(product);
setFormProduct({
name: product.product_name,
price: product.price,
description: product.product_desc,
imageFile: null,
});
setModalOpen(true);
};

return ( <div className="w-full">
{/* Header */} <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"> <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
<button
onClick={() => { setModalOpen(true); setEditProduct(null); }}
className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
> <AiOutlinePlus size={20} />
Add Product </button> </div>


  {/* Error */}
  {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">{error}</div>}

  {/* Loading */}
  {loading && (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  )}

  {/* No products */}
  {!loading && products.length === 0 && (
    <p className="text-center text-gray-500 mt-6">No products found.</p>
  )}

  {/* Products Table */}
  {!loading && products.length > 0 && (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-3">
                <img src={product.product_image} alt={product.product_name} className="w-12 h-12 rounded object-cover" />
              </td>
              <td className="px-4 py-3 text-gray-800">{product.product_name}</td>
              <td className="px-4 py-3 text-gray-800">₦{product.price}</td>
              <td className="px-4 py-3 text-gray-600">{product.product_desc}</td>
              <td className="px-4 py-3 flex gap-3 justify-center text-lg">
                <button onClick={() => handleEdit(product)} className="text-green-600 hover:text-green-800"><AiOutlineEdit /></button>
                <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800"><AiOutlineDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Add/Edit Modal */}
  {modalOpen && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{editProduct ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            value={formProduct.name}
            onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formProduct.price}
            onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <textarea
            placeholder="Description"
            value={formProduct.description}
            onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
            className="border px-3 py-2 rounded w-full resize-none"
            rows={3}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormProduct({ ...formProduct, imageFile: e.target.files[0] })}
            className="border px-3 py-2 rounded w-full"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => { setModalOpen(false); setEditProduct(null); }} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {editProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>


);
};

export default Products;
