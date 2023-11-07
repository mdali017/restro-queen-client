import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import categoryImg1 from "../../../assets/home/slide1.jpg";
import categoryImg2 from "../../../assets/home/slide2.jpg";
import categoryImg3 from "../../../assets/home/slide3.jpg";
import categoryImg4 from "../../../assets/home/slide4.jpg";
import categoryImg5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle";

const Category = () => {
  return (
    <section className="w-9/12 mx-auto my-16">
      <SectionTitle
        subHeading="From 11:00 to 10:00pm"
        heading="Order Now"
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={categoryImg1} alt="" />
          <h1 className="text-2xl uppercase -mt-16 text-white">Salad</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={categoryImg2} alt="" />
          <h1 className="text-2xl uppercase -mt-16 text-white">Pizza</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={categoryImg3} alt="" />
          <h1 className="text-2xl uppercase -mt-16 text-white">Soup</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={categoryImg4} alt="" />
          <h1 className="text-2xl uppercase -mt-16 text-white">Dessert</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={categoryImg5} alt="" />
          <h1 className="text-2xl uppercase -mt-16 text-white">Drinks</h1>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
