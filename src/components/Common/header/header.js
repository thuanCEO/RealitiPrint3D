import React, { useEffect, useState } from "react";
import "./header.scss";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/constants/routers";

export default function Header() {
  const [userData, setUserData] = useState(null);
  const [isShowCategories, setShowCategories] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem("userData");
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };
  const [menus] = useState([
    {
      name: "Trang Chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Best Sale",
      path: ROUTERS.USER.BEST_SALE,
    },
    {
      name: "Sản Phẩm",
      path: ROUTERS.USER.PRODUCTS,
    },
    {
      name: "Bài Viết",
      path: ROUTERS.USER.BLOGS,
    },
    {
      name: "Liên Hệ",
      path: ROUTERS.USER.CONTACT,
    },
  ]);
  return (
    <>
      <div className="header-on-top">
        <div className="header-container">
          <div className="row">
            <div className="col-6 header-container-top-left">
              <ul>
                <li>
                  <AiOutlineMail />
                  <i className="fa fa-envelope">reality3d@gmail.com</i>
                </li>
                <li>Ship toàn quốc gia Việt Nam</li>
              </ul>
            </div>
            <div className="col-6 header-container-top-right">
              <ul>
                <li>
                  <Link to={""}>
                    <AiOutlineFacebook />
                  </Link>
                </li>
                <li>
                  <Link to={""}>
                    <AiOutlineInstagram />
                  </Link>
                </li>

                <li>
                  {!isLoggedIn && (
                    <Link to={"/reality3d/login-account"}>
                      <span className="span-login">Đăng Nhập</span>
                    </Link>
                  )}
                  {/* {isLoggedIn && (
                    <Link to={"/reality3d/home-page"}>
                      <span className="span-logout" onClick={handleLogout}>
                        Đăng Xuất
                      </span>
                    </Link>
                  )} */}
                  {isLoggedIn && (
                    <div className="profile-menu-container">
                      <span
                        className="profile-menu-trigger"
                        onClick={toggleProfileMenu}
                      >
                        {userData?.name}
                        <AiOutlineUser />
                      </span>{" "}
                      {isProfileMenuOpen && (
                        <ul className="profile-menu">
                          <li>
                            <Link to={"/reality3d/profile"}>Profile</Link>
                          </li>
                          <li>
                            <span
                              className="span-logout"
                              onClick={handleLogout}
                            >
                              Đăng Xuất
                            </span>
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-container">
        <div className="row">
          <div className="col-xl-3">
            <div className="header__logo">
              <h1 className="header__logo__name">REALITY 3D</h1>
            </div>
          </div>
          <div className="col-xl-6">
            <nav className="header__menu">
              <ul>
                {menus?.map((menu, menuKey) => (
                  <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                    <Link to={menu?.path}>{menu?.name}</Link>
                    {menu.child && (
                      <ul className="header__menu__dropdown">
                        {menu.child.map((childItem, childKey) => (
                          <li key={`${menuKey}-${childKey}`}>
                            <Link to={childItem.path}> {childItem.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-xl-3">
            <div className="header__cart">
              <ul>
                <li>
                  <Link to={"/reality3d/view-cart"}>
                    <AiOutlineShoppingCart />
                    <span>10</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-container">
        <div className="row hero__categories_container">
          <div className="col-lg-3 hero__categories">
            <div
              className="hero__categories__all"
              onClick={() => setShowCategories(!isShowCategories)}
            >
              <AiOutlineMenu />
              Danh Sách
            </div>
            {isShowCategories && (
              <ul className={isShowCategories ? "" : "hidden"}>
                <li>
                  <Link to="#">Áo Thun</Link>
                </li>
                <li>
                  <Link to="#">Áo Sơ Mi</Link>
                </li>
                <li>
                  <Link to="#">Model sản phẩm</Link>
                </li>
                <li>
                  <Link to="#">Dịch vụ in ấn</Link>
                </li>
                <li>
                  <Link to="#">Tự tạo</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="col-lg-9 hero__search_container">
            <div className="hero__search">
              <div className="hero__search__form">
                <form>
                  <input
                    type=""
                    name=""
                    value=""
                    placeholder="Tìm kiếm sản phẩm hoặc dịch vụ"
                  ></input>
                  <button type="submit">Tìm kiếm</button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <AiOutlinePhone />
                </div>
                <div className="hero__search__phone__text">
                  <p>0333 888 257</p>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            <div className="hero__item">
              <div className="hero__text"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
