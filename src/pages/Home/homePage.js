import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import "@pages/Home/homePage.scss";
import "react-tabs/style/react-tabs.css";

import Header from "@components/common/header/header";
import Footer from "@components/common/footer/footer";
import ProductsListPage from "@pages/Product/productListPage";
import BlogListPage from "@pages/Blog/blogListPages";
import ModelListPage from "@pages/Product/modelListPage";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {/* <CarouselDefault /> */}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <>
          <ProductsListPage />
          <ModelListPage />
          <BlogListPage />
        </>
      )}
      <Footer />
    </div>
  );
}
