import React, { useState, useEffect } from "react";
import "@pages/Login/loginPage.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaLock } from "react-icons/fa";

import icon_image_shop3D from "@assets/images/logos/logo3d.png";
import Footer from "@components/common/footer/footer";
import axiosClient from "@services/axiosClient";
import ForgotPasswordPopup from "./forgotPasswordPopup";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Load users từ mock API ảo
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Không thể load users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.email === userName && u.password === password
    );

    if (foundUser) {
      sessionStorage.setItem("userData", JSON.stringify(foundUser));
      toast.success("Đăng nhập thành công!");

      setTimeout(() => {
        navigate("/reality3d/home-page");
      }, 1500);
      setErrorMessage("");
    } else {
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không hợp lệ");
    }
  };

  return (
    <div className="login-page">
      {showForgotPassword && (
        <ForgotPasswordPopup onClose={() => setShowForgotPassword(false)} />
      )}

      <div className="login-content">
        <div className="login-header">
          <img
            src={icon_image_shop3D}
            alt="Reality Print 3D"
            width="70"
            height="70"
            style={{ borderRadius: "50%" }}
          />
          <h1>Reality 3D</h1>
        </div>

        <div className="login-box">
          <h2>Đăng nhập</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="login-input-group">
              <FaRegUserCircle className="icon" />
              <input
                placeholder="Tên đăng nhập"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="login-input-group">
              <FaLock className="icon" />
              <input
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="login-actions">
              <button type="button" onClick={handleLogin}>
                ĐĂNG NHẬP
              </button>
            </div>
            <div className="login-links">
              <button
                type="button"
                className="link-button"
                onClick={() => setShowForgotPassword(true)}
              >
                Quên mật khẩu
              </button>
              <a href="/reality3d/registration-account">Đăng ký</a>
            </div>
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}
