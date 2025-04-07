import { MdComputer } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { MdDiamond } from "react-icons/md";
import StatisticsBox from '../../../../components/Dashboard/StatisticsBox/StatisticsBox';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import DashedLineChart from "../../../../components/DashedLineChart/DashedLineChart";
import { useEffect, useState } from "react";
import PrimarySpinner from "../../../../components/LoadingSpinner/PrimarySpinner";
import { Helmet } from "react-helmet-async";


const AdminStatistic = () => {

    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const { data = {} } = useQuery({
        queryKey: ['admin-statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-statistics');
            return res.data;
        }
    })

    // console.log(data)

    return (
        <>
        <Helmet>
            <title>Admin Dashboard - CourseHub</title>
        </Helmet>
            <div>
                <div className="mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Courses Card */}
                        <StatisticsBox bgColor={'#FDF6E2'} icon={MdComputer} iconColor={'#f7c32e'} sizePx={74} title={data?.totalCourses} des={'Total Courses'} />

                        <StatisticsBox bgColor={'#F0ECF9'} icon={FaUserGraduate} iconColor={'#6f42c1'} sizePx={60} title={data?.totalStudents} des={'Total Students'} />

                        <StatisticsBox bgColor={'#E8F6F8'} icon={MdDiamond} iconColor={'#17a2b8'} sizePx={75} title={data?.enrolledUser} des={'Enrolled Students'} />

                    </div>

                    <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                        {/* Total Sales Graph */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
                            {/* Render Chart Here */}
                            {
                                loading ? <PrimarySpinner smallHeight={true} /> : <DashedLineChart data={data?.revenueData} />
                            }
                            <span className="text-center font-heebo text-[#24292d] mt-2 mb-2">Earnings from the Past 7 Days</span>
                        </div>
                        {/* Calender */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                            <Calendar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminStatistic;