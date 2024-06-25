import React, { useState } from "react";
import "./loginPages.scss";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import icon_image_shop3D from "../../../assets/images/logos/logoShopPrint3D.png";
import Footer from "../../Common/footer/footer";
import axiosClient from "../../../services/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordPopup from "./forgotPasswordPopup"; // Import your popup component

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to control showing the popup
  const navigate = useNavigate();

  axiosClient.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post(
        `/api/User/Login?userName=${userName}&password=${password}`,
        {
          userName,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setErrorMessage("");
      const userData = response.data;
      const { roleId } = userData;
      sessionStorage.setItem("userData", JSON.stringify(userData));
      sessionStorage.setItem("roleId", roleId);
      // Set other session storage items as needed

      toast.success("Đăng nhập thành công!");

      setTimeout(() => {
        if (roleId === 1 || roleId === 2) {
          navigate("/reality3d/management/management-dashboard-page");
        } else if (roleId === 4) {
          navigate("/reality3d/management/staff-dashboard-page");
        } else if (roleId === 3) {
          navigate("/reality3d/home-page");
        } else {
          navigate("/reality3d/404-page");
        }
      }, 2000);
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không hợp lệ");
    }
  };

  const openForgotPasswordPopup = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordPopup = () => {
    setShowForgotPassword(false);
  };

  return (
    <div>
      {showForgotPassword && (
        <ForgotPasswordPopup onClose={closeForgotPasswordPopup} />
      )}
      <div className="login-container-header">
        <div className="login-container-header-icon">
          <img
            src={icon_image_shop3D}
            alt="Reality Print 3D"
            width="30px"
            height="38px"
          />
        </div>
        <div className="login-title-header">
          <h1 className="login-title-header">Reality 3D</h1>
        </div>
      </div>
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Đăng nhập</h1>
          <form className="login-form">
            <div className="login-input-group">
              <input
                placeholder="Tên đăng nhập"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="login-input"
              />
              <FaRegUserCircle className="icon" />
            </div>
            <div className="login-input-group">
              <input
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <FaLock className="icon" />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="container">
              <div className="password-recovery">
                <button type="button" onClick={openForgotPasswordPopup}>
                  Quên mật khẩu
                </button>
              </div>
              <div className="registration">
                <a href="/reality3d/registration-account">Đăng ký</a>
              </div>
            </div>
            <br />
            <div className="login-button-group">
              <button
                type="button"
                onClick={handleLogin}
                className="login-button"
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
