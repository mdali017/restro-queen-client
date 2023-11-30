import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    isPending,
    isError,
    data: users = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // const res = await fetch(`http://localhost:5000/users`);
      const res = await axiosSecure.get(`/users`);
      // return res.json();
      return res.data;
    },
  });
  return [users, refetch];
};

export default useAllUsers;
