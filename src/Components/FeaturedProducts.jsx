// FeaturedProducts.jsx
import React, { useEffect, useRef, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../Contexts/CartContext"; 


gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();


  useEffect(() => {
    // Fetch 6 products from backend
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_END_API_URL}/products`);
        const data = await res.json();
  
        // If paginated, items are inside data.data
        const productsArray = Array.isArray(data) ? data : data.data;
  
        setProducts(productsArray.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [products]);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-900 mb-10">
          Featured <span className="text-[#ac0121]">Products</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-medium text-gray-800">
                  {product.product_name}
                </h3>
                <p className="text-gray-500 mt-1">${product.price}</p>
                <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="text-[#ac0121] border border-[#ac0121] px-3 py-1.5 rounded-lg text-sm hover:bg-[#ac0121] hover:text-white transition"
                >
                  <div className="flex justify-between">
                    <FiShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </div>
                </button>

                  <div className="flex space-x-3 text-gray-600">
                    <FiHeart size={18} className="cursor-pointer hover:text-[#ac0121]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="mt-10">
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-[#ac0121] text-white font-semibold rounded-lg hover:bg-[#8a0018] transition"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
