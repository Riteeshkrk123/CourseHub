import PropTypes from "prop-types";
import { IoOptionsOutline } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";

const DashboardProfile = ({ setIsOpen, isOpen }) => {
    const { user } = useAuth();
    const { userRole } = useRole();

    return (
        <section>
            <div className="px-0">
                <div className="bg-dashboardBanner h-[100px] md:h-[160px] bg-cover bg-no-repeat bg-[#1d3b53]">
                </div>
            </div>
            <div className="container mx-auto px-5 md:px-8 lg:px-20">
                {/* Profile Stuff */}
                <div className="flex pb-10 pt-3 md:pb-0">
                    <div className="coll-12">
                        <div className=''>
                            <div className='flex gap-2'>
                                <div className='coll-auto px-2 mdpx-4'>
                                    <div className='w-28 h-28 md:w-40 md:h-40 inline-block relative -mt-4 md:-mt-7'>
                                        <img referrerPolicy="no-referrer" className="w-28 h-28 md:w-40 md:h-40 shrink-0 z-20 rounded-full border-2 border-blue-600 ring-2 ring-white inline-block" src={user?.photoURL} alt="avatar" />

                                        {/* conditional if the student pro */}
                                        {/* <span className='absolute -ml-12 bottom-1 px-5 py-1 bg-[#4CBC87] rounded-3xl text-sm font-roboto text-[#fff] font-medium'>Learner</span> */}
                                    </div>
                                </div>
                                <div className='profile-des-container flex items-center justify-between flex-col gap-6 md:flex-row gap-3 md:pl-6 md:pr-2'>
                                    {/* profile name and it will another div for btn */}
                                    <div className=''>
                                        <h2 className='text-[#24292d] font-bold text-2xl lg:text-[26px] font-heebo mb-1.5'>{user?.displayName}</h2>
                                        <ul className='flex items-start md:items-center flex-col md:flex-row'>
                                            <li className='inline-block mr-4'>
                                                <span className='text-[15px] font-bold text-[#24292d] font-heebo mr-1'>15</span>
                                                <span className='font-heebo text-[15px] text-[#747579]'>Points</span>
                                            </li>
                                            <li className='inline-block mr-4'>
                                                <span className='text-[15px] font-bold text-[#24292d] font-heebo mr-1'>0</span>
                                                <span className='font-heebo text-[15px] text-[#747579]'>Completed courses</span>
                                            </li>
                                            <li className='inline-block'>
                                                <span className='text-[15px] font-bold text-[#24292d] font-heebo mr-1'>0</span>
                                                <span className='font-heebo text-[15px] text-[#747579]'>Completed lessons</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full md:w-[40%] md:text-end">
                                        {userRole === 'admin' ? (<Link to={'/dashboard/all-courses'} className=' px-6 py-2.5 md:px-3 lg:px-6 lg:py-2.5 border border-[#066ac9] rounded-md text-[#066ac9] font-roboto text-base font-medium hover:bg-[#066ac9] hover:text-white transition duration-300'>View my courses</Link>) : (
                                            <Link to={'/dashboard/my-course'} className=' px-6 py-2.5 md:px-3 lg:px-6 lg:py-2.5 border border-[#066ac9] rounded-md text-[#066ac9] font-roboto text-base font-medium hover:bg-[#066ac9] hover:text-white transition duration-300'>View my courses</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`block xl:hidden`}>
                    <hr className="mt-8 mb-8" />
                    <div className='flex items-center justify-between'>
                        <a className="text-[#24292d] font-bold text-base font-heebo">Menu</a>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='p-2 bg-[#066ac9] rounded-md'>
                            <IoOptionsOutline color="#FFFFFF" size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

DashboardProfile.propTypes = {
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool
}

export default DashboardProfile;