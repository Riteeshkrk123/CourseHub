import NavLinkMenu from "../NavLink/NavLink";
import { CiShoppingBasket } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

const StudentSideBar = () => {
    return (
        <>
            <NavLinkMenu title={'My Courses'} link={'/dashboard/my-course'} icon={CiShoppingBasket} />
            <NavLinkMenu title={'My Cart'} link={'/dashboard/my-cart'} icon={FaCartPlus} />
            <NavLinkMenu title={'Payment Info'} link={'/dashboard/payment-info'} icon={MdPayment} />

        </>

    );
};

export default StudentSideBar;