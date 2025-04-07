import { HiMiniCalendarDays } from "react-icons/hi2";
import { IoMdStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import PropTypes from "prop-types";
import { Link } from "react-router";


const PopularCourseCard = ({ course, isDes }) => {

    const {
        _id,
        title,
        image,
        rating,
        level,
        courseDescription,
        lectures,
        duration

    } = course;


    return (
        <div className="w-full md:max-w-[260px] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-44">
                <img src={image} alt="Photoshop Logo" className="w-full h-44" />
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold font-roboto cursor-pointer">{level}</span>
                    {/* <button
                        onClick={() => handleWishList(course)}
                    >
                        <IoHeart className={`h-6 w-6 text-red-500`} />
                    </button> */}
                </div>
                <Link
                    to={`/courses/${_id}`}
                    className="text-lg font-semibold font-heebo mt-2 text-xl text-[#24292d] hover:text-[#066ac9] transition cursor-pointer">{title.length <= 35 ? title : `${title.slice(0, 35) + '....'}`}</Link>

                {
                    isDes && (
                        <p className="text-[15px] font-roboto text-gray-600 mt-1">{courseDescription.length <= 54 ? courseDescription : courseDescription.slice(0, 54) + '....'}</p>
                    )
                }

                <div className="flex items-center mt-3 text-yellow-400">
                    <div className="flex">
                        <IoMdStar size={22} />
                        <IoMdStar size={22} />
                        <IoMdStar size={22} />
                        <IoMdStar size={22} />
                        <IoIosStarHalf size={22} />
                    </div>
                    <span className="text-gray-700 ml-2.5 text-[15px] font-heebo">{rating}</span>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                    <div className="flex gap-1 items-center">
                        <MdAccessTime color="#d6293e" />

                        <span className="ml-1 font-heebo text-[15px]">{duration}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <HiMiniCalendarDays color="#fd7e14" />

                        <span className="ml-1 font-heebo text-[15px]">{lectures} lectures</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

PopularCourseCard.propTypes = {
    course: PropTypes.object,
    isDes: PropTypes.bool,
    handleWishList: PropTypes.func,
}

export default PopularCourseCard;