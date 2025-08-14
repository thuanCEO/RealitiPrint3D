import React, { useState } from "react";
import "@pages/Contact/contactPage.scss";
import Footer from "@components/common/footer/footer";
import AboutUsPage from "@pages/AboutUs/aboutUsPage";
import Header from "@components/common/header/header";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Header />
      <div className="contact-page">
        <h1 className="page-title">Liên Hệ Với Chúng Tôi</h1>
        <div className="contact-container">
          <div className="contact-info">
            <h2>Thông Tin Liên Hệ</h2>
            <p><strong>Địa chỉ:</strong> TTC Tower, 253 Hoàng Văn Thụ, Tân Bình, TP.HCM</p>
            <p><strong>Điện thoại:</strong> 0333 888 257</p>
            <p><strong>Email:</strong> inreality0102@gmail.com</p>
            <iframe
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowfullscreen
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3919.14556983435!2d106.66207417408779!3d10.80016085875741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zVFRDIFRvd2VyLCAyNTMgSG_DoG5nIFbEg24gVGjhu6UsIFTDom4gQsOsbmgsIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1755143680987!5m2!1svi!2s"
              title="Bản đồ TTC Tower"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-form">
            <h2>Gửi Tin Nhắn</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Nội dung"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Gửi Ngay</button>
            </form>
          </div>
        </div>
      </div>
      <AboutUsPage />
      <Footer />
    </>
  );
};

export default ContactPage;
