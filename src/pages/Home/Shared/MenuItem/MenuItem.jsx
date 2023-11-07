import React from "react";

const MenuItem = ({ items }) => {
  // console.log(items);
  const { name, image, price, recipe } = items;
  return (
    <div className="flex space-x-4">
      <img
        className="w-[100px]"
        style={{ borderRadius: "0 200px 200px 200px" }}
        src={image}
        alt=""
      />
      <div>
        <h3 className="uppercase">{name}</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-500">${price}</p>
    </div>
  );
};

export default MenuItem;
