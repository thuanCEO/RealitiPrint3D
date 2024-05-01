import React, { useState } from "react";
import "./header.scss";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatter } from "../../../utils/constants/fomatter";
import { ROUTERS } from "../../../utils/constants/routers";

export default function Header() {
  const [menus, setMenus] = useState([
    {
      name: "Trang Chu",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Cua hang",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "San pham",
      path: ROUTERS.USER.HOME,
      isShowSubmenu: false,
      child: [
        {
          name: "Ao",
          path: ROUTERS.USER.HOME,
        },
        {
          name: "Model",
          path: ROUTERS.USER.HOME,
        },
        {
          name: "Superman",
          path: ROUTERS.USER.HOME,
        },
      ],
    },
    {
      name: "bai viet",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "bai viet",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "",
      path: ROUTERS.USER.HOME,
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
                  helo@gmail.com
                </li>
                <li>mien phi ship {formatter(200000)}</li>
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
                  <Link to={""}>
                    <AiOutlineLinkedin />
                  </Link>
                </li>
                <li>
                  <Link to={""}>
                    <AiOutlineUser />
                    <span className="span-login">Đăng Nhập</span>
                  </Link>
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
              <h1>REALITY 3D</h1>
            </div>
          </div>
          <div className="col-xl-6">
            <nav className="header__menu">
              <ul>
                {menus?.map((menu, menuKey) => (
                  <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                    <Link to={menu?.path}>{menu?.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="ol-xl-3">
            <div className="header__cart">
              <div className="header__cart_price">
                <span>{formatter(120129990)}</span>
              </div>
              <ul>
                <li>
                  <Link to="#">
                    <AiOutlineShoppingCart />
                    <span>10</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
