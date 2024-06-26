import React, { useState, useEffect } from "react";
import axiosClient from "../../services/api/api";
import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";

export default function ServiceListPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resq = await axiosClient.get("api/Product/GetAllProducts");
      setProducts(resq.data);
      console.log(resq.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <Header />
      <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
              Mẫu sản phẩm dịch vụ in ấn
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products
                .filter((product) => product.status === 1)
                .filter((products) => products.categoryId === 3)
                .slice(0, 12)
                .map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageUrl}
                        alt={product.imageAlt || product.productName}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
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
                      <p className="text-sm font-medium text-red-500">
                        {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
