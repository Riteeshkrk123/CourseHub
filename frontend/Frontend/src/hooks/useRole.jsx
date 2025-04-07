import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {

    const { user, isLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userRole = "", isPending } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !isLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`);
            return res?.data?.role;
        }
    })


    return { userRole, isPending }
};

export default useRole;