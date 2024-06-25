import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/header/header";
import Footer from "../../Common/footer/footer";
import ProfileFormat from "./profileForm";

export default function ProfilePages() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem("userData");
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-800 text-white border-r border-gray-700">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center text-white">
                Thông tin cá nhân
              </h1>
            </div>
            <nav className="mt-6">
              <ul>
                <li>
                  <Link
                    to={"/reality3d/profile-page"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Thông tin
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/reality3d/profile-page/change-password"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Đổi Mật Khẩu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/reality3d/history-page"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Xem đơn hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/reality3d/history-orders-page"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Lịch sử mua hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/reality3d/history-orders-fail-page"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Đơn hàng bị hủy
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-6 bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
              <h2 className="text-2xl font-bold text-center">
                Chi tiết thông tin cá nhân
              </h2>
              <ProfileFormat />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
