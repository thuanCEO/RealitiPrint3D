import React, { useState, useEffect } from "react";
import axiosClient from "../../../services/api/api";

export default function PasswordFormat({ userId }) {
  // Initialize state for user data
  const [userData, setUserData] = useState({
    id: null, // Initializing id as null
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(false);
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
        avatar: parsedData.avatar || "", // Set the avatar from stored data
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password" || name === "confirmPassword") {
      if (value.length < 6) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Check password length and match
    if (
      userData.password.length < 6 ||
      userData.confirmPassword.length < 6 ||
      userData.password !== userData.confirmPassword
    ) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const formData = new FormData();
      formData.append("id", userData.id);
      formData.append("password", userData.password);

      const response = await axiosClient.put(
        `/api/User/UpdateUserPassword?id=${userData.id}`, // Ensure this matches your backend route
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Password updated successfully", response.data);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        if (error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
        }
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert("An error occurred while updating password.");
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Password */}
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mật khẩu mới
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleChange}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                />
                {passwordError && (
                  <p className="mt-1 text-red-500 text-sm">
                    Mật khẩu phải có ít nhất 6 ký tự.
                  </p>
                )}
              </div>
            </div>
            {/* Confirm Password */}
            <div className="sm:col-span-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nhập lại mật khẩu mới
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                />
                {passwordError && (
                  <p className="mt-1 text-red-500 text-sm">
                    Mật khẩu phải có ít nhất 6 ký tự.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Lưu
        </button>
      </div>
    </form>
  );
}
