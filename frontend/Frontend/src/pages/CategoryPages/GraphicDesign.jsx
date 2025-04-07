import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { Helmet } from "react-helmet-async";

const GraphicDesign = () => {
    const axiosPublic = useAxiosPublic();

    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['graphic-design'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category-courses/${'graphic-design'}`);
            return res.data;
        }
    })


    if (isError) {
        return toast.error(error.message)
    }


    return (
        <>
            <Helmet>
                <title>Graphic Design Courses - CourseHub</title>
            </Helmet>
            <Card courses={courses} isLoading={isLoading} cateNem={'Graphic Design'} />
        </>
    );
};

export default GraphicDesign;