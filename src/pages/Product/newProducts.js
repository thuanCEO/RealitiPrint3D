import React, { useState, useEffect } from "react";
import axiosClient from "@services/api/api";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []); // Empty dependency array means this effect runs once after the first render

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("products");
      const sortedProducts = res.data.sort((a, b) => b.id - a.id); // Sort by id descending
      setProducts(sortedProducts);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateCountdown = () => {
    if (
      countdown.hours === 0 &&
      countdown.minutes === 0 &&
      countdown.seconds === 0
    ) {
      return;
    }
    setCountdown((prevCountdown) => {
      let updatedCountdown = { ...prevCountdown };

      if (updatedCountdown.seconds > 0) {
        updatedCountdown.seconds--;
      } else {
        if (updatedCountdown.minutes > 0) {
          updatedCountdown.minutes--;
          updatedCountdown.seconds = 59;
        } else {
          updatedCountdown.hours--;
          updatedCountdown.minutes = 59;
          updatedCountdown.seconds = 59;
        }
      }
      return updatedCountdown;
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center font-bold ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
              Sản Phẩm Mới
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products
                .filter((product) => product.status === 1)
                .filter(
                  (product) =>
                    product.categoryId === 1 ||
                    product.categoryId === 2 ||
                    product.categoryId === 3
                )
                .slice(0, 12)
                .map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageUrl}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>

                    <div className="mt-1 flex justify-between">
                      <div
                        className="ml-0"
                        style={{
                          background:
                            "linear-gradient(to right, darkorange, orange)",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                        }}
                      >
                        Flash Sale
                      </div>
                      <div
                        className="mr-0"
                        style={{
                          background:
                            "linear-gradient(to right, orange, lightcoral)",
                          padding: "5px 10px",
                          borderRadius: "4px",
                        }}
                      >
                        Kết thúc sau: {countdown.hours}:{countdown.minutes}:
                        {countdown.seconds}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          <a href={`/reality3d/product-detail/${product.id}`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.productName}
                          </a>
                        </h3>
                      </div>
                      <div></div>
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      {product.categoryId === 1 && (
                        <p className="text-sm font-medium text-gray-700">
                          <del>
                            {product.price.toLocaleString()}{" "}
                            <span className="align-top text-xs"> đ</span>
                          </del>
                        </p>
                      )}
                      <p className="text-sm font-bold text-red-500">
                        {product.categoryId === 1
                          ? (product.price - 30000).toLocaleString()
                          : product.price.toLocaleString()}{" "}
                        <span className="align-top text-xs"> đ</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
