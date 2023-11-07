import React from "react";
import MenuItem from "../Shared/MenuItem/MenuItem";
import Cover from "../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <div>
      {title && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-6 w-10/12  mx-auto">
        {items.map((items) => (
          <MenuItem key={items._id} items={items}></MenuItem>
        ))}
      </div>
      <div className="text-center">
        <Link to={`/order/${title}`}>
          <button className="btn btn-outline border-0 border-b-4 my-4">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
