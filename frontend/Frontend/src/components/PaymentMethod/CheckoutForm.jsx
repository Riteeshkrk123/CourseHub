import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import './CheckoutFrom.css';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCartItems from "../../hooks/useCartItems";
import { useNavigate } from "react-router";


const CheckoutForm = ({ courseInfo, closeModal, paymentSource }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { carts } = useCartItems();
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setisClientSecret] = useState(null);
    const [loading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('');
    // const [transaction, setTransaction] = useState('');
    const nagivate = useNavigate();

    const totalPrice = parseFloat(courseInfo?.price);


    // console.log(courseInfo)

    useEffect(() => {
        const getClientSecret = async () => {
            if (!totalPrice || totalPrice < 1) {
                return;
            }

            try {
                const res = await axiosSecure.post('/create-payment-intent', { price: totalPrice });
                setisClientSecret(res.data.clientSecret);

            } catch (error) {
                toast.error(error.message || 'Failed to create payment intent')
            }
        }

        getClientSecret();

    }, [axiosSecure, totalPrice])




    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // here we can distructer the "paymentMethod", but we remove because, it doesn't have any action;
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('error: ', error)
            setMessage(error.message)
            setIsLoading(false)
            return;
        } else {
            // console.log('paymentMethod: ', paymentMethod);
            setMessage('');
        }


        // //confirmCardPayment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }

            }
        })

        if (confirmError) {
            setMessage(confirmError.message);
            setIsLoading(false)
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            toast.success('Course Purchase Successfully')
            // console.log("From payment intent: ", paymentIntent);
            // setTransaction(paymentIntent.id);  // we can used state

            if (paymentSource === 'cart') {
                const courseDetails = {
                    email: user?.email,
                    price: totalPrice,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    cartIds: carts?.map(cartId => cartId._id),
                    courseIds: carts?.map(courseId => courseId.itemId),
                    status: 'Paid'
                }

                // console.log(courseDetails)
                // console.log('This is cart')

                const res = await axiosSecure.post('/payment', courseDetails)
                // console.log(res.data)

                if (res.data.result.insertedId && res.data.course.insertedCount > 0) {
                    setIsLoading(false)
                    nagivate('/dashboard/payment-info')
                }

            } else {
                const courseDetailsInfo = {
                    email: user?.email,
                    price: totalPrice,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    courseIds: courseInfo?._id ? [courseInfo?._id] : [],
                    status: 'Paid'
                }

                // console.log('This is not cart')

                const res = await axiosSecure.post('/payment', courseDetailsInfo);
                // console.log(res.data);


                if (res.data.result.insertedId && res.data.course.insertedCount > 0) {
                    setIsLoading(false)
                    nagivate('/dashboard/payment-info')
                }
            }



        }


        setIsLoading(false);
    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <div className='flex mt-2 justify-around'>
                <button
                    type='submit'
                    disabled={!stripe || !clientSecret || loading}
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                >
                    {
                        loading ? <LoadingSpinner /> : 'Pay'
                    }
                </button>
                <button
                    onClick={closeModal}
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                >
                    No
                </button>


            </div>

            {
                message && <p className="text-red-500">{message}</p>
            }

        </form>
    );
};

CheckoutForm.propTypes = {
    courseInfo: PropTypes.object,
    closeModal: PropTypes.func,
    paymentSource: PropTypes.string
}

export default CheckoutForm;