import React, { useState, useEffect } from "react";
import "@pages/Login/loginPage.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaLock } from "react-icons/fa";

import icon_image_shop3D from "@assets/images/logos/logo3d.png";
import Footer from "@components/common/footer/footer";
import axiosClient from "@services/axiosClient";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleRegister = async () => {
    setErrorMessage("");

    if (!userName || !password || !confirmPassword) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!userName.endsWith("@gmail.com")) {
      setErrorMessage("Tên đăng nhập phải có đuôi @gmail.com.");
      return;
    }

    if (password.length <= 6) {
      setErrorMessage("Mật khẩu phải dài hơn 6 ký tự.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    const exists = users.some((u) => u.email === userName);
    if (exists) {
      setErrorMessage("Email đã được sử dụng.");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: userName.split("@")[0],
      email: userName,
      password,
      role: "user",
      avatar: "/assets/images/avatars/default.jpg",
      phone: "",
      bio: "",
      blogs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await axiosClient.post("/users", newUser);
      toast.success("Đăng ký thành công! Chuyển tới đăng nhập...");

      setTimeout(() => {
        navigate("/reality3d/login-account");
      }, 1500);
    } catch (error) {
      console.error("Đăng ký thất bại", error);
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-page">
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
          <h2>Đăng ký</h2>
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

            <div className="login-input-group">
              <FaLock className="icon" />
              <input
                placeholder="Xác nhận mật khẩu"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="login-actions">
              <button type="button" onClick={handleRegister}>
                ĐĂNG KÝ
              </button>
            </div>

            <div className="login-links">
              <a href="/reality3d/login-account">Đăng nhập</a>
              <a href="/reality3d/home-page">Trang chủ</a>
            </div>
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}
