import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const CourseVideoPage = () => {
    const [openModule, setOpenModule] = useState(null);
    const videoURL = 'https://www.youtube.com/embed/98BzS5Oz5E4?si=S29dOW5W0OlVn6n3';
    const [url, setUrl] = useState(videoURL);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const toggleModule = (index) => {
        setOpenModule(openModule === index ? null : index);
    };

    const courseModules = [
        {
            title: "Introduction to [Topic]",
            videos: [
                { title: "Welcome to the Course", duration: "5:32", videoLink: 'https://www.youtube.com/embed/98BzS5Oz5E4?si=S29dOW5W0OlVn6n3' },
                { title: "Express App Setup", duration: "15:30", videoLink: 'https://www.youtube.com/embed/8DploTqLstE?si=tmLEyujy5AW2W4V7' },
            ],
        },
        {
            title: "Getting Started with Express",
            videos: [
                { title: "Express Router & API Routes", duration: "13:37", videoLink: 'https://www.youtube.com/embed/Ll6knx7sFis?si=BDHxd1dcpV01DdNg' },
                { title: "MongoDB Atlas & Mongoose", duration: "08:48", videoLink: 'https://www.youtube.com/embed/s0anSjEeua8?si=pSRUxC2cxDuYxqXM' },
            ],
        },
        {
            title: "Advanced Techniques",
            videos: [
                { title: "Models & Schemas", duration: "12:42", videoLink: 'https://www.youtube.com/embed/O8IipcpTmYU?si=fHfBYcGxPehwy-nJ' },
                { title: "Controllers (part 1)", duration: "14:31", videoLink: 'https://www.youtube.com/embed/oEHHjs1UVXQ?si=SUza-DaMI1EhPiyZ' },
                { title: "Controllers (part 2)", duration: "09:04", videoLink: 'https://www.youtube.com/embed/MwiyQsWSlc0?si=0IMizVh_ds84-v0g' },
            ],
        },
        {
            title: "Final Project",
            videos: [
                { title: "Making a React Ap", duration: "9:46", videoLink: 'https://www.youtube.com/embed/bx4nk7kBS10?si=GJE7TUVipbmvz_kf' },
                { title: "Fetching Data", duration: "14: 07", videoLink: 'https://www.youtube.com/embed/MEab_a19ZGk?si=zXq5aKj38iO3iMnd' },
            ],
        },
    ];

    // console.log(id)

    const { data } = useQuery({
        queryKey: ['course-modules-info', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollments-course/${id}`);
            return res.data;
        }

    })

    // console.log(data)


    return (
        <>
            <Helmet>
                <title>{`${data?.title} - CourseHub`}</title>
            </Helmet>

            <div className="bg-gray-100 min-h-screen p-6">
                <div className="container mx-auto">
                    {/* Header */}
                    <header className="bg-white shadow-md p-4 mb-6 rounded-lg">
                        <h1 className="text-2xl font-bold text-gray-800 font-heebo">{data?.title}</h1>
                        <p className="text-gray-600">Learn the fundamentals of [Course Topic]</p>
                    </header>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Video Player Section */}
                        <div className="lg:w-2/3">
                            <div className="bg-black aspect-video rounded-lg overflow-hidden">
                                {/* Replace the iframe with your video player */}
                                <iframe
                                    className="w-full h-full"
                                    src={url}
                                    title="Course Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Video Details */}
                            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">What will you learn?</h2>
                                <p className="text-gray-600 mt-2">
                                    This video covers the basics of .... You will learn about ......
                                </p>
                            </div>
                        </div>

                        {/* Course Modules Section */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Modules</h3>
                                <div className="space-y-2">
                                    {courseModules.map((module, index) => (
                                        <div key={index} className="border rounded-lg">
                                            {/* Module Header */}
                                            <div
                                                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                                onClick={() => toggleModule(index)}
                                            >
                                                <span className="text-gray-800">{module.title}</span>
                                                <span className="text-gray-600">
                                                    {openModule === index ? "▼" : "▶"}
                                                </span>
                                            </div>

                                            {/* Module Videos (Collapsible) */}
                                            {openModule === index && (
                                                <div className="p-2 bg-gray-50">
                                                    {module.videos.map((video, videoIndex) => (
                                                        <div
                                                            key={videoIndex}
                                                            className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                                        >
                                                            <span
                                                                onClick={() => setUrl(video?.videoLink)}
                                                                className="text-gray-700">{video.title}</span>
                                                            <span className="text-gray-500 text-sm">{video.duration}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Course Progress */}
                            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: "5%" }}
                                    ></div>
                                </div>
                                <p className="text-gray-600 mt-2">5% Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseVideoPage;




// const CourseVideoPage = () => {
//     return (
//         <div className="bg-gray-100">
//             <div className="p-4">
//                 <div className="bg-white shadow-md p-4 mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800">Course Title</h1>
//                     <p className="text-gray-600">Learn the fundamentals of ...</p>
//                 </div>

//                 {/* <!-- Main Content --> */}
//                 <div className="flex flex-col lg:flex-row gap-6">
//                     <div className="lg:w-2/3">
//                         <div className="bg-black aspect-video rounded-lg overflow-hidden">
//                             {/* <!-- Replace the iframe with your video player --> */}
//                             <iframe width="560" height="315" src="https://www.youtube.com/embed/fJ5U3Q3PZ4s?si=Sg9XUE4l38zzTgP7" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
//                         </div>

//                         <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
//                             <h2 className="text-xl font-semibold text-gray-800">Video Title</h2>
//                             <p className="text-gray-600 mt-2">
//                                 This video covers the basics of .... You will learn about....
//                             </p>
//                         </div>
//                     </div>

//                     <div className="lg:w-1/3">
//                         <div className="bg-white p-4 rounded-lg shadow-md">
//                             <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Modules</h3>
//                             <ul className="space-y-2">
//                                 {/* <!-- Module List --> */}
//                                 <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//                                     <span className="text-gray-600 mr-2">▶️</span>
//                                     <span className="text-gray-800">Introduction to ..</span>
//                                 </li>
//                                 <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//                                     <span className="text-gray-600 mr-2">▶️</span>
//                                     <span className="text-gray-800">Getting Started with ...</span>
//                                 </li>
//                                 <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//                                     <span className="text-gray-600 mr-2">▶️</span>
//                                     <span className="text-gray-800">Advanced Techniques</span>
//                                 </li>
//                                 <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//                                     <span className="text-gray-600 mr-2">▶️</span>
//                                     <span className="text-gray-800">Final Project</span>
//                                 </li>
//                             </ul>
//                         </div>


//                         <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//                             <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                 <div className="bg-blue-600 h-2.5 rounded-full" style={{ "width": "45%" }}></div>
//                             </div>
//                             <p className="text-gray-600 mt-2">45% Completed</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourseVideoPage;