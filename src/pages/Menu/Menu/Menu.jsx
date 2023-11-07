import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Home/Shared/Cover/Cover";
import coverImg from "../../../assets/menu/menu-bg.jpg";
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle";
import MenuCategory from "../../Home/MenuCategory/MenuCategory";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  return (
    <div>
      <Helmet>
        <title>Menu | Restro Queen</title>
      </Helmet>
      <Cover img={coverImg} title="Our Menu"></Cover>
      <SectionTitle
        subHeading="Don't Miss"
        heading="Todays Offer"
      ></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>
      {/* Dessert Menu Item */}
      <MenuCategory
        items={dessert}
        title="dessert"
        coverImg={dessertImg}
      ></MenuCategory>

      {/* Pizza Menu Item */}
      <MenuCategory
        items={pizza}
        title="pizza"
        coverImg={pizzaImg}
      ></MenuCategory>

      {/* Salads Menu Item */}
      <MenuCategory
        items={salad}
        title="salad"
        coverImg={saladImg}
      ></MenuCategory>

      {/* Soup Menu Item */}
      <MenuCategory items={soup} title="soup" coverImg={soupImg}></MenuCategory>
    </div>
  );
};

export default Menu;
