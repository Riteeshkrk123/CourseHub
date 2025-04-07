import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Card from "./Card";
import { Helmet } from "react-helmet-async";

const Finance = () => {
    const axiosPublic = useAxiosPublic();

    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['finance'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category-courses/${'finance'}`);
            return res.data;
        }
    })


    if (isError) {
        return toast.error(error.message)
    }


    return (
        <>
            <Helmet>
                <title>Finance Courses - Course Hub</title>
            </Helmet>
            <Card courses={courses} isLoading={isLoading} cateNem={'Finance'} />
        </>
    );
};

export default Finance;