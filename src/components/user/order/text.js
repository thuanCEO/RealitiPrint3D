import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import axiosClient from "../../../services/api/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("id"); // Retrieve user ID from local storage
        if (!userId) {
          throw new Error("User ID not found in session");
        }

        const response = await axiosClient.get(
          `/api/User/GetUserById?id=${userId}`
        );
        const data = response.data; // Axios already parses JSON
        console.log("Parsed user data:", data); // Debugging statement
        setOrderHistory(data.orders || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

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
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500">{order.id}</dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Total amount
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {order.totalPrice}
                          </dd>
                        </div>
                      </dl>

                      <Menu
                        as="div"
                        className="relative flex justify-end lg:hidden"
                      >
                        <div className="flex items-center">
                          <MenuButton className="-m-2 flex items-center p-2 text-gray-400">
                            <EllipsisVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </MenuButton>
                          <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <MenuItem>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    View Details
                                  </div>
                                )}
                              </MenuItem>
                            </MenuItems>
                          </Transition>
                        </div>
                      </Menu>
                    </div>
                  </div>
                ))
              ) : (
                <div>Không có dữ liệu.</div>
              )}
              {error && <div className="text-red-500">Error: {error}</div>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
