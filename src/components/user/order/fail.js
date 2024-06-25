import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import axiosClient from "../../../services/api/api";
import React, { useState, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrdersFail() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("id");
        if (!userId) {
          throw new Error("User ID not found in session");
        }

        const response = await axiosClient.get(
          `/api/User/GetUserById?id=${userId}`
        );

        const data = response.data;
        console.log("Parsed user data:", data);
        const sortedOrders = (data.orders || []).sort((a, b) => b.id - a.id);

        // Filter out orders with status 4 or 5
        const filteredOrders = sortedOrders.filter(
          (order) => order.status === 5
        );
        setOrderHistory(filteredOrders);

        await Promise.all(
          filteredOrders.map(async (order) => {
            await Promise.all(
              order.orderDetails.map(async (detail) => {
                await fetchProductDetails(detail.productId);
              })
            );
          })
        );

        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axiosClient.get(
        `/api/Product/GetProductById?id=${productId}`
      );
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: response.data,
      }));
    } catch (error) {
      setError("Error fetching product details.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Loading state while data is fetching
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <main className="py-24">
        <section aria-labelledby="recent-heading" className="mt-16">
          <h2 id="recent-heading" className="sr-only">
            Recent orders
          </h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                  >
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={order.createdDatetime}>
                        {order.createdDate}
                      </time>
                    </h3>

                    <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                      <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Mã đơn hàng
                          </dt>
                          <dd className="mt-1 text-gray-500">{order.id}</dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Trạng Thái
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            {order.status === 1
                              ? "Chờ xác nhận"
                              : order.status === 2
                              ? "Chờ lấy hàng"
                              : order.status === 3
                              ? "Chờ giao hàng"
                              : order.status === 4
                              ? "Đã giao hàng"
                              : order.status === 5
                              ? "Đã hủy"
                              : ""}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Tổng tiền
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {order.totalPrice.toLocaleString()}
                          </dd>
                        </div>
                      </dl>

                      <Menu
                        as="div"
                        className="relative flex justify-end lg:hidden"
                      >
                        <div className="flex items-center">
                          <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">
                              Options for order {order.id}
                            </span>
                            <EllipsisVerticalIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </MenuButton>
                        </div>

                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href={order.href}
                                    className={classNames(
                                      focus
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    View
                                  </a>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href={order.invoiceHref}
                                    className={classNames(
                                      focus
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Invoice
                                  </a>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Transition>
                      </Menu>

                      <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        <a
                          href={order.href}
                          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span>View Order</span>
                          <span className="sr-only">{order.number}</span>
                        </a>
                      </div>
                    </div>

                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                      {order.orderDetails.map((detail) => {
                        const product = productDetails[detail.productId];
                        return product ? (
                          <li key={detail.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                <img
                                  src={product.imageUrl}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-6 flex-1 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                  <h5>{product.name}</h5>
                                  <p className="mt-2 sm:mt-0">
                                    {product.price}
                                  </p>
                                </div>
                                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li key={detail.id} className="p-4 sm:p-6">
                            <div>Loading...</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              ) : (
                <div>Không có dữ liệu.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
