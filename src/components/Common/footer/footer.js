// src/components/Footer.js
import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">REALITY 3D</h3>
          <ul className="footer-info">
            <li>Địa chỉ: Q9, Thủ Đức</li>
            <li>TP Hồ Chí Minh</li>
            <li>Liên hệ: 0333888257</li>
            <li>Email: inreality0102@gmail.com</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Cửa Hàng</h4>
          <ul>
            <li><Link to="/reality3d/view-information-about-page">Reality Blog</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Thông tin về chúng tôi</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Chính Sách Bảo Mật</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Trả Hàng & Hoàn Tiền</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Sản phẩm kinh doanh</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Về Reality 3D</h4>
          <ul>
            <li><Link to="/reality3d/view-information-about-page">Giới Thiệu Về Reality 3D Việt Nam</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Chăm Sóc Khách Hàng</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Liên Hệ Với Truyền Thông</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Chương Trình Tiếp Thị Liên Kết</Link></li>
            <li><Link to="/reality3d/view-information-about-page">Chính Sách Bảo Hành</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Khuyến mãi & ưu đãi</h4>
          <p>Đăng ký nhận thông tin tại đây</p>
          <form>
            <div className="input-group">
              <input type="email" placeholder="Nhập email" />
              <button type="submit">Đăng ký</button>
            </div>
          </form>
          <div className="social-icons">
            <AiOutlineFacebook />
            <AiOutlineInstagram />
            <AiOutlineLinkedin />
            <AiOutlineTwitter />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Reality 3D - All Rights Reserved
      </div>
    </footer>
  );
}
