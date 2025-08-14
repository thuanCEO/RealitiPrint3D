import React from "react";
import "@pages/AboutUs/aboutUsPage.scss";

const people = [
  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("@assets/images/users/people/dht.jpg"),
    description:
      "Người sáng lập và điều hành công ty, chịu trách nhiệm định hướng chiến lược phát triển và quản lý hoạt động kinh doanh.",
    responsibility: [
      "Xây dựng tầm nhìn và chiến lược công ty",
      "Quản lý đội ngũ lãnh đạo",
      "Kết nối đối tác và nhà đầu tư",
    ],
  },
  {
    name: "Đỗ Hữu Thuận",
    role: "Trưởng phòng Kinh doanh",
    imageUrl: require("@assets/images/users/people/dht.jpg"),
    description:
      "Quản lý đội kinh doanh, phát triển thị trường và đảm bảo doanh thu mục tiêu.",
    responsibility: [
      "Xây dựng và triển khai kế hoạch bán hàng",
      "Huấn luyện đội ngũ kinh doanh",
      "Phát triển mối quan hệ khách hàng",
    ],
  },
  {
    name: "Đỗ Hữu Thuận",
    role: "Chuyên viên Marketing",
    imageUrl: require("@assets/images/users/people/dht.jpg"),
    description:
      "Phụ trách chiến lược truyền thông, quảng bá thương hiệu và sản phẩm.",
    responsibility: [
      "Lập kế hoạch marketing",
      "Triển khai chiến dịch quảng cáo",
      "Phân tích thị trường và đối thủ",
    ],
  },
];

const AboutUsPage = () => {
  return (
    <div className="about-page">
      {/* Story */}
      <section className="about-section">
        <div className="about-text">
          <h2>Câu Chuyện Của Chúng Tôi</h2>
          <p>
            Chúng tôi khởi nguồn từ niềm đam mê mang đến những sản phẩm chất
            lượng, dịch vụ chu đáo và trải nghiệm mua sắm vượt trội cho mọi
            khách hàng.
          </p>
          <p>
            Trải qua nhiều năm phát triển, chúng tôi đã xây dựng một đội ngũ
            chuyên nghiệp, tận tâm, và luôn không ngừng cải tiến để phục vụ tốt
            hơn.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <h2>Đội Ngũ Của Chúng Tôi</h2>
        <div className="team-cards">
          {people.map((person, idx) => (
            <div className="team-card" key={idx}>
              <img src={person.imageUrl} alt={person.name} />
              <h3>{person.name}</h3>
              <p className="role">{person.role}</p>
              <p className="description">{person.description}</p>
              <ul className="responsibility-list">
                {person.responsibility.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
