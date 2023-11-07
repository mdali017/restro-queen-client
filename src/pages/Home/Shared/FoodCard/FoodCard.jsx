import React, { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    // console.log(item);
    if (user && user.email) {
      const cartItem = { foodId: _id, name, image, price, email: user?.email };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Food added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login First...!",
      });
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl ">
        <figure>
          <img src={image} alt={name} />
          <p className="absolute right-0 mr-4 px-4 bg-slate-900 text-white top-0">
            ${price}
          </p>
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-center">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <div className="text-center">
              <button
                onClick={() => handleAddToCart(item)}
                className="btn btn-outline border-0 border-b-4 my-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
