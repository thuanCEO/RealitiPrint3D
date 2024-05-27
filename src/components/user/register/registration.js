import React, { useState } from "react";
import "./registration.scss";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import icon_image_shop3D from "../../../assets/images/logos/logoShopPrint3D.png";
import icon_logo_google from "../../../assets/images/logos/google-icon.png";
import Footer from "../../Common/footer/footer";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username.trim() === "admin" && password.trim() === "123") {
      console.log("Login successful");
      setErrorMessage("");
      navigate("/reality3d/home-page");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div>
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
        {" "}
        <div className="login-box">
          {" "}
          <h1 className="login-title">Đăng Kí Tài Khoản</h1>
          <form className="login-form">
            <div className="login-input-group">
              <input
                placeholder="Tên đăng nhập "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="login-input-group">
              <input
                placeholder="Xát nhận lại mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <FaLock className="icon" />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="container">
              <div className="login-account">
                <a href="/reality3d/login-account">Đăng Nhập</a>
              </div>
              <div className="home-page">
                <a href="/reality3d/home-page">Trang Chủ</a>
              </div>
            </div>
            <br></br>
            <div className="login-button-group">
              <button
                type="button"
                className="login-button"
                onClick={handleRegister}
              >
                ĐĂNG NHẬP
              </button>
            </div>
            <div className="login-button-group">
              <button type="button" className="login-button">
                <img
                  src={icon_logo_google}
                  alt="login-button"
                  width="26px"
                  height="14px"
                />
                <span className="login-google-span">Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
