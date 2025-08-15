import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@components/common/footer/footer";
import Header from "@components/common/header/header";
import axiosClient from "@services/axiosClient";
import ProductImageGallery from "@pages/Product/productImageGallery";
import "@pages/Product/productDetail.scss";

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
            const response = await axiosClient.get(`/products/${productId}`);
            setProductDetails(response.data);
            setUnitPrice(response.data.price);
            setTotalPrice(response.data.price);
        } catch (error) {
            setError("Không tìm thấy sản phẩm.");
        }
    };

    const handleSizeChange = (e) => {
        const selected = e.target.value;
        setSelectedSize(selected);

        let newPrice = productDetails.price;
        if (selected === "L") newPrice += 20000;
        if (selected === "XL") newPrice += 35000;

        setUnitPrice(newPrice);
        setTotalPrice(newPrice * quantity);
    };

    const handleQuantityChange = (type) => {
        let newQuantity = quantity;
        if (type === "increment") newQuantity += 1;
        if (type === "decrement" && quantity > 1) newQuantity -= 1;

        setQuantity(newQuantity);
        setTotalPrice(unitPrice * newQuantity);
    };

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            setShowPopup(true);
            return;
        }
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const productToAdd = {
            id: productDetails.id,
            categoryId: productDetails.categoryId,
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
    };

    useEffect(() => {
        setCart(JSON.parse(sessionStorage.getItem("cart")) || []);
        setIsLoggedIn(!!sessionStorage.getItem("userData"));
    }, []);

    useEffect(() => {
        if (id) fetchProductDetails(id);
        else setError("Không có ID sản phẩm.");
    }, [id]);

    if (error) {
        return (
            <>
                <Header products={cart} />
                <div className="product-detail__error">{error}</div>
                <Footer />
            </>
        );
    }

    if (!productDetails) {
        return (
            <>
                <Header products={cart} />
                <div className="product-detail__loading">Đang tải...</div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header products={cart} />
            <div className="product-detail">
                <div className="container">
                    <div className="product-detail__wrapper">
                        {/* <div className="product-detail__image">
                            <img src={productDetails.imageUrl} alt={productDetails.productName} />
                        </div> */}
                        <ProductImageGallery images={productDetails.imageUrl} />
                        <div className="product-detail__info">
                            <h2 className="product-detail__category">
                                {productDetails.category?.title || "Danh mục"}
                            </h2>
                            <h1 className="product-detail__title">{productDetails.productName}</h1>
                            <p className="product-detail__description">{productDetails.description}</p>

                            <div className="product-detail__price">
                                {(productDetails.categoryId === 1
                                    ? unitPrice - 30000
                                    : unitPrice
                                ).toLocaleString()} đ
                            </div>

                            <div className="product-detail__options">
                                <label>Kích thước</label>
                                <select value={selectedSize} onChange={handleSizeChange}>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>

                            <div className="product-detail__quantity">
                                <button onClick={() => handleQuantityChange("decrement")}>-</button>
                                <input value={quantity} readOnly />
                                <button onClick={() => handleQuantityChange("increment")}>+</button>
                            </div>

                            <button className="btn-add-cart" onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
