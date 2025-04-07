import { useQuery } from "@tanstack/react-query";
import FilterStuff from "./Sections/FilterStuff";
import SubscribeSection from "./Sections/SubscribeSection";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PopularCourseCard from "../../components/CourseCard/PopularCourseCard";
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast'
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import { useEffect, useState } from "react";


const CoursePage = () => {

    const [getValue, setGetValue] = useState('')
    const [getSearch, setGetSearch] = useState('')
    const [numberOfCourses, setNumberOfCourses] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [perPageItems, setPerPageItems] = useState(10)
    const axiosPublic = useAxiosPublic();
    const loadingArrays = Array(12).fill(null);

    const totalPages = numberOfCourses ? Math.ceil(numberOfCourses / perPageItems) : 0;
    const pages = [...Array(totalPages).keys()];


    useEffect(() => {
        setCurrentPage(0)
    }, [getValue])


    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['all-courses', getValue, getSearch, currentPage, perPageItems],
        queryFn: async () => {
            const response = await axiosPublic.get(`/courses?category=${getValue}&search=${getSearch}&page=${currentPage}&size=${perPageItems}`);
            return response.data;
        }
    })


    useEffect(() => {
        axiosPublic.get(`/products-length?category=${getValue}&search=${getSearch}`)
            .then(res => {
                setNumberOfCourses(res.data?.result)
            })
    }, [axiosPublic, getValue, getSearch])



    if (isError) {
        console.log(error)
        return toast.error(error.message)
    }

    const handleChange = (value) => {
        // console.log(value)
        if (value) {
            setGetSearch('');
            setGetValue(value)
        }

    }

    const handleSearch = (e) => {
        e.preventDefault();
        setGetValue('');
        const form = e.target;
        const searchValue = form.search.value;
        setGetSearch(searchValue);
        // console.log(searchValue)

    }


    const handleNextBtn = () => {
        if (currentPage === pages.length - 1) return;

        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviewBtn = () => {
        if (currentPage === 0) return;

        if (pages.length > 0) {
            setCurrentPage(currentPage - 1)
        }

    }

    // console.log(numberOfCourses)
    // console.log(perPageItems)
    // console.log(totalPages)
    // console.log(pages)

    // console.log(getSearch)
    // console.log(getValue)


    return (
        <>
            <Helmet>
                <title>All Courses - CourseHub</title>
            </Helmet>
            <section>
                <div className="container mx-auto px-3 md:px-2">
                    <div className="md:px-12 py-10">
                        {/* Search filter options */}
                        <FilterStuff handleChange={handleChange} handleSearch={handleSearch} />
                        <div className={`flex flex-col md:flex-row flex-wrap mt-10 gap-10 md:px-1`}>
                            {/* Show course Data */}
                            {
                                isLoading ?
                                    loadingArrays.map((unUsed, index) => (
                                        <SkeletonLoader key={index} />
                                    )) :
                                    courses.map(course => (
                                        <PopularCourseCard
                                            key={course._id}
                                            course={course}
                                        />
                                    ))
                            }
                        </div>

                     
                        {/* bg-gray-100 */}
                        <div className="mt-14">
                            <ul className="flex space-x-5 justify-center font-roboto">
                                <li
                                    onClick={handlePreviewBtn}
                                    aria-disabled={currentPage === 0}
                                    className={`${currentPage === 0 ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50 cursor-pointer'} flex items-center justify-center shrink-0  border-2 w-10 h-10 rounded-full`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-300" viewBox="0 0 55.753 55.753">
                                        <path
                                            d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                            data-original="#000000" />
                                    </svg>
                                </li>



                                {
                                    pages.map((page) => (
                                        <li
                                            onClick={() => setCurrentPage(page)}
                                            key={page}
                                            className={`${currentPage === page ? 'border-blue-500 bg-blue-500 text-white' : 'text-[#333] hover:bg-gray-50'} flex items-center justify-center shrink-0 border-2 cursor-pointer text-base font-bold  w-10 h-10 rounded-full`}>
                                            {page}
                                        </li>
                                    ))
                                }



                                <li
                                    onClick={handleNextBtn}
                                    aria-disabled={currentPage === pages.length - 1}
                                    className={`${currentPage === pages.length - 1 ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50  cursor-pointer'} flex items-center justify-center shrink-0 border-2 w-10 h-10 rounded-full`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400 rotate-180" viewBox="0 0 55.753 55.753">
                                        <path
                                            d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                            data-original="#000000" />
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <SubscribeSection />
        </>
    );
};


export default CoursePage;