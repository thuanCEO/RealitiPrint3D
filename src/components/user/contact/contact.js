import React, { useState, useEffect } from "react";
import Footer from "../../Common/footer/footer";
import AboutUsPage from "./aboutus";
import Header from "../../Common/header/header";
import axiosClient from "../../../services/api/api";

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State để hiển thị popup thành công

  useEffect(() => {
    // Retrieve user data from session storage when component mounts
    const userDataFromStorage = sessionStorage.getItem("userData");
    if (userDataFromStorage) {
      const parsedData = JSON.parse(userDataFromStorage);
      setFullName(parsedData.fullName || "");
      setPhone(parsedData.phoneNumber || "");
      setEmail(parsedData.email || "");
      setAddress(parsedData.address || "");
    }
  }, []);
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("toEmail", email);
      formData.append("subject", fullName || "No Subject");
      formData.append("message", message || "No message provided");

      // attachments.forEach((file) => {
      //   formData.append("attachments", file);
      // });

      // Prepare the request parameters
      const params = {
        toEmail: email,
        subject: fullName || "No Subject",
        message: message || "No message provided",
      };

      // Make the POST request to the API
      const response = await axiosClient.post(
        `/api/User/SendEmail?toEmail=${email}&subject=${fullName}&message=${message}`,
        params,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Handle success response
      if (response.status === 200) {
        console.log("Email sent successfully!");
        setShowSuccessPopup(true); // Hiển thị popup thành công
        // Optionally, reset the form fields after successful submission
        setFullName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setMessage("");
        setAttachments([]);
      } else {
        console.error("Failed to send email.");
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error scenario
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state based on input changes
    if (name === "fullName") {
      setFullName(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false); // Đóng popup thành công
  };

  return (
    <>
      <Header />
      <div className="max-w-lg lg:ms-auto mx-auto mt-30 mb-30 text-center">
        <div className="py-16 px-7 rounded-md bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="fullName"
                  className="float-left block font-normal text-gray-400 text-lg"
                >
                  (Họ & Tên) Khách Hàng
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Điền đầy đủ họ và tên"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  value={fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="phone"
                  className="float-left block font-normal text-gray-400 text-lg"
                >
                  Số điện thoại
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Số điện thoại liên hệ"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  value={phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="float-left block font-normal text-gray-400 text-lg"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Điền email liên hệ"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="float-left block font-normal text-gray-400 text-lg"
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Địa chỉ của bạn"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  value={address}
                  onChange={handleInputChange}
                />
              </div>
              {/* <input
                type="file"
                id="attachments"
                name="attachments"
                multiple
                onChange={handleFileInputChange}
              /> */}
              <div className="md:col-span-2">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Gửi tin nhắn về chúng tôi"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  value={message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300"
                >
                  Gửi
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Gửi email thành công!</h2>
            <p className="text-lg mb-4">
              Email của bạn đã được gửi thành công.
            </p>
            <button
              className="py-2 px-4 bg-blue-800 text-white rounded hover:bg-blue-700 focus:outline-none"
              onClick={closePopup}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      <AboutUsPage />
      <Footer />
    </>
  );
};

export default ContactPage;
