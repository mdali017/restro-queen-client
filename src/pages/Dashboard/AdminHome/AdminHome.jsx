import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="w-full min-h-[600px] m-4 border">
      <h4>Hi, Welcome Back {user.displayName}</h4>
      <div className="stats shadow gap-10 w-9/12 mx-5">
        <div className="stat place-items-center">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Customer</div>
          <div className="stat-value text-secondary">{stats.users}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Products</div>
          <div className="stat-value">{stats.products}</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
