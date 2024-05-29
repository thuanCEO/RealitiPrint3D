import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import "./homePage.scss";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";
import ProductsList from "../../components/products/productList/productList";
import NewProducts from "../home/newProducts";
import CarouselDefault from "./carousel";
import Blogs from "./blogs";
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
          <NewProducts />
          <ProductsList />
          <Blogs />
        </>
      )}
      <Footer />
    </div>
  );
}
