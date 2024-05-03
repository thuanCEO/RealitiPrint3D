import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./homePage.scss";
import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";
import sliderImg1 from "../../assets/images/sliders/slider1.jpg";
import sliderImg2 from "../../assets/images/sliders/slider2.jpg";
import sliderImg3 from "../../assets/images/sliders/slider3.jpg";
import sliderImg4 from "../../assets/images/sliders/slider4.jpg";
import sliderImg5 from "../../assets/images/sliders/slider5.jpg";
export default function Login() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const sliderItems = [
    { bgImg: sliderImg1, name: "Áo Thun" },
    { bgImg: sliderImg2, name: "Áo Thug" },
    { bgImg: sliderImg3, name: "Áo thin" },
    { bgImg: sliderImg4, name: "Áo" },
    { bgImg: sliderImg5, name: "Áo" },
  ];

  return (
    <div>
      <Header />
      {/*Categories Slider */}
      <div className="header-container container__categories_slider">
        <Carousel responsive={responsive} className="categories_slider">
          {sliderItems.map((item, key) => (
            <div
              className="categories_slider_item"
              style={{ backgroundImage: `url(${item.bgImg})` }}
              key={key}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
      {/*Featured */}
      <div className="header-container">
        <div className="featured">
          <div className="section-title">
            <h2>Sản Phẩm Nổi Bật</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
