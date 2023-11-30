import React from "react";
import FoodCard from "../../../Home/Shared/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-4 my-10 gap-10">
      {items.map((item) => (
        <FoodCard key={item._id} item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
