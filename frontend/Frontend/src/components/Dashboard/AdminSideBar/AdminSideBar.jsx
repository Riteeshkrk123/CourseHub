import NavLinkMenu from "../NavLink/NavLink";
import { CiShoppingBasket } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { PiNotebookFill } from "react-icons/pi";

const AdminSideBar = () => {
    return (
        <>
            <NavLinkMenu title={'My Courses'} link={'/dashboard/all-courses'} icon={CiShoppingBasket} />
            <NavLinkMenu title={'Add Course'} link={'/dashboard/add-course'} icon={IoIosAddCircleOutline} />
            <NavLinkMenu title={'Students'} link={'/dashboard/students'} icon={FaUserFriends} />
            <NavLinkMenu title={'Orders'} link={'/dashboard/orders'} icon={PiNotebookFill} />

        </>
    );
};

export default AdminSideBar;