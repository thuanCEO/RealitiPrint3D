import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Card.scss";
import Revenue from "./revenue/Revenue";
import StudioStatus from "./studioStatus/StudioStatus";
import PieChart from "./pieChart/PieChart";
import axiosClient from "../../services/api/api";

export default function Dashboard() {
  const [data, setData] = useState([
    { title: "Total Customer", total: 0, label: " Customers" },
    { title: "Total Products", total: 0, label: " Products" },
    { title: "Total Blogs", total: 0, label: " Blogs" },
    { title: "Total Services", total: 0, label: " Services" },
    { title: "Total Feedbacks", total: 0, label: " Feedbacks" },
    { title: "Total Orders Success", total: 0, label: " Orders Success" },
    { title: "Total Orders Fail", total: 0, label: " Orders Fail" },
    { title: "Revenue", total: 0, label: "VND" },
  ]);

  // Fetch total accounts
  useEffect(() => {
    const fetchDataUsers = async () => {
      try {
        const response = await axiosClient.get("/api/User/GetAllUsers");
        const customers = response.data.filter((user) => user.roleId === 3);
        const totalCustomers = customers.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Customer"
              ? { ...item, total: totalCustomers }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataUsers();
  }, []);

  // Fetch total products
  useEffect(() => {
    const fetchDataProducts = async () => {
      try {
        const response = await axiosClient.get("/api/Product/GetAllProducts");
        const products = response.data.filter((pro) => pro.status === 1);
        const totalProducts = products.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Products"
              ? { ...item, total: totalProducts }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataProducts();
  }, []);

  // Fetch total blogs
  useEffect(() => {
    const fetchDataBlogs = async () => {
      try {
        const response = await axiosClient.get("/api/Blog/GetAllBlogs");
        const blogs = response.data.filter((pro) => pro.status === 1);
        const totalBlogs = blogs.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Blogs" ? { ...item, total: totalBlogs } : item
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataBlogs();
  }, []);

  // Fetch total feedbacks
  useEffect(() => {
    const fetchDataFeedbacks = async () => {
      try {
        const response = await axiosClient.get("/api/Feedback/GetAllFeedbacks");
        const feedbacks = response.data.filter((pro) => pro.status === 1);
        const totalFeedbacks = feedbacks.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Feedbacks"
              ? { ...item, total: totalFeedbacks }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFeedbacks();
  }, []);

  // Fetch total services
  useEffect(() => {
    const fetchDataServices = async () => {
      try {
        const response = await axiosClient.get("/api/Service/GetAllServices");
        const services = response.data.filter((pro) => pro.status === 1);
        const totalServices = services.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Services"
              ? { ...item, total: totalServices }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataServices();
  }, []);

  // Fetch total orders success
  useEffect(() => {
    const fetchOrdersSuccess = async () => {
      try {
        const response = await axiosClient.get("/api/Order/GetAllOrders");
        console.log("Response from API:", response.data);
        const ordersWithStatusFour = response.data.filter(
          (order) => parseInt(order.status, 10) === 4
        );
        const totalOrdersWithStatusFour = ordersWithStatusFour.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Orders Success"
              ? { ...item, total: totalOrdersWithStatusFour }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrdersSuccess();
  }, []);

  // Fetch total orders fail
  useEffect(() => {
    const fetchOrdersFail = async () => {
      try {
        const response = await axiosClient.get("/api/Order/GetAllOrders");
        console.log("Response from API:", response.data);
        const ordersWithStatusFive = response.data.filter(
          (order) => parseInt(order.status, 10) === 5
        );
        const totalOrdersWithStatusFive = ordersWithStatusFive.length;

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Total Orders Fail"
              ? { ...item, total: totalOrdersWithStatusFive }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrdersFail();
  }, []);

  // Fetch revenue
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosClient.get("/api/Order/GetAllOrders");
        console.log("Response from API:", response.data);
        const ordersWithStatusFour = response.data.filter(
          (order) => parseInt(order.status, 10) === 4
        );
        const totalFinalPrice = ordersWithStatusFour.reduce(
          (total, order) => total + order.finalPrice,
          0
        );

        const formattedTotalFinalPrice =
          new Intl.NumberFormat("vi-VN").format(totalFinalPrice) + " VND";

        setData((prevData) =>
          prevData.map((item) =>
            item.title === "Revenue"
              ? { ...item, total: formattedTotalFinalPrice }
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card-container">
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <div className="chart-bar">
        <Revenue />
      </div>
      {/* <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="studio-status">
          <StudioStatus />
        </div>
        <div className="chart-pie">
          <h3>Top 3 Cages Best Seller</h3>
          <h4 style={{ color: "#0B1354" }}>450</h4>
          <div style={{ height: "250px", marginTop: "30px" }}>
            <PieChart />
          </div>
        </div>
      </div> */}
    </div>
  );
}
