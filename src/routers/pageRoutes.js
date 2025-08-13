import React from "react";
import { Navigate } from "react-router-dom";


import HomePage from "@pages/Home/homePage";
import RegisterPage from "@pages/Register/registerPage";
import LoginPage from "@pages/Login/loginPage";
import ErrorPage from "@pages/NotFound/notFoundPage";
import BestSalePage from "@pages/BestSale/bestSalePage";

export const pageRoutes = [
    { path: "/", element: <Navigate to="/reality3d/home-page" /> },
    { path: "/reality3d/home-page", element: <HomePage /> },
    { path: "/reality3d/registration-account", element: <RegisterPage /> },
    { path: "/reality3d/login-account", element: <LoginPage /> },
    { path: "/reality3d/404-page", element: <ErrorPage /> },
    { path: "/reality3d/best-sale", element: <BestSalePage /> },
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
