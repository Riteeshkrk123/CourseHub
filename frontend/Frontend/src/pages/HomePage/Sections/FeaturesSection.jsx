import FeaturesBox from "../../../components/FeaturesSection/FeaturesBox";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { BsFillPatchCheckFill } from "react-icons/bs";

const FeaturesSection = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2 px-12">

                    <FeaturesBox icon={MdOutlineDesktopWindows} title={'10K'} des={'Online Courses'} bgColor={'bg-yellow-100'} color={'text-[#F5C32F]'} />

                    <FeaturesBox icon={FaUserTie} title={'200+'} des={'Expert Tutors'} bgColor={'bg-[#DCE2E5]'} color={'text-[#1D3B53]'} />

                    <FeaturesBox icon={FaUserGraduate} title={'60K+'} des={'Online Students'} bgColor={'bg-purple-100'} color={'text-[#6F42C1]'} />

                    <FeaturesBox icon={BsFillPatchCheckFill} title={'6K+'} des={'Certified Courses'} bgColor={'bg-teal-100'} color={'text-[#45A3B7]'} />

                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;