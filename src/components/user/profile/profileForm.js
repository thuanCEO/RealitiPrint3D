import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import axiosClient from "../../../services/api/api";

export default function ProfileFormat() {
  // Initialize state for user data
  const [userData, setUserData] = useState({
    id: null, // Initializing id as null
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    avatar: "",
    userName: "",
    password: "",
    status: 1,
    roleId: 3,
  });

  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem("userData");
    if (userDataFromStorage) {
      const parsedData = JSON.parse(userDataFromStorage);
      setUserData((prevState) => ({
        ...prevState,
        ...parsedData,
        fullName: parsedData.fullName || "",
        phoneNumber: parsedData.phoneNumber || "",
        email: parsedData.email || "",
        address: parsedData.address || "",
        id: parsedData.id || null, // Setting id from storage
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedUserData = {
          ...userData,
          avatar: event.target.result,
        };
        setUserData(updatedUserData);
        sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Update the user data in sessionStorage
      const updatedData = {
        ...userData,
        fullName: userData.fullName || "",
        phoneNumber: userData.phoneNumber || "",
        email: userData.email || "",
        address: userData.address || "",
      };

      sessionStorage.setItem("userData", JSON.stringify(updatedData));

      // Check if user ID is available
      if (!userData.id) {
        throw new Error("User ID is missing");
      }
      const formData = new FormData();
      formData.append("id", userData.id);
      formData.append("fullName", userData.fullName);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("email", userData.email);
      formData.append("address", userData.address);
      if (userData.avatar) {
        const blob = await fetch(userData.avatar).then((r) => r.blob());
        formData.append("avatar", blob, "avatar.jpg");
      }

      // Send a PUT request to the API endpoint with JSON content type
      const response = await axiosClient.put(
        `/api/User/UpdateUser?id=${userData.id}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Profile updated successfully", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert("An error occurred while updating profile.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* FULLNAME */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thông tin Họ & Tên
                </label>
                <div className="mt-2">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* PHONE */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Số điện thoại
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    autoComplete="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* EMAIL */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Địa chỉ email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* ĐỊA CHỈ */}
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Địa chỉ hiện tại
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="street-address"
                    value={userData.address}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ẢNH ĐẠI ĐIỆN */}
          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ảnh đại diện
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  Change
                </label>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
