import PropTypes from "prop-types";

const CourseIntro = ({ title, des }) => {
    return (
        <div className="text-center pb-10">

            <h2 className="text-3xl lg:text-4xl font-heebo font-bold text-gray-800">
                {title}
            </h2>

            <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
                {des}
            </p>
        </div>
    );
};

CourseIntro.propTypes = {
    title: PropTypes.string,
    des: PropTypes.string
}

export default CourseIntro;