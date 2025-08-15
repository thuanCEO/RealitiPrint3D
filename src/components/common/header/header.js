import React, { useEffect, useState } from "react";
import "./header.scss";
import {
  AiOutlineFacebook,
  AiOutlineMail,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "@utils/constants/routers";
import RunningNotification from "../../../containers/home/saleNotificationPopup";
import SearchBar from "@pages/Searchs/searchBar";

export default function Header() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
    const total = cartData.reduce((t, item) => t + item.quantity, 0);
    setTotalItems(total);
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("userData");
    if (user) {
      setUserData(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/reality3d/home-page");
  };

  const toggleProfileMenu = () => setProfileMenuOpen(!isProfileMenuOpen);

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header-main");
      if (window.scrollY > 10) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menus = [
    { name: "Trang Chủ", path: ROUTERS.USER.HOME },

    { name: "Model", path: ROUTERS.USER.MODELS },
    { name: "Áo 3D", path: ROUTERS.USER.PRODUCTS },
    { name: "Thiết Kế", path: ROUTERS.USER.DESIGN },
    { name: "Bài Viết", path: ROUTERS.USER.BLOGS },
    { name: "Liên Hệ", path: ROUTERS.USER.CONTACT },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="header-on-top">
        <div className="header-container">
          <ul className="header-top-left">
            <li><AiOutlineMail /> <span>inreality0102@gmail.com</span></li>
            <li>Ship toàn quốc</li>
          </ul>
          <ul className="header-top-right">
            <li>
              <Link to="https://www.facebook.com/realityprint3d.page">
                <AiOutlineFacebook />
              </Link>
            </li>
            <li>
              {!isLoggedIn && <Link to="/reality3d/login-account"><span>Đăng Nhập</span></Link>}
              {isLoggedIn && (
                <div className="profile-menu-container">
                  <span className="profile-menu-trigger" onClick={toggleProfileMenu}>
                    {userData?.name} <AiOutlineUser />
                  </span>
                  {isProfileMenuOpen && (
                    <ul className="profile-menu">
                      <li><Link to="/reality3d/profile-page">Thông tin</Link></li>
                      <li><span onClick={handleLogout}>Đăng Xuất</span></li>
                    </ul>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Notification */}
      {showNotification && <RunningNotification duration={1000} />}

      {/* Main Header */}
      <div className="header-main">
        <div className="header-container">
          <div className="header-logo">
            <h1>REALITY 3D</h1>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/webid-6c809.appspot.com/o/logo3d.jpg?alt=media"
              alt="Logo"
            />
          </div>

          {/* Menu */}
          <nav className="header-menu">
            <ul>
              {menus.map((menu, idx) => (
                <li key={idx} className={location.pathname === menu.path ? "active" : ""}>
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              ))}
              <li className="menu-search">
                <SearchBar />
              </li>
              <li className="header-cart">
                <Link to="/reality3d/view-cart">
                  <AiOutlineShoppingCart />
                  {totalItems > 0 && <span>{totalItems}</span>}
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </>
  );
}
