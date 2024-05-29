import React from "react";
import Footer from "../../Common/footer/footer";
import AboutUsPage from "./aboutus";
import Header from "../../Common/header/header";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div>
        <div class="max-w-lg lg:ms-auto mx-auto mt-30 mb-30 text-center">
          <div class="py-16 px-7 rounded-md bg-white">
            <form class="" action="" method="POST">
              <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div class="md:col-span-2">
                  <label
                    for="subject"
                    class="float-left block  font-normal text-gray-400 text-lg"
                  >
                    (Họ & Tên) Khách Hàng
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Điền đầy đủ họ và tên"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>
                <div class="md:col-span-2">
                  <label
                    for="subject"
                    class="float-left block  font-normal text-gray-400 text-lg"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại liên hệ"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>
                <div class="md:col-span-2">
                  <label
                    for="subject"
                    class="float-left block  font-normal text-gray-400 text-lg"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Điền email liên hệ"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>
                <div class="md:col-span-2">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    class="peer block w-full appearance-none border-none   bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  />
                </div>
                <div class="md:col-span-2">
                  <textarea
                    name="message"
                    rows="5"
                    cols=""
                    placeholder="Gửi tin nhắn về chúng tôi"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  ></textarea>
                </div>
                <div class="md:col-span-2">
                  <button class="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300">
                    Gửi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AboutUsPage />
      <Footer />
    </>
  );
}
