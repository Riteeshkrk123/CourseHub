import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isError, error, isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        enabled: !!user?.email, // Only run the query if the user email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`);
            return res.data;
        }
    })

    return { payments, isError, error, isLoading };
};

export default usePaymentHistory;