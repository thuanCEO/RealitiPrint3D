import React, { useState } from "react";
import "@pages/Product/productImageGallery.scss";

export default function ProductImageGallery({ images }) {
    // Nếu images không phải mảng thì ép thành mảng
    const imageArray = Array.isArray(images) ? images : images ? [images] : [];

    const [currentIndex, setCurrentIndex] = useState(0);

    if (imageArray.length === 0) {
        return <div>Không có ảnh sản phẩm</div>;
    }

    return (
        <div>
            {/* Ảnh chính */}
            <img
                src={imageArray[currentIndex]}
                alt="Ảnh chính"
                style={{
                    width: "400px",
                    height: "400px",
                    borderRadius: "12px",
                    objectFit: "cover"
                }}
            />

            {/* Ảnh phụ */}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                {imageArray.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Ảnh phụ ${index + 1}`}
                        style={{
                            width: "80px",
                            height: "80px",
                            cursor: "pointer",
                            borderRadius: "8px",
                            objectFit: "cover",
                            border: index === currentIndex ? "2px solid red" : "1px solid gray",
                        }}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};
