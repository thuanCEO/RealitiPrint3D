import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Common/footer/footer";
import Header from "../../components/Common/header/header";
import axiosClient from "../../services/api/api";
import ViewFeedBackProduct from "./feedbackProduct";
import ProductsListPage from "./newProducts";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [cart, setCart] = useState([]);
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axiosClient.get(
        `/api/Product/GetProductById?id=${productId}`
      );
      setProductDetails(response.data);
      setUnitPrice(response.data.price);
      setTotalPrice(response.data.price);
    } catch (error) {
      setError("Error fetching product details.");
    }
  };

  const handleLogin = () => {
    navigate("/reality3d/login-account");
  };
  const handleSizeChange = (e) => {
    const selected = e.target.value;
    setSelectedSize(selected);

    let newPrice = productDetails.price;
    if (selected === "L") {
      newPrice += 20000;
    } else if (selected === "XL") {
      newPrice += 35000;
    }

    setUnitPrice(newPrice);
    setTotalPrice(newPrice * quantity);
  };

  const handleQuantityChange = (type) => {
    let newQuantity = quantity;
    if (type === "increment") {
      newQuantity += 1;
    } else if (type === "decrement" && quantity > 1) {
      newQuantity -= 1;
    }
    setQuantity(newQuantity);
    setTotalPrice(unitPrice * newQuantity);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const productToAdd = {
        id: productDetails.id,
        imageUrl: productDetails.imageUrl,
        name: productDetails.productName,
        description: productDetails.description,
        price: totalPrice,
        size: selectedSize,
        quantity: quantity,
      };
      const updatedCart = [...cart, productToAdd];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      setShowSuccessPopup(true);
    }
  };
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);
  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem("userData");
    if (userDataFromStorage) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    } else {
      setError("Error: No product ID provided.");
    }
  }, [id]);

  if (error) {
    return (
      <>
        <Header products={cart} />
        <div className="bg-gray-100 py-10 text-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!productDetails) {
    return (
      <>
        <Header products={cart} />
        <div className="bg-gray-100 py-10 text-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header products={cart} />
      <div className="bg-gray-100 py-10">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container-fluid px-5 py-24 mx-auto max-w-screen-xl">
            <div className="lg:flex lg:flex-wrap lg:justify-between lg:items-center bg-white shadow-lg rounded-lg p-6">
              <img
                alt="Product"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={productDetails.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 p-6">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {productDetails.category?.title || "BRAND NAME"}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {productDetails.productName || "Product Name"}
                </h1>
                <p className="leading-relaxed mb-4">
                  {productDetails.description}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Giá:</span>
                    <span className="text-gray-900">
                      {unitPrice.toLocaleString()} đ
                    </span>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Kích thước</span>
                    <div className="relative">
                      <select
                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                        value={selectedSize}
                        onChange={handleSizeChange}
                      >
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <span className="mr-3">Số lượng</span>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l hover:bg-gray-400 transition-colors duration-200"
                      onClick={() => handleQuantityChange("decrement")}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-16 text-center border-t border-b border-gray-300 py-2 mx-1"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-400 transition-colors duration-200"
                      onClick={() => handleQuantityChange("increment")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {totalPrice.toLocaleString()} đ
                  </span>
                  <button
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
                {showSuccessPopup && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                      <h2 className="text-xl mb-4 text-green-500">
                        Sản phẩm đã được thêm vào giỏ hàng!
                      </h2>
                      <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowSuccessPopup(false)}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                )}
                {showPopup && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                      <h2 className="text-xl mb-4 text-red-500">
                        Vui lòng đăng nhập
                      </h2>
                      <p className="mb-4">
                        Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.
                      </p>
                      <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded mr-5"
                        onClick={() => handleLogin()}
                      >
                        Đăng nhập
                      </button>
                      <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => setShowPopup(false)}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <ViewFeedBackProduct />
      <ProductsListPage />
      <Footer />
    </>
  );
}
