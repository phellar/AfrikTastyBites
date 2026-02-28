import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiBox, FiX, FiImage, FiArrowRight } from "react-icons/fi";
import gsap from "gsap";

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
  const brandRed = "#ac0121";

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
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
      gsap.fromTo(".product-row", { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.5 });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", formProduct.name);
      formData.append("price", formProduct.price);
      formData.append("description", formProduct.description);
      if (formProduct.imageFile) formData.append("image", formProduct.imageFile);

      const url = editProduct ? `${API_URL}/products/${editProduct.id}` : `${API_URL}/products`;
      const method = editProduct ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(editProduct ? "Update failed" : "Add failed");

      const data = await res.json();
      fetchProducts(); // Refresh list to ensure data sync
      setModalOpen(false);
      setFormProduct({ name: "", price: "", description: "", imageFile: null });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-6 md:p-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/5 pb-8 gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ac0121] mb-3">Inventory Manager</p>
          <h1 className="text-4xl font-bold tracking-tighter">Product <span className="text-gray-500 italic font-medium">Collection</span></h1>
        </div>
        <button
          onClick={() => { setModalOpen(true); setEditProduct(null); }}
          className="flex items-center gap-3 bg-[#ac0121] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition shadow-lg shadow-[#ac0121]/20"
        >
          <AiOutlinePlus size={18} /> Add New Item
        </button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-950/30 border border-red-500/50 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-wider">{error}</div>}

      {/* Product Grid/Table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#ac0121] border-t-transparent rounded-full animate-spin"></div></div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-[#181c23] rounded-[2.5rem] border border-white/5">
          <FiBox size={40} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500 font-medium">No items in the kitchen yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                <th className="px-6 pb-2">Product Details</th>
                <th className="px-6 pb-2">Description</th>
                <th className="px-6 pb-2 text-right">Price</th>
                <th className="px-6 pb-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="product-row group">
                  <td className="bg-[#181c23] border-y border-l border-white/5 rounded-l-[1.5rem] p-4">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black">
                        <img src={product.product_image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                      </div>
                      <span className="font-bold text-white tracking-tight">{product.product_name}</span>
                    </div>
                  </td>
                  <td className="bg-[#181c23] border-y border-white/5 p-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-gray-500 text-sm italic">
                    {product.product_desc}
                  </td>
                  <td className="bg-[#181c23] border-y border-white/5 p-4 text-right font-black text-white">
                    CA${parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="bg-[#181c23] border-y border-r border-white/5 rounded-r-[1.5rem] p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(product)} className="p-3 bg-white/5 rounded-xl hover:bg-green-600 transition-colors"><AiOutlineEdit /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-3 bg-white/5 rounded-xl hover:bg-[#ac0121] transition-colors"><AiOutlineDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modern Slide-in Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-[#181c23] border border-white/10 rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl overflow-hidden relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><FiX size={24} /></button>
            
            <h3 className="text-2xl font-bold tracking-tighter mb-8 text-white">
              {editProduct ? "Update" : "Create"} <span className="text-[#ac0121] italic">Product</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Item Name</label>
                <input
                  type="text"
                  value={formProduct.name}
                  onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 focus:border-[#ac0121] outline-none transition"
                  placeholder="e.g. Smoked Jollof" required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Price (CAD)</label>
                <input
                  type="number"
                  value={formProduct.price}
                  onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 focus:border-[#ac0121] outline-none transition"
                  placeholder="0.00" required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Description</label>
                <textarea
                  value={formProduct.description}
                  onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 focus:border-[#ac0121] outline-none transition resize-none"
                  rows={3} placeholder="Ingredients and details..." required
                />
              </div>

              <div className="relative group">
                <input
                  type="file"
                  onChange={(e) => setFormProduct({ ...formProduct, imageFile: e.target.files[0] })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-white/5 border border-dashed border-white/10 rounded-2xl p-6 text-center group-hover:bg-white/10 transition">
                  <FiImage className="mx-auto text-[#ac0121] mb-2" size={24} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {formProduct.imageFile ? formProduct.imageFile.name : "Select High-Res Image"}
                  </p>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-[#ac0121] text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:brightness-110 transition mt-4">
                {editProduct ? "Apply Changes" : "Confirm Addition"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;