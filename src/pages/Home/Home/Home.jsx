import React from "react";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "../Featured/Featured";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Restro Queen</title>
      </Helmet>
      <Banner />
      <Category />
      <PopularMenu />
      <Featured />
    </div>
  );
};

export default Home;
