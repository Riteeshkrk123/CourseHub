import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Card from "./Card";
import { Helmet } from "react-helmet-async";

const Development = () => {


    const axiosPublic = useAxiosPublic();

    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['development'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category-courses/${'development'}`);
            return res.data;
        }
    })


    if (isError) {
        return toast.error(error.message)
    }




    return (
        <>
            <Helmet>
                <title>Development Courses - CourseHub</title>
            </Helmet>

            <Card courses={courses} isLoading={isLoading} cateNem={'Development'} />
        </>
    );
};

export default Development;