import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  // console.log(popular);

  return (
    <section className="my-20">
      <SectionTitle
        heading="Popular Items"
        subHeading="From Our Menu"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-6 w-10/12  mx-auto">
        {popular.map((items) => (
          <MenuItem key={items._id} items={items}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
