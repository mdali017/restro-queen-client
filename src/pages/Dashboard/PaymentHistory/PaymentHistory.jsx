import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import usePaymentHis from "../../../hooks/usePaymentHis";
import moment from "moment";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [paymentHis, refetch] = usePaymentHis();
  const [axiosSecure] = useAxiosSecure();
  //   const { data: paymentHistory = [] } = useQuery({
  //     queryKey: ["payment"],
  //     queryFn: async () => {
  //       const res = await axiosSecure(`/payment?email=${user?.email}`);
  //       return res.data;
  //     },
  //   });

  const handleDelete = (payment) => {
    // console.log(payment);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this one!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/payment/${payment._id}`, {
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
    <div>
      <h4>Payment History</h4>
      {/* {paymentHistory.map((payment, index) => (
        <div key={i}>{d.price}</div>
      ))} */}
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>TransactionId</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentHis.map((payment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{moment(payment.date).format("DD-MM-YYYY, (HH:mm)")}</th>
                <td>{payment.transactionId}</td>
                <td>{payment.quantity}</td>
                <td>${payment.price}</td>
                <td>
                  <button onClick={() => handleDelete(payment)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
