import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./featured.css";

const Featured = () => {
  return (
    <section className="featured-item md:py-16">
      <SectionTitle
        subHeading="Featured Item"
        heading="Check It Out"
      ></SectionTitle>
      <div className="flex justify-center items-center py-8 px-16">
        <div className="md:w-1/2 ml-10">
          <img className="w-[400px]" src={featuredImg} alt="" />
        </div>
        <div className="md:ml-10 md:w-1/2 text-white">
          <p className="font-bold">Aug 20, 2023</p>
          <p className="text-3xl font-bold capitalize">Where can i get some</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
            accusantium impedit, quas modi, quae voluptate porro labore deserunt
            aperiam ipsam quia doloribus nihil. Provident esse doloribus nihil
            laudantium reprehenderit atque.
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4">
            Check Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
