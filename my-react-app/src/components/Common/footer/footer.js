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
              <h2 className="footer__about__logo">REALITY 3D</h2>
              <ul>
                <li>Địa chỉ: Q9, Thủ Đức, TP Hồ Chí Minh</li>
                <li>Liên hệ: 0333888257</li>
                <li>Email: reality3d@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="footer__widget">
              <h6>Cửa Hàng</h6>
              <ul>
                <li>
                  <Link to="#">Liên hệ</Link>
                </li>
                <li>
                  <Link to="#">Thông tin về chúng tôi</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm kinh doanh</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="#">Thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to="#">Thông tin về chúng tôi</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm kinh doanh</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="footer__widget">
              <h6>Khuyến mãi & ưu đãi</h6>
              <p>Đăng ký nhận thông tin tại đây</p>
              <form action="#">
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
