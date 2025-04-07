import { MdDashboard } from "react-icons/md";
import useRole from "../../../hooks/useRole";
import AdminRoute from "../../../routes/AdminRoute";
import StudentRoute from "../../../routes/StudentRoute";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import NavLinkMenu from "../NavLink/NavLink";
import StudentSideBar from "../StudentSideBar/StudentSideBar";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";


/* Student side bar */

const AsideBar = ({ isOpen }) => {
    const { userRole } = useRole();
    const { userSignOut } = useAuth();
    const navigate = useNavigate();

    const handleUserSingOut = async () => {
        await userSignOut();
        navigate('/');
    }

    // console.log(userRole)

    // ${isOpen ? 'block absolute top-0 right-0 ' : 'hidden'} xl:block

    return (

        <aside className={`${isOpen ? 'overflow-scroll w-full h-full' : 'w-64'} bg-[#24292d] text-white rounded-lg p-6 flex flex-col justify-start`}>

            <NavLinkMenu title={'Dashboard'} icon={MdDashboard} />

            {
                userRole === 'student' && <StudentRoute><StudentSideBar /></StudentRoute>
            }
            {
                userRole === 'admin' && <AdminRoute><AdminSideBar /></AdminRoute>
            }

            <NavLinkMenu title={'Edit Profile'} link={'/dashboard/edit-profile'} icon={FaEdit} />
            <button
                onClick={handleUserSingOut}
                className="flex items-center block px-4 py-2 mb-2 font-roboto text-base text-[#d6293e] font-normal rounded-md hover:bg-[#34282F] rounded transition delay-75 ">
                <LiaSignOutAltSolid className="mr-2" />
                Sign Out
            </button>

        </aside>

    );
};

AsideBar.propTypes = {
    isOpen: PropTypes.bool
}

export default AsideBar;

