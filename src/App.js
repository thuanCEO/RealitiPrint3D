import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../src/components/user/login/loginPages";
import RegistrationAccount from "../src/components/user/register/registration";
import HomePage from "../src/containers/home/homePage";
import ErrorPage from "../src/containers/errorPages/404pages";
import ContactPage from "../src/components/user/contact/contact";
import BestSale from "../src/containers/home/bestSale";
import ProductsList from "../src/containers/home/product";
import ServicesList from "../src/containers/home/service";
import ModelsList from "../src/containers/home/modelPage";
import BlogPages from "../src/containers/home/blogPage";
import ProductDetailPage from "../src/containers/home/productDetail";
import ViewCart from "../src/containers/home/cart";
import EditPages from "../src/containers/home/editPage";
import ProfilePages from "../src/components/user/profile/profile";
import HistoryPages from "../src/components/user/order/orderHistory";

// Management
import ManagementDashboardPage from "./containers/management/managementDashboard";
import ManagementAccountsPage from "./containers/management/managementAccount";
import ManagementProductsPage from "./containers/management/managementProduct";
import ManagementBlogsPage from "./containers/management/managementBlog";
import ManagementOrdersPage from "./containers/management/managementOrder";
import ManagementVouchersPage from "./containers/management/managementVoucher";
import ManagementFeedbacksPage from "./containers/management/managementFeedback";
import ManagementCategoriesPage from "./containers/management/managementCategory";
import ManagementServicesPage from "./containers/management/managementService";

import ManagementAccountDetailsPage from "./containers/management/managementAccountDetails";
import ManagementProductDetailsPage from "./containers/management/managementProductDetails";
import ManagementOrderDetailsPage from "./containers/management/managementOrderDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/reality3d/home-page" />} />
        <Route path="/reality3d/home-page" element={<HomePage />} />
        <Route path="/reality3d/login-account" element={<Login />} />
        <Route path="/reality3d/404-page" element={<ErrorPage />} />
        <Route path="/reality3d/best-sale" element={<BestSale />} />
        <Route path="/reality3d/product-list" element={<ProductsList />} />
        <Route path="/reality3d/product-model-list" element={<ModelsList />} />
        <Route path="/reality3d/view-blog" element={<BlogPages />} />
        <Route path="/reality3d/service-page" element={<ServicesList />} />
        <Route path="/reality3d/view-cart" element={<ViewCart />} />
        <Route path="/reality3d/contact-page" element={<ContactPage />} />
        <Route
          path="/reality3d/product-detail/:id"
          element={<ProductDetailPage />}
        />
        <Route
          path="/reality3d/registration-account"
          element={<RegistrationAccount />}
        />
        <Route path="/reality3d/profile-page" element={<ProfilePages />} />
        <Route path="/reality3d/history-page" element={<HistoryPages />} />
        <Route path="/reality3d/edits-page" element={<EditPages />} />

        {/* Manager management*/}
        <Route
          path="/reality3d/management/management-dashboard-page"
          element={<ManagementDashboardPage />}
        />
        <Route
          path="/reality3d/management/management-accounts-page"
          element={<ManagementAccountsPage />}
        />
        <Route
          path="/reality3d/management/management-products-page"
          element={<ManagementProductsPage />}
        />
        <Route
          path="/reality3d/management/management-blogs-page"
          element={<ManagementBlogsPage />}
        />
        <Route
          path="/reality3d/management/management-orders-page"
          element={<ManagementOrdersPage />}
        />
        <Route
          path="/reality3d/management/management-vouchers-page"
          element={<ManagementVouchersPage />}
        />
        <Route
          path="/reality3d/management/management-feedbacks-page"
          element={<ManagementFeedbacksPage />}
        />
        <Route
          path="/reality3d/management/management-categories-page"
          element={<ManagementCategoriesPage />}
        />
        <Route
          path="/reality3d/management/management-services-page"
          element={<ManagementServicesPage />}
        />
        {/* Manager action*/}
        <Route
          path="/reality3d/management/management-account-details-page/:id"
          element={<ManagementAccountDetailsPage />}
        />
        <Route
          path="/reality3d/management/management-product-details-page/:id"
          element={<ManagementProductDetailsPage />}
        />
        <Route
          path="/reality3d/management/management-order-details-page/:id"
          element={<ManagementOrderDetailsPage />}
        />
      </Routes>
    </Router>
  );
}
