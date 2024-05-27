import React from "react";
import "react-multi-carousel/lib/styles.css";
import "./homePage.scss";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";
import BlogPage from "./blogPage";

import ProductsList from "../../components/products/productList/productList";
import NewProducts from "../home/newProducts";
export default function HomePage() {
  return (
    <div>
      <Header />
      <NewProducts />
      <ProductsList />
      <BlogPage />
      <Footer />
    </div>
  );
}
