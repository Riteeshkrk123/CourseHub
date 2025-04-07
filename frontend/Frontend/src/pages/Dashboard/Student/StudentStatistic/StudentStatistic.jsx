import { MdComputer } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import StatisticsBox from "../../../../components/Dashboard/StatisticsBox/StatisticsBox";
import { LiaCertificateSolid } from "react-icons/lia";
import MyCourse from "../../MyCourse/MyCourse";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const StudentStatistic = () => {

    const axiosSecure = useAxiosSecure();

    const { data: count = 0 } = useQuery({
        queryKey: ['totalCourses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/student-statistic');
            return res.data.result;
        }
    })




    return (
        <>
            <Helmet>
                <title>Student Dashboard - CourseHub</title>
            </Helmet>
            <div>
                <div className="mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Courses Card */}
                        <StatisticsBox bgColor={'#FDF6E2'} icon={MdComputer} iconColor={'#fd7e14'} sizePx={74} title={count} des={'Total Courses'} />

                        <StatisticsBox bgColor={'#F0ECF9'} icon={FaClipboardCheck} iconColor={'#6f42c1'} sizePx={60} title={0} des={'Complete lessons'} />

                        <StatisticsBox bgColor={'#0cbc871a'} icon={LiaCertificateSolid} iconColor={'#0cbc87'} sizePx={75} title={0} des={'Achieved Certificates'} />

                    </div>

                    {count > 0 ? <MyCourse /> : <p className="text-center mt-3 font-heebo">You have not enrolled in any courses.</p>}



                </div>
            </div>
        </>
    );
};

export default StudentStatistic;