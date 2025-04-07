import Bg from '../../../assets/feedback/01.png'
import Circle from '../../../assets/feedback/02.png'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { Link } from "react-router";
import { AiFillSafetyCertificate } from "react-icons/ai";


const FeedbackSection = () => {
    return (
        <section className='bg-[#F5F7F9] relative md:mt-12'>
            <div className="container mx-auto px-3 md:px-2">
                <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-4 lg:gap-14 py-6 md:py-20 md:px-12">
                    <div className='absolute left-10 top-10 z-0'>
                        <img src={Circle} className='w-40 lg:w-full' alt="" />
                    </div>
                    <div className="relative lg:col-span-3 py-10 order-2 lg:order-1">
                        <div className="flex justify-between mb-8 z-10">
                            <div className="bg-white z-10 shadow-md lg:ml-10 lg:mt-5 rounded-lg py-6 px-10 w-full lg:w-[50%]">
                                <img src="https://themes.stackbros.in/eduport_r/assets/01-7N0KytgQ.jpg" alt="Carolyn Ortiz" className="w-12 mx-auto h-12 rounded-full" />

                                <p className="mt-4 text-center font-roboto text-gray-600">I’ve had an incredible experience with this platform! The lessons are clear, engaging, and easy to follow, which has helped me improve my skills faster than I expected. Highly recommended!</p>
                                <div className="mt-2 text-center text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                                <h3 className="text-lg font-heebo text-center font-semibold">Carolyn Ortiz</h3>
                            </div>
                            <div className="hidden lg:block absolute top-0 right-10 bg-white shadow-md rounded-lg p-6 w-full md:w-[35%]">
                                <div className='absolute -top-6 -right-4 p-4 bg-[#f7c32e] rounded-full'>
                                    <AiFillSafetyCertificate size={20} />
                                </div>
                                <h3 className="text-lg font-semibold mb-4">100+ Verified Mentors</h3>
                                <div className="space-y-2">

                                    <div className="flex items-center gap-4">
                                        <img src="https://themes.stackbros.in/eduport_r/assets/09-1AM4Ze_z.jpg" alt="Lori Stevens" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 className="font-heebo text-base font-bold">Lori Stevens</h3>
                                            <span className="font-roboto font-normal text-sm">Tutor of Physics</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <img src="https://themes.stackbros.in/eduport_r/assets/04-Axz2kzOk.jpg" alt="Billy Vasquez" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 className="font-heebo text-base font-bold">Billy Vasquez</h3>
                                            <span className="font-roboto font-normal text-sm">Tutor of Chemistry</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <img src="https://themes.stackbros.in/eduport_r/assets/02-Dm08lEkH.jpg" alt="Larry Lawson" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 className="font-heebo text-base font-bold">Larry Lawson</h3>
                                            <span className="font-roboto font-normal text-sm">Tutor of Technology</span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="relative flex justify-between lg:pb-14">

                            <div className="hidden lg:block bg-[#066ac9] bg-userBg bg-cover ml-20 text-white shadow-md rounded-lg p-6 text-center w-full md:w-[40%]">
                                <div className='absolute z-20 mr-2 -top-24 right-56'>
                                    <img src={Bg} alt="" />
                                </div>
                                <div className="text-2xl font-bold font-heebo">4.5/5.0</div>
                                <div className="flex items-center justify-center mt-2 tex-2xl text-yellow-300">
                                    <IoIosStar size={28} />
                                    <IoIosStar size={28} />
                                    <IoIosStar size={28} />
                                    <IoIosStar size={28} />
                                    <IoIosStarHalf size={28} />


                                </div>
                                <p className="mt-2 font-roboto">Based on 3265 ratings</p>
                            </div>
                            <div className="static lg:absolute lg:right-0 bg-white lg:-mt-24 shadow-md rounded-lg p-6 w-full lg:w-[40%]">
                                <img src="https://themes.stackbros.in/eduport_r/assets/03-gME39Lw5.jpg" alt="Dennis Barrett" className="w-12 mx-auto h-12 rounded-full" />

                                <p className="mt-4 text-center font-roboto text-gray-600">This platform has been a game-changer for me! The lessons are well-structured and very easy to understand, making learning both fun and effective.</p>
                                <div className="mt-2 text-center text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                                <h3 className="text-lg text-center font-heebo font-semibold">Dennis Barrett</h3>

                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 z-20 lg:text-start text-center order-1 lg:order-2">
                        <h2 className='font-heebo text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>Some valuable feedback from our students</h2>
                        <p className='text-base font-normal font-roboto text-[#747579] mb-6'>Here, we share some kind and valuable feedback from our students. Their words show how much they have learned and grown while being part of our learning journey. These messages tell us how our lessons have helped them and made a positive difference in their lives. We are proud of their success and thankful for their support as we continue to improve and help more learners. 🌟</p>
                        <Link className={'px-4 py-2 bg-[#066ac9] text-base text-[#fff] font-medium rounded-md hover:bg-[#0b579f] transition'}>View Reviews</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedbackSection;
