import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@services/axiosClient";
import { FaShoppingCart } from "react-icons/fa";

import "@pages/Product/productPage.scss";

export default function ModelListPage({ cartCount, setCartCount }) {
    const [models, setModels] = useState([]);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState({ hours: 2, minutes: 0, seconds: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [soldCounts, setSoldCounts] = useState({});
    const productsPerPage = 6;
    const navigate = useNavigate();
    const filteredModels = models.filter(
        (m) => m.status != 0
    );

    const totalPages = Math.ceil(filteredModels.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentModels = filteredModels.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        fetchModels();
    }, []);

    useEffect(() => {
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (models.length > 0) {
            const counts = {};
            models.forEach((model) => {
                counts[model.id] = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
            });
            setSoldCounts(counts);
        }
    }, [models]);

    const fetchModels = async () => {
        try {
            const res = await axiosClient.get("models");
            setModels(res.data);
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

    const handleAddToCart = (model) => {
        setCartCount((prev) => prev + 1);
        const btn = document.getElementById(`cart-btn-${model.id}`);
        if (btn) {
            btn.classList.add("cart-added");
            setTimeout(() => btn.classList.remove("cart-added"), 500);
        }
    };

    const goToDetail = (id) => {
        navigate(`/reality3d/model-detail/${id}`);
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="products-list-container">
                <h2 className="products-page-titles fire-effect">
                    Mô hình 3D
                </h2>
                <div className="products-grid">
                    {currentModels.map((model) => (
                        <div className="product-card" key={model.id}>
                            <div className="product-image">
                                <img
                                    src={model.modelUrl}
                                    alt={model.modelUrl || model.modelName}
                                />
                                <div
                                    className="view-detail-overlay"
                                    onClick={() => goToDetail(model.id)}
                                >
                                    Xem chi tiết
                                </div>
                            </div>
                            <div className="flash-sale">Flash Sale</div>
                            <div className="countdown">
                                Kết thúc sau: {countdown.hours}:{countdown.minutes}:{countdown.seconds}
                            </div>
                            <div className="product-info">
                                <h3>
                                    <a href={`/reality3d/models-detail/${model.id}`}>
                                        {model.modelName}
                                    </a>
                                </h3>
                                <div className="price">
                                    {model.categoryId === 1 && (
                                        <span className="original-price">
                                            {model.price.toLocaleString()} đ
                                        </span>
                                    )}
                                    <span className="sale-price">
                                        {model.categoryId === 1
                                            ? (model.price - 30000).toLocaleString()
                                            : model.price.toLocaleString()}{" "}
                                        đ
                                    </span>
                                </div>
                                <div className="product-bottom">
                                    <span className="sold-count">{soldCounts[model.id]} đã bán</span>
                                    <div className="add-to-cart-wrapper">
                                        <button
                                            id={`cart-btn-${model.id}`}
                                            className="add-to-cart-btn"
                                            onClick={() => handleAddToCart(model)}
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
        </>
    );
}
