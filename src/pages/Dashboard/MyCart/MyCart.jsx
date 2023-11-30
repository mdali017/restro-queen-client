import React, { useState } from "react";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [carts, refetch] = useCart();
  // console.log(carts);
  const total = carts.reduce((sum, item) => item.price + sum, 0);

  // Pagination Emplement Start Here...
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = carts.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(carts.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  // Function Declaire
  const prePage = () => {
    // console.log("prePage");
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const cahngeCPage = (id) => {
    // console.log("cahngeCPage");
    setCurrentPage(id);
  };
  const nextPage = () => {
    // console.log("nextPage");
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination Emplement End Here...

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your Order has been deleted.", "success");
            }
          });
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="w-8/12">
      <Helmet>
        <title>My Cart | Dashboard</title>
      </Helmet>
      <div className="flex uppercase gap-10 font-semibold ">
        <h1>My Carts: {carts.length}</h1>
        <h1>Total Price: ${total}</h1>
        <Link to="/dashboard/payment">
          <button className="btn btn-xs btn-warning">Pay</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-outline"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <nav>
          <ul>
            <li className="join">
              <a
                href="#"
                className="join-item btn btn-outline"
                onClick={prePage}
              >
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                key={i}
                className={`join-item ${currentPage === n ? "active" : ""}`}
              >
                <a
                  href="#"
                  className={`join-item `}
                  onClick={() => cahngeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav> */}
        <div className="join my-10">
          <button onClick={prePage} className="join-item btn btn-outline">
            Prev
          </button>
          {numbers.map((n, i) => (
            <button
              onClick={() => cahngeCPage(n)}
              key={i}
              className={`join-item btn ${
                currentPage === n ? "btn-active" : ""
              }`}
            >
              {n}
            </button>
          ))}
          {/* <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button> */}
          <button onClick={nextPage} className="join-item btn btn-outline">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
