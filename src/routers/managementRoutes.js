import React from "react";
import ManagementDashboardPage from "../containers/management/managementDashboard";
import ManagementProductsPage from "../containers/management/managementProduct";


export const managementRoutes = [
    { path: "/reality3d/management/management-dashboard-page", element: <ManagementDashboardPage /> },
    { path: "/reality3d/management/management-products-page", element: <ManagementProductsPage /> },

];
