import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const usePaymentHis = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentHis = [], refetch } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure(`/payment?email=${user?.email}`);
      return res.data;
    },
  });
  return [paymentHis, refetch];
};

export default usePaymentHis;
