import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import axiosClient from "../../services/api/api";
import { useParams } from "react-router-dom";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  {
    name: "Dashboard",
    path: "/reality3d/management/management-dashboard-page",
    current: false,
  },
  {
    name: "Accounts",
    path: "/reality3d/management/management-accounts-page",
    current: false,
  },
  {
    name: "Products",
    path: "/reality3d/management/management-products-page",
    current: false,
  },
  {
    name: "Service",
    path: "/reality3d/management/management-services-page",
    current: false,
  },
  {
    name: "Blogs",
    path: "/reality3d/management/management-blogs-page",
    current: false,
  },
  {
    name: "Orders",
    path: "/reality3d/management/management-orders-page",
    current: false,
  },
  {
    name: "Vouchers",
    path: "/reality3d/management/management-vouchers-page",
    current: false,
  },
  {
    name: "Feedbacks",
    path: "/reality3d/management/management-feedbacks-page",
    current: false,
  },
  {
    name: "Categories",
    path: "/reality3d/management/management-categories-page",
    current: false,
  },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ManagementBlogsDetails() {
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  function toggleOpen() {
    setOpen(!open);
  }

  const fetchProductsDetails = async (productId) => {
    try {
      const response = await axiosClient.get(
        `/api/Product/GetProductById?id=${productId}`
      );
      setProductDetails(response.data);
    } catch (error) {
      setError("Error fetching user details.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductsDetails(id);
    } else {
      setError("Error: No user ID provided.");
    }
  }, [id]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <Fragment>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.path}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton
                      type="button"
                      onClick={toggleOpen}
                      className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-blue focus-ring-offset-blue"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-auto w-auto"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-auto w-auto"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel
                className="md:hidden"
                style={{ maxHeight: "calc(100vh - 16rem)" }}
              >
                <div className="space-y-1 px-[4px] pb-[3px] pt-[2px] sm:px-[6px]">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.path}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-[4px] py-[2px] text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-gray-streamer pb-[3px] pt-[4px]">
                  <div className="flex items-center px-[4px]">
                    <div className="flex-shrink-0">
                      <img
                        className="h-auto w-auto rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-[3px]">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-streamer">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-streamer p-[1px] text-gray-streamer hover:text-white focus:outline-none focus-ring-blue focus-ring-offset-blue"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-auto w-auto" aria-hidden="true" />
                    </button>
                  </div>
                  <Menu as={Fragment} className="">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-streamer" : "",
                              "block px-[4px] py-[2px] text-sm font-medium leading-none text-gray-streamer"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </DisclosurePanel>
            </Fragment>
          )}
        </Disclosure>

        <header className="bg-white shadow h-16 w-full">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Management Details Accounts
            </h1>
          </div>
        </header>
        {/* Main  */}
        <div>
          <main>
            <div className="flex flex-wrap justify-center mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-screen w-full">
              <div className="w-full h-full">
                {productDetails ? (
                  <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">ID:</span>
                        <span>{productDetails.id}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Product Name:</span>
                        <span>{productDetails.productName}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Description:</span>
                        <span>{productDetails.description}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Price:</span>
                        <span>{productDetails.price}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Quantity:</span>
                        <span>{productDetails.quantity}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Status:</span>
                        <span
                          className={
                            productDetails.status === 1
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {productDetails.status === 1
                            ? "Còn hàng"
                            : "Hết hàng"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Category:</span>
                        <span>{productDetails.category?.title}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Image:</span>
                        <img
                          className="h-12 w-12 rounded-full"
                          src={productDetails.imageUrl}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-4">Loading...</div>
                )}
                {error && (
                  <div className="text-red-500 text-center mt-4">{error}</div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
