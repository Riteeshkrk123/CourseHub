import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
// import toast from 'react-hot-toast';
import PrimarySpinner from '../../../components/LoadingSpinner/PrimarySpinner';
import { Helmet } from 'react-helmet-async';



const MyCourse = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { data: enrollCourses = [], isLoading } = useQuery({
        queryKey: ['enroll-courses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollment/${user?.email}`);
            return res.data;
        }
    })

    // console.log(enrollCourses)

    // console.log(enrollCourses)
    // if (isError) {
    //     return toast.error(error.message)
    // }


    if (isLoading) {
        return <PrimarySpinner smallHeight={true} />
    }


    return (
        <>
            <Helmet>
                <title>My Courses - CourseHub</title>
            </Helmet>
            <div className="w-full border rounded-md">
                <div className="mx-auto px-3 md:px-0">
                    <div className="p-5 border-b">
                        <h2 className="text-[#24292d] text-3xl font-heebo font-bold">My Courses
                        </h2>
                    </div>
                    <div className="mt-8 overflow-x-auto px-2 md:px-4"> {/* Ensure this div has overflow-x-auto */}
                        <div className="min-w-[800px]"> {/* Set a minimum width to force overflow */}
                            {
                                enrollCourses.length > 0 ? (
                                    <table className="w-full text-left border-collapse border">
                                        <thead className="bg-gray-800 text-white text-base font-bold font-roboto rounded-t-lg">
                                            <tr className="">
                                                <th className="p-4 rounded-tl-lg">Course Title</th>
                                                <th className="p-4">Total Lectures</th>
                                                <th className="p-4">Completed Lecture</th>
                                                <th className="p-4 rounded-tr-lg">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm bg-white">
                                            {enrollCourses.map((enrollCourse, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer"
                                                >

                                                    <td className="p-4 flex gap-4">
                                                        <img src={enrollCourse?.image} className="w-28 h-23 rounded-md" alt="" />
                                                        <div className="flex flex-col justify-between">
                                                            <h2 className="font-heebo font-bold text-[16px] hover:text-[#066ac9] transition-all">{enrollCourse?.title}</h2>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-blue-600 h-2 rounded-full"
                                                                    style={{ width: "2%" }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                    </td>


                                                    <td className="p-4 font-roboto text-[15px] font-normal">
                                                        {enrollCourse?.lectures}
                                                    </td>
                                                    <td className="p-4 font-roboto text-base font-normal">0</td>
                                                    <td className="p-4 cursor-pointer">
                                                        <Link
                                                            to={`/dashboard/video/${enrollCourse?._id}`}
                                                            className="ml-4 bg-blue-100 text-blue-500 px-4 py-2 rounded transition-all font-medium hover:bg-blue-200">
                                                            Continue
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : <p className="text-center m-3 font-heebo">{enrollCourses.message}</p>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyCourse;