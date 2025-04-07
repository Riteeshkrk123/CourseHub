import PropTypes from "prop-types";
import { NavLink } from "react-router";

const NavLinkMenu = ({ title, link, icon: Icon }) => {
    return (
        <NavLink
            to={link || '/dashboard'}
            end
            className={({ isActive }) =>
                `flex items-center block px-4 py-2 mb-2 font-roboto text-base font-normal rounded-md transition delay-75 ${isActive
                    ? 'text-[#24292d] bg-white' // Active state styles
                    : 'text-[#fff] hover:bg-[#fff] hover:text-[#24292d]' // Default and hover state styles
                }`
            }
        >
            <Icon className="mr-2" />
            {title}
        </NavLink>
    );
};

NavLinkMenu.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.func
}

export default NavLinkMenu;