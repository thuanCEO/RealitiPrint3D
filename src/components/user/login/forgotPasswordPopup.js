import React, { useState } from "react";

import { toast } from "react-toastify";
import "./forgotPasswordPopup.scss";
import axiosClient from "../../../services/api/api";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSendRequest = async () => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await axiosClient.post(
        `api/User/ForgotPassword?email=${encodedEmail}`,
        {}
      );
      console.log("Response:", response.data);
      toast.success("Đã gửi yêu cầu đổi mật khẩu!");
      onClose();
    } catch (error) {
      console.error("Failed to send request:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-inner">
        <h2>Nhập địa chỉ email để đặt lại mật khẩu</h2>
        <input
          type="email"
          placeholder="Nhập địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="popup-input"
        />
        <div className="popup-buttons">
          <button onClick={handleSendRequest} className="submit-button">
            Gửi yêu cầu
          </button>
          <button onClick={onClose} className="close-button">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
