import PropTypes from "prop-types";
import PopularCourseCard from "../../components/CourseCard/PopularCourseCard";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";

const Card = ({ courses, isLoading, cateNem }) => {
    return (
        <section>
            <div className="container mx-auto px-3 md:px-2">
                <div className="md:px-12 py-10">
                    <div className="bg-gray-100 py-5 rounded-md">
                        <h2 className="text-center font-roboto font-bold text-2xl">{cateNem}</h2>
                    </div>
                    <div className={`flex flex-col md:flex-row flex-wrap mt-14 gap-10 md:px-1`}>
                        {isLoading ? Array(8).fill(null).map((unUsed, index) => <SkeletonLoader key={index} />) :
                            courses.map(course => (
                                <PopularCourseCard key={course?._id} course={course} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

Card.propTypes = {
    courses: PropTypes.array,
    isLoading: PropTypes.bool,
    cateNem: PropTypes.string
}

export default Card;