import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const DropdownProfile = ({ profileToggle, setProfileToggle, handleUserSignOut }) => {

    const { user } = useAuth();
    // Ref to the dropdown container
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileToggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [setProfileToggle]);



    return (
        <div ref={dropdownRef} className='relative'>
            <button
                onClick={() => setProfileToggle(!profileToggle)}
            >
                <img
                    src={user?.photoURL}
                    className="inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
                />
            </button>

            <div className={`${profileToggle ? 'block' : 'hidden'} absolute z-50 min-w-[270px] -left-52 top-12 overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg shadow-sm focus:outline-none`}>
                <div className="px-2 py-4 bg-white flex items-center space-x-4">
                    <img src={user?.photoURL} referrerPolicy="no-referrer" alt="Profile Picture" className="w-12 h-12 rounded-full" />
                    <div>
                        <h4 className="text-base font-heebo font-semibold text-[#24292d]">{user?.displayName}</h4>
                        <p className="text-sm font-roboto text-[#747579]">{user?.email}</p>
                    </div>
                </div>

                <hr className="mt-1 mb-3" />

                <ul>
                    <li>
                        <Link
                            to={'/dashboard'}
                            className="group cursor-pointer text-[#747579] flex w-full text-[15px] font-medium items-center rounded-md p-3 transition-all hover:bg-[#E7F0FA] hover:text-[#066ac9] focus:bg-[#E7F0FA]"

                        >
                            <FaUser size={17} className="group-hover:text-[#066ac9] mr-2" />
                            Dashboard
                        </Link>

                    </li>
                    <li>
                        <Link
                            to={'/dashboard/edit-profile'}
                            className="group cursor-pointer text-[#747579] flex w-full text-[15px] font-medium items-center rounded-md p-3 transition-all hover:bg-[#E7F0FA] hover:text-[#066ac9] focus:bg-[#E7F0FA]"

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:text-[#066ac9] mr-2">
                                <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                            </svg>

                            Edit Profile
                        </Link>

                    </li>

                    <li
                        className="group cursor-pointer text-[#747579] flex w-full text-[15px] font-medium items-center rounded-md p-3 transition-all hover:bg-[#E7F0FA] hover:text-[#066ac9] focus:bg-[#E7F0FA]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:text-[#066ac9] mr-2">
                            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                        </svg>

                        Help
                    </li>

                    <hr className="my-2 border-slate-200" role="menuitem" />

                    <li
                        onClick={handleUserSignOut}
                        className="cursor-pointer text-[#747579] flex w-full text-[15px] font-medium items-center rounded-md p-3 transition-all hover:bg-[#F9E8EC] hover:text-[#d6293e] focus:bg-[#F9E8EC]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5  mr-2">
                            <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                        </svg>

                        Sign Out
                    </li>
                </ul>

            </div>
        </div>
    );
};

DropdownProfile.propTypes = {
    profileToggle: PropTypes.bool,
    setProfileToggle: PropTypes.func,
    handleUserSignOut: PropTypes.func
}

export default DropdownProfile;