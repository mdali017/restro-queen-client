import { useQuery } from "@tanstack/react-query";
// import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.data;
  });
  //   const { isLoading, isError, data, error } = useQuery("users", async () => {
  //     const data = await fetch("http://localhost:5000/users");
  //     return data.json();
  //   });

  //   console.log(data);

  return (
    <div>
      <h1>All User is Here.. : </h1>
    </div>
  );
};

export default AllUsers;
