import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBeer, FaCarAlt, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useCart from "../../../../hooks/useCart";

const NavBar = () => {
  const [bg, setBg] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [carts] = useCart();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  });

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <Link to="/dashboard/my-cart" tabIndex={0} className="btn btn-ghost ">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item">
            {carts?.length || 0}
          </span>
        </div>
      </Link>
    </>
  );
  return (
    <div
      className={`${
        bg ? "bg-base-300 h-20" : "h-24 text-white border-b "
      } flex items-center fixed top-0 w-full   z-10 transition-all duration-300`}
    >
      <div className="navbar container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Restro Queen</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div
                onClick={handleLogOut}
                className="btn btn-outline btn-warning"
              >
                Logout <FaArrowRight />
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-warning">
                Login <FaArrowRight />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
