import toast from "react-hot-toast";
import PrimarySpinner from "../../../components/LoadingSpinner/PrimarySpinner";
import usePaymentHistory from "../../../hooks/usePaymentHistory";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {

    const { payments, isError, error, isLoading } = usePaymentHistory();


    console.log(payments)

    if (isError) {
        return toast.error(error.message)
    }


    if (isLoading) {
        return <PrimarySpinner smallHeight={true} />
    }


    return (

        <>
        <Helmet>
            <title>Payment History - CourseHub</title>
        </Helmet>
            <div className="w-full">
                <div className="mx-auto px-3 md:px-2">
                    <div className="mt-6 overflow-x-auto"> {/* Ensure this div has overflow-x-auto */}
                        <div className="min-w-[800px]"> {/* Set a minimum width to force overflow */}
                            <table className="w-full text-left border-collapse border">
                                <thead className="bg-gray-800 text-white text-base font-bold font-roboto rounded-t-lg">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">Date</th>
                                        <th className="p-4">Course name</th>
                                        <th className="p-4">Payment ID</th>
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
                                            <td className="p-4 font-roboto font-normal text-base">{new Date(payment?.date).toLocaleDateString()}</td>
                                            <td className="p-4 font-heebo font-base font-bold">{payment?.title}</td>
                                            <td className="p-4 font-roboto text-[15px] font-normal">
                                                {payment?.transactionId}
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
}






export default PaymentHistory;