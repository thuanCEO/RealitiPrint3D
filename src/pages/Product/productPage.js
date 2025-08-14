import React, { useState, useEffect } from "react";
import axiosClient from "@services/axiosClient";
import { FaShoppingCart } from "react-icons/fa";
import "@pages/Product/productPage.scss";

export default function ProductsListPage({ cartCount, setCartCount }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 0, seconds: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [soldCounts, setSoldCounts] = useState({});
  const productsPerPage = 6;

  const filteredProducts = products.filter(
    (p) => p.status === 1 && (p.categoryId === 1 || p.categoryId === 2)
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (products.length > 0) {
      const counts = {};
      products.forEach((product) => {
        counts[product.id] = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
      });
      setSoldCounts(counts);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("products");
      setProducts(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCountdown = () => {
    setCountdown((prev) => {
      let { hours, minutes, seconds } = prev;
      if (hours === 0 && minutes === 0 && seconds === 0) return prev;

      if (seconds > 0) seconds--;
      else {
        seconds = 59;
        if (minutes > 0) minutes--;
        else {
          minutes = 59;
          hours--;
        }
      }
      return { hours, minutes, seconds };
    });
  };

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    const btn = document.getElementById(`cart-btn-${product.id}`);
    if (btn) {
      btn.classList.add("cart-added");
      setTimeout(() => btn.classList.remove("cart-added"), 500);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-list-container">
      <h2 className="products-page-title fire-effect">Sản Phẩm Bán Chạy</h2>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img
                src={product.imageUrl}
                alt={product.imageAlt || product.productName}
              />
            </div>
            <div className="flash-sale">Flash Sale</div>
            <div className="countdown">
              Kết thúc sau: {countdown.hours}:{countdown.minutes}:{countdown.seconds}
            </div>
            <div className="product-info">
              <h3>
                <a href={`/reality3d/product-detail/${product.id}`}>
                  {product.productName}
                </a>
              </h3>
              <div className="price">
                {product.categoryId === 1 && (
                  <span className="original-price">
                    {product.price.toLocaleString()} đ
                  </span>
                )}
                <span className="sale-price">
                  {product.categoryId === 1
                    ? (product.price - 30000).toLocaleString()
                    : product.price.toLocaleString()}{" "}
                  đ
                </span>
              </div>
              <div className="product-bottom">
                <span className="sold-count">{soldCounts[product.id]} đã bán</span>
                <div className="add-to-cart-wrapper">
                  <button
                    id={`cart-btn-${product.id}`}
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className={currentPage === 1 ? "disabled" : ""}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &larr; Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={currentPage === totalPages ? "disabled" : ""}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
