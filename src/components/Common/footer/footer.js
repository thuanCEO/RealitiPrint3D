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
      <div className="header-container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer__about">
              <div className="footer__widget">
                <h6 className="footer__about__logo">REALITY 3D</h6>
              </div>
              <ul>
                <li>Địa chỉ: Q9, Thủ Đức</li>
                <li>TP Hồ Chí Minh</li>
                <li>Liên hệ: 0333888257</li>
                <li>Email: inreality0102@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="footer__widget">
              <h6>Cửa Hàng</h6>
              <ul>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Reality Blog
                  </Link>
                </li>

                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Thông tin về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Chính Sách Bảo Mật
                  </Link>
                </li>

                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Trả Hàng & Hoàn Tiền
                  </Link>
                </li>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Sản phẩm kinh doanh
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Giới Thiệu Về Reality 3D Việt Nam
                  </Link>
                </li>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Chăm Sóc Khách Hàng
                  </Link>
                </li>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Liên Hệ Với Truyền Thông
                  </Link>
                </li>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Chương Trình Tiếp Thị Liên Kết{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/reality3d/view-information-about-page">
                    Chính Sách Bảo Hành
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="footer__widget">
              <h6>Khuyến mãi & ưu đãi</h6>
              <p>Đăng ký nhận thông tin tại đây</p>
              <form action="/reality3d/view-information-about-page">
                <div className="input-group">
                  <input type="text" placeholder="Nhập email"></input>
                  <button type="submit" className="button-submit">
                    Đăng ký
                  </button>
                </div>
                <div className="footer__widget_social">
                  <div>
                    <AiOutlineFacebook />
                  </div>
                  <div>
                    <AiOutlineInstagram />
                  </div>
                  <div>
                    <AiOutlineLinkedin />
                  </div>
                  <div>
                    <AiOutlineTwitter />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
