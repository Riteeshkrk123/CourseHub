import { IoStarSharp } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router";

const TrendingCourseCard = ({ trendingCourse, handleAddtoCart }) => {

    const {
        _id,
        title,
        image,
        rating,
        totalReviewNumber,
        enrolled,
        level,
        price,
        category,
        lectures,
        duration,
        name,
        userImg

    } = trendingCourse;



    return (
        <div className="max-w-[355px] border rounded-lg shadow-lg overflow-hidden group">
            <img
                className="w-full h-60 object-cover"
                src={image}
                alt="Teamwork Image"
            />

            <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded font-roboto">
                        {category.replace('-', ' ').toLocaleUpperCase()}
                    </span>
                    <span className="font-roboto bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                        {level}
                    </span>
                </div>

                <Link
                    to={`/courses/${_id}`}
                    className="text-lg font-heebo font-bold text-[#24292d] hover:text-[#066ac9] transition cursor-pointer">
                    {title}
                </Link>

                <div className="flex items-center justify-between text-gray-500 text-sm mt-2 space-x-4">
                    <div className="flex gap-1 items-center font-roboto">
                        <span className="text-sm text-[#f7c32e]">{rating}</span>
                        <span className="text-[#f7c32e]"><IoStarSharp size={16} /> </span>
                        <span>({totalReviewNumber})</span>
                    </div>

                    <div className="font-roboto">
                        <span>{enrolled}</span>
                        <span className="ml-1">(Students)</span>
                    </div>
                </div>

                <div className="flex items-center text-gray-500 font-roboto text-sm mt-4 space-x-6 mb-4">
                    <div className="flex gap-1 items-center">
                        <MdAccessTime color="#d6293e" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <HiMiniCalendarDays color="#fd7e14" />
                        <span>{lectures} Lectures</span>
                    </div>
                </div>

                <div className="border-t-2 pt-4 flex items-center font-heebo justify-between">
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-9 h-9 rounded-md"
                            src={userImg}
                            alt="Instructor"
                        />
                        <span className="text-sm text-gray-800 font-medium">{name}</span>
                    </div>
                    {/* Hover effect */}
                    <div className="text-lg font-bold text-[#0cbc87] group-hover:hidden">{price}</div>
                    <button
                        onClick={() => handleAddtoCart(trendingCourse)}
                        className="hidden text-sm font-bold text-[#0cbc87] px-4 font-roboto py-2 hover:bg-[#0cbc87] hover:text-white rounded-md bg-[#0cbc871a] cursor-pointer transition group-hover:block">
                        <div className="flex items-center gap-2">
                            <span><FaCartShopping /></span>
                            <span>Add to cart</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>


    );
};

TrendingCourseCard.propTypes = {
    trendingCourse: PropTypes.object,
    handleAddtoCart: PropTypes.func
}

export default TrendingCourseCard;