import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from 'react-hot-toast';
import PrimarySpinner from "../../../../components/LoadingSpinner/PrimarySpinner";
import { Link } from "react-router";
import { Helmet } from 'react-helmet-async';


const Orders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isError, error, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    })

    // console.log(payments)

    if (isError) {
        return toast.error(error.message)
    }


    if (isLoading) {
        return <PrimarySpinner smallHeight={true} />
    }



    return (
        <>
            <Helmet>
                <title>Orders - CourseHub</title>
            </Helmet>
            <div className="w-full border">
                <div className="mx-auto px-3 md:px-0">
                    <div className="p-5 border-b">
                        <h2 className="text-[#24292d] text-3xl font-heebo font-bold">Order List
                        </h2>
                    </div>
                    <div className="mt-6 overflow-x-auto px-2 md:px-4"> {/* Ensure this div has overflow-x-auto */}
                        <div className="min-w-[800px]"> {/* Set a minimum width to force overflow */}
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-800 text-white text-base font-bold font-roboto rounded-t-lg">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">Course name</th>
                                        <th className="p-4">Payment ID</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 rounded-tr-lg">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white">
                                    {payments.map((payment, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-300 hover:bg-[#EFEFEF] cursor-pointer"
                                        >
                                            <td className="p-4 font-heebo font-base font-bold hover:text-[#066ac9] transition-all">
                                                <Link to={`/courses/${payment?.id}`}>{payment?.title}</Link>
                                            </td>
                                            <td className="p-4 font-roboto text-[15px] font-normal">{payment?.transactionId}</td>
                                            <td className="p-4 font-roboto font-normal text-[15px]">
                                                {new Date(payment?.date).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600`}
                                                >
                                                    {payment?.status}
                                                </span>
                                            </td>
                                            <td className="p-4 font-roboto text-base font-normal">${payment?.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;