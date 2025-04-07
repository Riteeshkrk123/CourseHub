import { useState } from 'react';
import logo from '../../assets/hub-logo.png';
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import DropdownProfile from '../DropdownProfile/DropdownProfile';
import toast from 'react-hot-toast';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { FaShoppingCart } from "react-icons/fa";
import useCartLength from '../../hooks/useCartLength';


const Header = () => {
    const { user, userSignOut, isLoading } = useAuth();
    const [toggle, setToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const [categoryDropdown, setCategoryDropdown] = useState(false);
    const { carts } = useCartLength();

    const handleUserSignOut = async () => {
        try {
            await userSignOut();
        } catch (error) {
            toast.error(error.message || 'Something went wrong!');
        }
    };

    return (
        <header>
            <nav className="container mx-auto px-3">
                <div className="relative flex justify-between items-center w-full font-roboto py-4 md:gap-4">
                    {/* Logo */}
                    <a href="/">
                        <img src={logo} className="w-44 md:w-44 lg:w-52" alt="Eduport Logo" />
                    </a>

                    {/* Navigation Links and Search */}
                    <div className={`${toggle === true ? 'flex flex-col items-start block absolute mt-96 border w-full space-y-4 bg-white z-20' : 'hidden items-center'} md:flex justify-between w-[70%]`}>
                        {/* Category Dropdown */}
                        <ul className={`${toggle === true ? 'w-full' : ''} flex items-center space-x-4`}>
                            <li
                                className={`${toggle === true ? 'my-2 w-full' : ''} flex items-center space-x-2 px-4 py-2 text-[#066ac9] bg-[#E7F0FA] rounded-md cursor-pointer relative`}
                                onMouseEnter={() => setCategoryDropdown(true)}
                                onMouseLeave={() => setCategoryDropdown(false)}
                            >
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    fill="#066ac9"
                                    role="img"
                                    focusable="false"
                                >
                                    <path d="M3.5 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m9-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5M16 3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-9 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m5.5 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-9-11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
                                </svg>
                                <span className="font-medium text-[#066ac9]">Category</span>
                                {categoryDropdown && (
                                    <ul className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                                        <li className="px-4 py-2 hover:bg-[#E7F0FA] cursor-pointer">
                                            <Link
                                                to={'/category/web-design'}
                                            >
                                                Web Design
                                            </Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#E7F0FA] cursor-pointer">
                                            <Link to={'/category/development'}>
                                                Development
                                            </Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#E7F0FA] cursor-pointer">
                                            <Link to={'/category/graphic-design'}>
                                                Graphic Design
                                            </Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#E7F0FA] cursor-pointer">
                                            <Link to={'/category/marketing'}>
                                                Marketing
                                            </Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#E7F0FA] cursor-pointer">
                                            <Link to={'/category/finance'}>
                                                Finance
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>

                        {/* Main Navigation */}
                        <ul className={`${toggle === true ? 'flex-col w-full overflow-auto' : 'items-center space-x-6'} flex`}>
                            <li className={`${toggle === true ? 'px-4 py-2 border-y-2 hover:text-[#066ac9] hover:bg-[#E7F0FA] cursor-pointer' : ''}`}>
                                <NavLink to={'/'}
                                    className={({ isActive }) =>
                                        `${isActive ? "text-blue-600 " : "text-gray-700"} font-medium hover:text-blue-600`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className={`${toggle === true ? 'px-4 py-2 border-b-2 hover:text-[#066ac9] hover:bg-[#E7F0FA] cursor-pointer' : ''}`}>
                                <NavLink to={'/courses'}
                                    className={({ isActive }) => `${isActive ? 'text-blue-600' : 'text-gray-700'} font-medium hover:text-blue-600`}>
                                    Courses
                                </NavLink>
                            </li>
                            <li className={`${toggle === true ? 'px-4 py-2 border-b-2 hover:text-[#066ac9] hover:bg-[#E7F0FA] cursor-pointer' : ''}`}>
                                <NavLink to={'/dashboard'}
                                    className={({ isActive }) => `${isActive ? 'text-blue-600' : 'text-gray-700'} font-medium hover:text-blue-600`}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className={`${toggle === true ? 'px-4 py-2 border-b-2 hover:text-[#066ac9] hover:bg-[#E7F0FA] cursor-pointer' : ''}`}>
                                <NavLink to={'/contact'}
                                    className={({ isActive }) => `${isActive ? 'text-blue-600' : 'text-gray-700'} font-medium hover:text-blue-600`}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>

                        <Link to={'/dashboard/my-cart'} className='relative'>
                            <FaShoppingCart size={32} className='cursor-pointer text-gray-700' />
                            <span className='absolute top-1 right-2 z-20 text-white font-bold text-sm'>{user ? carts : ''}</span>
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div className='flex items-center justify-between gap-2'>
                        <Link to={'/dashboard/my-cart'}>
                            <FaShoppingCart size={32} className='md:hidden' />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setToggle(!toggle)}
                            className="md:hidden cursor-pointer">
                            {toggle ? <IoClose size={30} /> : <MdMenu size={30} />}
                        </button>

                        {isLoading ? (
                            <LoadingSpinner />
                        ) : user ? (
                            <div className="flex items-center space-x-4">
                                {/* Profile dropdown */}
                                <DropdownProfile
                                    profileToggle={profileToggle}
                                    setProfileToggle={setProfileToggle}
                                    handleUserSignOut={handleUserSignOut}
                                />
                            </div>
                        ) : (
                            <Link
                                to="/sign-in"
                                className=" px-2 md:px-4 py-2 text-sm rounded font-semibold text-white border-2 border-[#346AC9] bg-[#346AC9] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#066ac9]"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;