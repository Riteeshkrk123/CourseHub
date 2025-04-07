import { Outlet } from 'react-router';
import AsideBar from '../components/Dashboard/AsideBar/AsideBar';
import DashboardProfile from '../components/Dashboard/DashboardProfile/DashboardProfile';
import './DashBoard.css'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";


const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main className={`relative ${isOpen ? 'z-0' : ''}`}>
            <DashboardProfile setIsOpen={setIsOpen} isOpen={isOpen} />

            <section className='py-14'>
                <div className='container mx-auto px-3 lg:px-14'>
                    <div className="flex items-start">
                        <div className={`${isOpen ? 'block absolute top-0 right-0 w-full h-full bg-white overflow-scroll fixed z-50' : 'hidden'} xl:block`}>
                            <div className={`block xl:hidden flex items-center justify-between px-3 py-3`}>
                                <h4 className='text-[#24292d] font-heebo font-bold text-[20px]'>My Profile</h4>
                                <button
                                    onClick={() => setIsOpen(false)}
                                >
                                    <IoClose size={30} />
                                </button>
                            </div>

                            <AsideBar isOpen={isOpen} />

                        </div>

                        <div className="flex-1 xl:px-5 overflow-x-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Layout;
