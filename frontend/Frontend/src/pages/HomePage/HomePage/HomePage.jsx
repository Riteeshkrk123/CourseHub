import FeaturesSection from "../Sections/FeaturesSection";
import FeedBackSection from "../Sections/FeedBackSection";
import HeroSection from "../Sections/HeroSection";
import InstructorSection from "../Sections/InstructorSection";
import PopularCourses from "../Sections/PopularCourses";
import TrendingCourses from "../Sections/TrendingCourses";
import { Helmet } from 'react-helmet-async';


const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>
                    Your Ultimate Destination to Master Skills Online - CourseHub
                </title>
            </Helmet>
            <HeroSection />
            <FeaturesSection />
            <PopularCourses />
            <InstructorSection />
            <TrendingCourses />
            <FeedBackSection />

        </>
    );
};

export default HomePage;