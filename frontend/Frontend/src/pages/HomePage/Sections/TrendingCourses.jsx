import TrendingCourseCard from '../../../components/CourseCard/TrendingCourseCard';
import CourseIntro from '../../../components/CourseIntro/CourseIntro';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useCartItems from '../../../hooks/useCartItems';
import { useState } from 'react';
import ConfirmCart from '../../../components/Modal/ConfirmCart';
import useCartLength from '../../../hooks/useCartLength';

const TrendingCourses = () => {

    const { user } = useAuth();
    // const { refetch } = useCartItems();
    const { refetch } = useCartLength()
    const [isOpen, setIsOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSucure = useAxiosSecure();

    const { data: trendingCourses = [] } = useQuery({
        queryKey: ['trending-courses'],
        queryFn: async () => {
            const response = await axiosPublic.get('/trending-courses');
            return response.data;
        }
    })

    // console.log(trendingCourses)

    const handleAddtoCart = async (course) => {

        if (user && user?.email) {
            try {

                const newItem = {
                    itemId: course?._id,
                    image: course?.image,
                    title: course?.title,
                    price: course?.price,
                    email: user?.email
                };

                const res = await axiosSucure.post('/cart', newItem);
                if (res.data.insertedId === null) {
                    toast.error(res.data.message)
                }

                if (res.data.insertedId) {
                    toast.success('Item added to cart!')
                    refetch();
                }


            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        } else {
            setIsOpen(true)
        }

    }


    return (
        <section className="py-12">
            <div className="container mx-auto px-3 md:px-2">
                <CourseIntro title={'Our Trending Courses'} des={'Check out most 🔥 courses in the market'} />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between md:px-12">

                    {
                        trendingCourses.map(trendingCourse => (
                            <TrendingCourseCard
                                key={trendingCourse?._id}
                                trendingCourse={trendingCourse}
                                handleAddtoCart={handleAddtoCart}
                            />

                        ))
                    }

                </div>
                <ConfirmCart isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </section>
    );
};

export default TrendingCourses;