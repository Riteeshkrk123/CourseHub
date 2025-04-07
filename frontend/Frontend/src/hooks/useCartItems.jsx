import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCartItems = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: carts = [], isError, error, isLoading, refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })

    return { carts, isError, error, isLoading, refetch }
};

export default useCartItems;