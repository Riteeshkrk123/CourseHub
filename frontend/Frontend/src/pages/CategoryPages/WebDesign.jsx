import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Card from "./Card";
import { Helmet } from "react-helmet-async";

const WebDesign = () => {

    const axiosPublic = useAxiosPublic();

    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['web-design'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category-courses/${'web-design'}`);
            return res.data;
        }
    })


    if (isError) {
        return toast.error(error.message)
    }



    return (
        <>
            <Helmet>
                <title>Web Design Courses - CourseHub</title>
            </Helmet>
            <Card courses={courses} isLoading={isLoading} cateNem={'Web Design'} />
        </>
    );
};

export default WebDesign;