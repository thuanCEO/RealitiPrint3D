import React, { useState } from "react";
import "./registration.scss";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaEyeSlash, FaEye } from "react-icons/fa";
import icon_image_shop3D from "../../../assets/images/logos/logoShopPrint3D.png";
import icon_logo_google from "../../../assets/images/logos/google-icon.png";
import Footer from "../../Common/footer/footer";
import axiosClient from "../../../services/api/api";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!username) {
      setUsernameError("Tên đăng nhập không được để trống.");
      isValid = false;
    } else if (!username.endsWith("@gmail.com")) {
      setUsernameError("Tên đăng nhập phải có đuôi là @gmail.com.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Mật khẩu không được để trống.");
      isValid = false;
    } else if (password.length <= 6) {
      setPasswordError("Mật khẩu phải dài hơn 6 ký tự.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu và xác nhận mật khẩu không khớp.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axiosClient.post(
        "api/User/CreateUser",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response for debugging
      console.log("Response:", response);

      if (response.status === 200 || response.status === 201) {
        alert(
          "Bạn đã đăng kí thành công tài khoản, vui lòng đăng nhập vào hệ thống !!"
        );
        navigate("/reality3d/login-account");
      } else {
        alert("Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error while registering:", error);
      alert("Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
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
        <div className="login-box">
          <h1 className="login-title">Đăng Kí Tài Khoản</h1>
          <form className="login-form">
            <div className="login-input-group">
              <input
                placeholder="Tên đăng nhập"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
              <FaRegUserCircle className="icon" />
              {usernameError && (
                <p className="error-message">{usernameError}</p>
              )}
            </div>
            <div className="login-input-group">
              <input
                placeholder="Mật khẩu"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="icon" />
                ) : (
                  <FaEye className="icon" />
                )}
              </span>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
            <div className="login-input-group">
              <input
                placeholder="Xác nhận lại mật khẩu"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login-input"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="icon" />
                ) : (
                  <FaEye className="icon" />
                )}
              </span>
              {confirmPasswordError && (
                <p className="error-message">{confirmPasswordError}</p>
              )}
            </div>
            <div className="container">
              <div className="login-account">
                <a href="/reality3d/login-account">Đăng Nhập</a>
              </div>
              <div className="home-page">
                <a href="/reality3d/home-page">Trang Chủ</a>
              </div>
            </div>
            <br />
            <div className="login-button-group">
              <button
                type="button"
                className="login-button"
                onClick={handleRegister}
              >
                ĐĂNG KÍ
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
