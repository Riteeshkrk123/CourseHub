import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://course-hub-backend.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {

    const { userSignOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        },
            async (error) => {
                console.log('interceptors error: ', error)
                if (error.response.status === 401 || error.response.status === 403) {
                    await userSignOut();
                    navigate('/sign-in');
                }

                return Promise.reject(error);
            })


        return () => {
            axiosSecure.interceptors.response.eject(interceptor)
        }

    }, [userSignOut, navigate])


    return axiosSecure;
};

export default useAxiosSecure;