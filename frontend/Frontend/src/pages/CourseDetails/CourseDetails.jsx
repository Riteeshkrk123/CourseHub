import CourseDescription from "./Divs/CourseDescription";
import IntroDiv from "./Divs/IntroDiv";
import VideoPlay from "./Divs/VideoPlay";
import { FaBookOpen } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { TbAntennaBars5 } from "react-icons/tb";
import { TbWorld } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaShareNodes } from "react-icons/fa6";
import toast from 'react-hot-toast'
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimarySpinner from "../../components/LoadingSpinner/PrimarySpinner";
import useAuth from "../../hooks/useAuth";
// import useCartItems from "../../hooks/useCartItems";
import BuyNow from "../../components/Modal/BuyNow";
import { useState } from "react";
import useCartLength from "../../hooks/useCartLength";


const CourseDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const [isOpen, setisOpen] = useState(false);
    // const { refetch } = useCartItems();
    const { refetch } = useCartLength()
    const axiosSecure = useAxiosSecure();


    const { data: course = {}, isError, error, isLoading } = useQuery({
        queryKey: ['individual-course'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/course/${id}`);
            return response.data;
        }
    })


    if (isError) {
        return toast.error(error.message)
    }

    if (isLoading) {
        return <PrimarySpinner />
    }

    // console.log(course)

    // URL Copy Function
    const handleShare = async () => {
        try {
            const currentURL = window.location.href;
            await navigator.clipboard.writeText(currentURL);
            toast.success('Link copied to clipboard!')
        } catch (error) {
            toast.error('Failed to copy URL:', error.message)
        }
    }


    const handleAddtoCart = async () => {
        try {
            const cartItem = {
                itemId: course?._id,
                image: course?.image,
                title: course?.title,
                price: course?.price,
                email: user?.email
            }

            const res = await axiosSecure.post('/cart', cartItem);
            if (res.data.insertedId === null) {
                toast.error(res.data.message)
            }

            if (res.data.insertedId) {
                refetch();
                toast.success('Item added to cart!')

            }

        } catch (error) {
            toast.error(error.message)
        }

    }


    const closeModal = () => {
        setisOpen(false);
    }


    return (
        <section>
            <div className="container mx-auto px-3 md:px-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-14 md:py-16">
                    {/* <!-- Left Side --> */}
                    <div className="md:col-span-2 p-2">
                        <div>
                            <IntroDiv
                                title={course?.title}
                                introDes={course?.introDes}
                                rating={course?.rating}
                                enrolled={course?.enrolled}
                                level={course?.level}
                                lastUpdated={course?.lastUpdated}
                                language={course?.language}
                            />
                            <VideoPlay />
                            <CourseDescription
                                description={course?.courseDescription}
                                curriculums={course?.curriculum}
                                finalDescription={course?.finalEndingDescription}
                            />
                        </div>
                    </div>

                    {/* <!-- Right Side --> */}
                    <div className="px-4">
                        <div className="border rounded-lg">
                            <div className="px-5 py-6">
                                <div className="flex items-center justify-between text-3xl text-[#24292d] font-bold font-heebo mb-5">
                                    <span>${course?.price}</span>
                                    <span
                                        onClick={handleShare}
                                        className="px-4 py-3 bg-[#EFF1F2] rounded-md hover:bg-[#e1e5e7] transition duration-400 cursor-pointer"><FaShareNodes size={14} /></span>
                                </div>
                                <button
                                    onClick={handleAddtoCart}
                                    className="border border-[#066ac9] text-[#066ac9] w-full py-2 text-base font-medium font-roboto rounded-md mb-2 hover:bg-[#066ac9] hover:text-white transition duration-300">Add to cart</button>

                                <button
                                    onClick={() => setisOpen(true)}
                                    className="border bg-[#0cbc87] text-[#fff] font-roboto text-[15px] w-full py-2 rounded-md font-medium hover:bg-[#0aa073] transition duration-300">Buy now</button>

                                {/* This  is a payment Modal */}
                                <BuyNow isOpen={isOpen} closeModal={closeModal} courseInfo={course} showTitle={true} />


                                <hr className="mt-7 mb-5" />

                                <div>
                                    <h4 className="text-[#24292d] font-bold text-[21px] font-heebo">This course includes</h4>
                                    <ul className=" mt-4 text-[17px] text-[#24292d] font-heebo font-normal">
                                        <li className="flex justify-between py-1">
                                            <span className="flex items-center gap-2">
                                                <FaBookOpen color="#066ac9" />
                                                Lectures
                                            </span>
                                            <span>{course?.lectures}</span>
                                        </li>
                                        <li className="flex justify-between py-1">
                                            <span className="flex items-center gap-2">
                                                <AiFillClockCircle color="#066ac9" />
                                                Duration
                                            </span>
                                            <span>{course?.duration}</span>
                                        </li>
                                        <li className="flex justify-between py-1">
                                            <span className="flex items-center gap-2">
                                                <TbAntennaBars5 color="#066ac9" />
                                                Skills
                                            </span>
                                            <span>{course?.skills}</span>
                                        </li>
                                        <li className="flex justify-between py-1">
                                            <span className="flex items-center gap-2">
                                                <TbWorld color="#066ac9" />
                                                Language
                                            </span>
                                            <span>{course?.language}</span>
                                        </li>
                                        <li className="flex justify-between py-1">
                                            <span className="flex items-center gap-2">
                                                <FaUserClock color="#066ac9" />
                                                Deadline
                                            </span>
                                            <span>{course?.deadline}</span>
                                        </li>
                                        <li className="flex justify-between py-1">
                                            <span className="flex items-center gap-2">
                                                <LiaCertificateSolid color="#066ac9" />
                                                Certificate
                                            </span>
                                            <span>{course?.certificate ? "Yes" : 'No'}</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;