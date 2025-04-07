import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useCartLength = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: carts = 0, refetch } = useQuery({
        queryKey: ['carts-length', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carts-length/${user?.email}`);
            return res.data.result;
        }
    })

    return { carts, refetch }
};

export default useCartLength;