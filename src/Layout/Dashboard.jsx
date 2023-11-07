import React from "react";
import {
  FaBars,
  FaCalendarAlt,
  FaEnvelope,
  FaHome,
  FaShoppingCart,
  FaWallet,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { ImSpoonKnife } from "react-icons/im";
import { TfiMenuAlt } from "react-icons/tfi";

const Dashboard = () => {
  const [carts] = useCart();

  // TODO
  const isAdmin = true;

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col w-full items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li>
                  <Link to="/my-cart">
                    <FaHome />
                    Admin Home
                  </Link>
                </li>
                <li>
                  <Link to="/my-cart">
                    <ImSpoonKnife />
                    Add Item
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/all-users">
                    <FaUsers />
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/my-cart">
                    <TfiMenuAlt />
                    Manage Booking
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/my-cart">
                    <FaHome />
                    User Home
                  </Link>
                </li>
                <li>
                  <Link to="/my-cart">
                    <FaCalendarAlt />
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link to="/my-cart">
                    <FaWallet />
                    Payment History
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-cart">
                    <FaShoppingCart />
                    My Cart
                    <span className="badge badge-secondary">
                      +{carts?.length || 0}
                    </span>
                  </Link>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <Link to="/">
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu">
                <FaBars />
                Menu
              </Link>
            </li>
            <li>
              <Link to="/order/salad">
                <FaShoppingBag />
                Shop
              </Link>
            </li>
            <li>
              <Link to="/menu">
                <FaEnvelope />
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
