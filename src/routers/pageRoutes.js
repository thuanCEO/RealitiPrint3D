import React from "react";
import { Navigate } from "react-router-dom";

import RegisterPage from "@pages/Register/registerPage";
import LoginPage from "@pages/Login/loginPage";
import HomePage from "@pages/Home/homePage";
import ModelsPage from "@pages/Product/modelPage";
import ProductsPage from "@pages/Product/productPage";
import BlogPages from "@pages/Blog/blogPage";
import ErrorPage from "@pages/NotFound/notFoundPage";
import ContactPage from "@pages/Contact/contactPage";
import ProductDetailPage from "@pages/Product/productDetail";
import ModelDetailPage from "@pages/Product/modelDetail";
import BlogDetailPages from "@pages/Blog/blogDetailPage";

export const pageRoutes = [
    { path: "/", element: <Navigate to="/reality3d/home-page" /> },
    { path: "/reality3d/home-page", element: <HomePage /> },
    { path: "/reality3d/product-model-page", element: <ModelsPage /> },
    { path: "/reality3d/product-shirt-page", element: <ProductsPage /> },
    { path: "/reality3d/blog-page", element: <BlogPages /> },
    { path: "/reality3d/registration-account", element: <RegisterPage /> },
    { path: "/reality3d/login-account", element: <LoginPage /> },
    { path: "/reality3d/404-page", element: <ErrorPage /> },
    { path: "/reality3d/contact-page", element: <ContactPage /> },
    { path: "/reality3d/product-detail/:id", element: <ProductDetailPage /> },
    { path: "/reality3d/model-detail/:id", element: <ModelDetailPage /> },
    { path: "/reality3d/blog-detail/:id", element: <BlogDetailPages /> },
    // { path: "/reality3d/best-sale", element: <BestSalePage /> },

    // { path: "/reality3d/product-list", element: <ProductsList /> },
    // { path: "/reality3d/product-model-list", element: <ModelsList /> },
    // { path: "/reality3d/product-model-list", element: <BlogPages /> },
    // { path: "/reality3d/service-page", element: <ServicesList /> },
    // { path: "/reality3d/view-cart", element: <ViewCart /> },
    // { path: "/reality3d/view-information-about-page", element: <InformationPage /> },
    // { path: "/reality3d/contact-page", element: <ContactPage /> },
    // { path: "/reality3d/product-detail/:id", element: <ProductDetailPage /> },
    // { path: "/reality3d/view-blog-detail/:id", element: <BlogDetailPages /> },
    // { path: "/reality3d/profile-page/change-password", element: <PasswordChangePages /> },
    // { path: "/reality3d/history-page", element: <HistoryPages /> },
    // { path: "/reality3d/history-orders-page", element: <HistoryOrdersPages /> },
    // { path: "/reality3d/history-orders-fail-page", element: <HistoryOrdersFailPages /> },
    // { path: "/reality3d/edits-page", element: <EditPages /> },

];
