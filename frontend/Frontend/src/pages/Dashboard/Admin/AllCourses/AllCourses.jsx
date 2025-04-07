import { Helmet } from "react-helmet-async";
import { PiListDashesFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import SortMenu from "./SortMenu";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import PrimarySpinner from "../../../../components/LoadingSpinner/PrimarySpinner";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal/DeleteConfirmationModal";


const AllCourses = () => {

    const axiosSecure = useAxiosSecure();
    const [getSearch, setGetSearch] = useState('');
    const [getSort, setGetSort] = useState('');
    const [totalCourse, setTotalCourse] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [perPageItems, setPerPageItems] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const totalPages = totalCourse ? Math.ceil(totalCourse / perPageItems) : 0;
    const pages = [...Array(totalPages).keys()];

    // console.log(pages)
    // console.log(currentPage)


    const { data: courses = [], isError, error, isLoading } = useQuery({
        queryKey: ['all-courses', currentPage, perPageItems, getSearch, getSort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-courses?page=${currentPage}&size=${perPageItems}&search=${getSearch}&sort=${getSort}`);
            return res.data;
        }
    })

    // &search=${getSearch}&sort=${getSort}

    useEffect(() => {
        axiosSecure.get(`/products-count?search=${getSearch}`)
            .then(res => {
                setTotalCourse(res.data.result)
            })
    }, [axiosSecure, getSearch])


    // console.log(totalCourse)


    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setGetSearch(searchText);
        setCurrentPage(0)
    }


    const handleReset = () => {
        setGetSearch('');
        setGetSort('')
    }


    const openModal = (id) => {
        setSelectedCourseId(id);
        setIsModalOpen(true)
    }


    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourseId('')
    };


    const handleDelete = async () => {

        if (selectedCourseId) {
            const res = await axiosSecure.delete(`/course/${selectedCourseId}`);
            if (res.data.deletedCount > 0) {
                toast.success('Successfully Course Deleted')
            }
        }
    }


    const handlePreview = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };


    if (isError) {
        return toast.error(error.message)
    }


    if (isLoading) {
        return <PrimarySpinner smallHeight={true} />
    }



    return (
        <>
            <Helmet>
                <title>My Courses - CourseHub</title>
            </Helmet>

            <div className="w-full border rounded-md">
                <div className="relative mx-auto px-3 md:px-0">
                    <div className="p-5 border-b">
                        <h2 className="text-[#24292d] text-3xl font-heebo font-bold">My Courses List
                        </h2>
                    </div>

                    <div>
                        <div className="flex flex-col xl:flex-row justify-between items-center mt-6 px-2 md:px-4 gap-5">

                            <form
                                onSubmit={handleSearch}
                                className="relative w-full xl:w-[60%]">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search"
                                    className="w-full pr-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066ac9] transition-all duration-300"
                                />

                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer">
                                    <svg
                                        className=""
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg></button>
                            </form>

                            <button
                                onClick={handleReset}
                                className={`px-4 py-2 bg-[#0cbc87] text-[#24292d] font-roboto rounded hover:bg-[#09996d] hover:text-white transition-all`}
                            >
                                Reset
                            </button>



                            <SortMenu setGetSort={setGetSort} />
                        </div>
                    </div>


                    <div className="mt-8 overflow-x-auto px-2 md:px-4"> {/* Ensure this div has overflow-x-auto */}
                        <div className="min-w-[800px]"> {/* Set a minimum width to force overflow */}
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-800 text-white text-base font-bold font-roboto rounded-t-lg">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">Course Title</th>
                                        <th className="p-4">Enrolled</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4 rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white">
                                    {courses.map((course) => (
                                        <tr
                                            key={course._id}
                                            className="border-t border-gray-300 hover:bg-[#EFEFEF] cursor-pointer"
                                        >
                                            {/* <td className="p-4 font-heebo font-base font-bold hover:text-[#066ac9] transition-all">
                                                <div>
                                                    <div>
                                                        <img src="" alt="" />
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>
                                            </td> */}
                                            <td className="p-4 flex gap-4">
                                                <img src={course?.image} className="w-28 h-23 rounded-md" alt="" />
                                                <div className="flex flex-col justify-center gap-2 py-1">
                                                    <Link
                                                        to={`/courses/${course?._id}`}
                                                        className="font-heebo font-bold text-[16px] hover:text-[#066ac9] transition-all">{course?.title}</Link>
                                                    <div className="flex items-center">
                                                        <PiListDashesFill color="#F07D15" size={17} className="mr-2" />
                                                        <span className="text-[#24292d] font-heebo font-normal">{course?.lectures} lectures</span>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="p-4 font-roboto text-[15px] font-normal">
                                                {course?.enrolled}
                                            </td>
                                            <td className="p-4 font-roboto">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600`}>{'Paid'}</span>
                                            </td>
                                            <td className="p-4 font-roboto text-[15px] font-normal">
                                                {course?.price}
                                            </td>
                                            <td className="p-4 font-roboto font-normal text-[15px]">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        to={`/dashboard/course/update/${course?._id}`}
                                                        className="px-2 rounded-full bg-[#0cbc871a] py-2 text-[#0cbc87] hover:bg-[#0cbc87] hover:text-white transition-all"> <FaEdit size={16} /></Link>

                                                    <button
                                                        onClick={() => openModal(course?._id)}
                                                        className="px-2 bg-[#d6293e1a] text-[#d6293e] py-2 rounded-full hover:bg-[#d6293e] hover:text-white transition-all"> <IoCloseSharp size={16} /></button>

                                                </div>

                                                <DeleteConfirmationModal isModalOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete} />


                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-10 mb-3 py-5 text-end">

                            <nav>
                                <ul className="inline-flex -space-x-px">
                                    <li>
                                        <button
                                            onClick={handlePreview}
                                            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                                    </li>
                                    {
                                        pages.map(page => (
                                            <li key={page}>
                                                <button
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`py-2 px-3 border leading-tight cursor-pointer ${currentPage === page ? "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`
                                                    }>
                                                    {page}
                                                </button>
                                            </li>
                                        ))
                                    }



                                    <li>
                                        <button
                                            onClick={handleNext}
                                            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">Next</button>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AllCourses;