import { IoCloseSharp } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from 'react-hot-toast';
import PrimarySpinner from "../../../../components/LoadingSpinner/PrimarySpinner";
import { useEffect, useState } from "react";
import BuyNow from "../../../../components/Modal/BuyNow";
import { Helmet } from "react-helmet-async";

const Cart = () => {

    const { user } = useAuth();
    const [money, setMoney] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [totlaPrice, setTotalPrice] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [paymentSource, setPaymentSource] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: carts = [], isError, error: cartError, isLoading, refetch } = useQuery({
        queryKey: ['carts-item', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`);
            return res.data;
        }
    })


    useEffect(() => {
        let totalAmount = carts.reduce((pre, current) => pre + parseFloat(current.price), 0);
        setMoney(totalAmount);
        setTotalPrice(totalAmount)
    }, [carts])


    // console.log(money)
    console.log(paymentSource)


    const handleCartDelete = async (id) => {
        // console.log(id)
        try {
            const res = await axiosSecure.delete(`/cart/${id}`)
            if (res.data.deletedCount > 0) {
                toast.success('Item deleted successfully!')
                refetch();
                setDiscountPrice(0)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const handleCoupon = (e) => {
        e.preventDefault();
        if (!money) {
            return;
        }

        const form = new FormData(e.target);
        const value = form.get('coupon');

        if (value === "courseHub10") {
            const discount = money * (10 / 100);
            const totalDiscount = money - discount;
            setDiscountPrice(discount.toFixed(2));
            setTotalPrice(totalDiscount.toFixed(2));
            e.target.reset();
        }
    }

    const closeModal = () => {
        setModalOpen(false)
    }


    const handleBuyNow = () => {
        setPaymentSource('cart');
        setModalOpen(true);
    }

    if (isError) {
        return toast.error(cartError.message)
    }


    if (isLoading) {
        return <PrimarySpinner smallHeight={true} />
    }




    return (
        <>
        <Helmet>
            <title>My Carts - CourseHub</title>
        </Helmet>
            <div>
                <div className="mt-6 md:px-2">
                    <div>
                        <div className="bg-[#F5F7F9] text-center p-7 mb-10 rounded-md">
                            <h2 className="text-[#24292d] font-heebo text-4xl font-bold">My cart</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                            <div className="md:col-span-2 shadow-one pb-5 px-2 xl:px-6 rounded-md">
                                {
                                    carts.length < 1 ? <span className="text-center block py-4 font-heebo text-md">No courses in the cart. 😊</span> :
                                        carts.map(cart => (
                                            <div
                                                key={cart._id}
                                                className="py-6 border-b">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-3 items-center">
                                                        <img src={cart?.image} className="w-[35%] xl:w-[25%] rounded-xl" alt="" />
                                                        <h3 className="text-[#24292d] font-heebo text-base font-bold">{cart?.title}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[#0cbc87] font-heebo text-[21px] font-bold gap-10 ">${cart?.price}</span>
                                                        <button
                                                            onClick={() => handleCartDelete(cart?._id)}
                                                            className="p-2.5 cursor-pointer hover:bg-[#D6293E] hover:text-white transition-all bg-[#d6293e1a] text-[#D6293E] rounded-md"><IoCloseSharp /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                }


                                <div className="mt-8 ">
                                    <span className="font-roboto text-[#24292d]">Coupon Code: <span className="text-[#0cbc87]">courseHub10</span></span>
                                    <form
                                        onSubmit={handleCoupon}
                                        className="flex items-center mt-2 rounded-md overflow-hidden max-w-96">
                                        <input
                                            type="text"
                                            name="coupon"
                                            placeholder="COUPON CODE"
                                            className="flex-grow px-4 py-[10px] font-heebo border border-gray-100 focus:border-blue-600 outline-none placeholder-gray-500"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-[10px] font-medium hover:bg-blue-600">
                                            Apply coupon
                                        </button>
                                    </form>
                                </div>

                            </div>
                            <div>
                                <div className="shadow-one rounded-md">
                                    <div className="px-4 py-5">
                                        <h3 className="text-[#24292d] font-bold font-heebo text-[26px]">Cart Total</h3>
                                        <ul className="mt-5">
                                            <li className="flex items-center justify-between">
                                                <span className="text-[#24292d] text-base font-normal	 font-heebo">Original Price</span>
                                                <span className="text-[#24292d] font-bold text-base font-roboto font-bold">${money}</span>
                                            </li>
                                            <li className="flex mt-1 items-center justify-between">
                                                <span className="text-[#24292d] text-base font-normal font-heebo">Coupon Discount</span>
                                                <span className="text-[#d6293e] font-bold text-base font-roboto font-normal">${discountPrice}</span>
                                            </li>
                                            <li className="mt-5 flex items-center justify-between">
                                                <span className="text-[#24292d] font-heebo font-bold text-[21px]">Total</span>
                                                <span className="text-[#24292d] font-heebo font-bold text-[21px]">${totlaPrice}</span>
                                            </li>

                                        </ul>
                                        <div className="mt-3 w-full">
                                            <button
                                                onClick={handleBuyNow}
                                                className="w-full px-5 py-3 bg-[#0cbc87] hover:bg-[#0aa073] transition-all text-base text-white font-roboto font-medium rounded-md">Proceed to Payment</button>
                                        </div>

                                        {/* Payment Modal */}
                                        <BuyNow isOpen={modalOpen} closeModal={closeModal} courseInfo={{ title: 'All of the cart items', price: "" + totlaPrice }} paymentSource={paymentSource} />


                                        <p className="text-[#747579] mt-3 text-center font-roboto text-sm">By completing your purchase, you agree to these <a className="text-[#066ac9] text-sm font-bold" href="#">Terms of Service</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;