import React, { useState, useEffect } from "react";
import axiosClient from "../../services/api/api";
import { useParams } from "react-router-dom";

export default function ViewFeedBackProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProduct = async (productId) => {
    try {
      const resq = await axiosClient.get(
        `/api/Product/GetProductById?id=${productId}`
      );
      setProduct(resq.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    } else {
      setError("Error: No product ID provided.");
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto h-full flex flex-col justify-center">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {product.feedbacks && product.feedbacks.length > 0 ? (
            product.feedbacks.map((feedback) => (
              <div
                key={feedback.user.fullName}
                className="py-8 flex flex-wrap md:flex-nowrap"
              >
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col items-center">
                  <span className="font-semibold title-font text-gray-700 mb-2">
                    {feedback.user.fullName}
                  </span>
                  <img
                    className="w-24 h-24 rounded-full object-cover"
                    src={feedback.user.avatar}
                    alt="User Avatar"
                  />
                </div>

                <div className="md:flex-grow md:pl-8">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                    {feedback.title}
                  </h2>
                  <p className="leading-relaxed">{feedback.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Sản phẩm chưa có bảng đánh giá từ khách hàng.</p>
          )}
        </div>
      </div>
    </section>
  );
}
