import PropTypes from "prop-types";
import { FaCheckCircle } from "react-icons/fa";


const CourseDescription = ({ description, curriculums, finalDescription }) => {
    return (
        <div className="border mt-10 rounded-lg">
            <div className="p-5 border-b">
                <h2 className="text-[#24292d] text-3xl font-heebo font-bold">Course description</h2>
            </div>
            <div className="p-5 font-roboto text-[#747579] text-base">
                <p className="mb-12">
                    {description}
                </p>

                <h3 className="text-[#24292d] text-[22px] font-bold mb-5">What you’ll learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    {
                        curriculums.map((curriculum, index) => (
                            <li
                                key={index}
                                className="flex items-center">
                                <FaCheckCircle color='#4CBC87' className={'mr-2'} />
                                {curriculum}
                            </li>
                        ))
                    }
                </ul>

                <p className="mt-8">
                    {finalDescription}
                </p>
            </div>
        </div>
    );
};

CourseDescription.propTypes = {
    description: PropTypes.string,
    curriculums: PropTypes.array,
    finalDescription: PropTypes.string
}


export default CourseDescription;