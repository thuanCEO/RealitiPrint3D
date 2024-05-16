import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./homePage.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";
import BlogPage from "./blogPage";

import ProductsList from "../../components/products/productList/productList";
import NewProducts from "../home/newProducts";

import sliderImg1 from "../../assets/images/sliders/slider1.jpg";
import sliderImg2 from "../../assets/images/sliders/slider2.jpg";
import sliderImg3 from "../../assets/images/sliders/slider3.jpg";
import sliderImg4 from "../../assets/images/sliders/slider4.jpg";
import sliderImg5 from "../../assets/images/sliders/slider5.jpg";

import featureImg1 from "../../assets/images/sliders/slider1.jpg";
import featureImg2 from "../../assets/images/sliders/slider2.jpg";
import featureImg3 from "../../assets/images/sliders/slider3.jpg";
import featureImg4 from "../../assets/images/sliders/slider4.jpg";
import featureImg5 from "../../assets/images/sliders/slider5.jpg";
import featureImg6 from "../../assets/images/sliders/slider3.jpg";
import featureImg7 from "../../assets/images/sliders/slider2.jpg";
import featureImg8 from "../../assets/images/sliders/slider5.jpg";

import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatter } from "../../utils/constants/fomatter";

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

  const featProduct = {
    all: {
      title: "Toàn bộ",
      products: [
        {
          img: featureImg1,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg2,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg3,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg4,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg5,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg1,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg2,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg3,
          name: "Áo thun",
          price: 200000,
        },
      ],
    },
    freshProduct: {
      title: "Áo Sạch",
      products: [
        {
          img: featureImg5,
          name: "Áo Hoodie",
          price: 200000,
        },
        {
          img: featureImg6,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg7,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg8,
          name: "Áo thun",
          price: 200000,
        },
      ],
    },
    freshModel: {
      title: "Model 3D",
      products: [
        {
          img: featureImg1,
          name: "Super Goku",
          price: 200000,
        },
        {
          img: featureImg4,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg2,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: featureImg6,
          name: "Áo thun",
          price: 200000,
        },
      ],
    },
  };

  const renderFeaturedProducts = (data) => {
    const tabList = [];
    const tabPanels = [];

    Object.keys(data).forEach((key, index) => {
      tabList.push(<Tab key={index}>{data[key].title}</Tab>);
      const tabPanel = [];
      data[key].products.forEach((item, j) => {
        tabPanel.push(
          <div className="col-lg-3" key={j}>
            <div className="featured__item">
              <div
                className="featured__item__pic"
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              >
                <ul className="featured__item__pic__hover">
                  <li>
                    <AiOutlineEye />
                  </li>
                  <li>
                    <AiOutlineShoppingCart />
                  </li>
                </ul>
              </div>
              <div className="featured__item__text">
                <h6>
                  <Link to="#">{item.name}</Link>
                </h6>
                <h5>{formatter(item.price)}</h5>
              </div>
            </div>
          </div>
        );
      });
      tabPanels.push(tabPanel);
    });

    return (
      <Tabs>
        <TabList>{tabList}</TabList>
        {tabPanels.map((item, key) => (
          <TabPanel key={key}>
            <div className="row">{item}</div>
          </TabPanel>
        ))}
      </Tabs>
    );
  };

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
      <NewProducts />
      {/*Featured */}
      {/* <div className="header-container">
        <div className="featured">
          <div className="section-title">
            <h2>Sản Phẩm Nổi Bật</h2>
            {renderFeaturedProducts(featProduct)}
          </div>
        </div>
      </div> */}
      <ProductsList />
      {/*Banner */}
      {/* <div className="header-container">
        <div className="banner">
          <div className="banner__pic">
            <img src={featureImg4} alt="banner"></img>
          </div>
          <div className="banner__pic">
            <img src={featureImg3} alt="banner"></img>
          </div>
        </div>
      </div> */}
      <BlogPage />
      <Footer />
    </div>
  );
}
