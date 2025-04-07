import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { Helmet } from "react-helmet-async";

const Marketing = () => {
    const axiosPublic = useAxiosPublic();

    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['marketing'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category-courses/${'marketing'}`);
            return res.data;
        }
    })


    if (isError) {
        return toast.error(error.message)
    }

    return (
        <>
            <Helmet>
                <title>Markeing Courses - CourseHub</title>
            </Helmet>
            <Card courses={courses} isLoading={isLoading} cateNem={'Marketing'} />
        </>
    );
};

export default Marketing;