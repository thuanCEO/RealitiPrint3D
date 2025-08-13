import React, { useState, useEffect } from "react";
import axiosClient from "@services/api/api";
import "./productPage.scss";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products.filter(
    (p) => p.status === 1 && (p.categoryId === 1 || p.categoryId === 2)
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-list-container">
      <h2 className="products-page-title fire-effect">
        Sản Phẩm Bán Chạy
      </h2>
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
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center mt-8 items-center gap-2">
        <button
          className={`px-3 py-1 rounded ${currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-orange-500 text-white"
            }`}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          &larr; Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded ${currentPage === i + 1
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
              }`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded ${currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-orange-500 text-white"
            }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
