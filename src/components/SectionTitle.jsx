import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="border-y-4 my-5 w-3/12 mx-auto text-center py-2">
      <p className="text-orange-500">---{subHeading}---</p>
      <h3 className="text-3xl font-bold">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
