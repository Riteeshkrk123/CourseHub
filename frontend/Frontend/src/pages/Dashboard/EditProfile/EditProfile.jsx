import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from 'react-hot-toast'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from 'react-helmet-async';


const imgbb_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`
const EditProfile = () => {

    const { user, updateUserProfile } = useAuth();
    const [name, setName] = useState(user?.displayName);
    const [image, setImage] = useState(null)
    const axiosPublic = useAxiosPublic();


    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image)
        try {

            const res = await axiosPublic.post(imgbb_API, formData)

            const imageURL = res.data.data.display_url;
            // console.log(res.data)
            await updateUserProfile(name, imageURL)

        } catch (error) {
            toast.error(error.message)
        }

    }

    // console.log(image)


    return (
        <>
            <Helmet>
                <title>Edit Profile - CourseHub</title>
            </Helmet>

            <div className="px-4">
                <div className="border mt-6 rounded-lg">
                    <div className="p-5 border-b">
                        <h2 className="text-[#24292d] text-3xl font-heebo font-bold">Edit Profile
                        </h2>
                    </div>
                    <div className="px-6 py-5">
                        <div className="mb-10">
                            <span className="text-[#747579] font-roboto font-[15px] font-normal">Profile Picture</span>
                            <div className="flex mt-4 gap-8 items-center mb-6">
                                <div className="w-24 h-24">
                                    <img
                                        referrerPolicy="no-referrer"
                                        className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                                        src={user?.photoURL}
                                    />
                                </div>
                                <div className="max-w-md">
                                    <label className="text-base text-gray-500 font-semibold mb-2 block">Upload image*</label>
                                    <input
                                        onChange={(e) => setImage(e.target.files[0])}
                                        type="file"
                                        required
                                        className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                                    <p className="text-xs text-gray-400 mt-2">PNG and JPG are Allowed.</p>
                                </div>
                            </div>
                        </div>
                        <form
                            onSubmit={handleUpdate}
                        >
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-[#747579] font-roboto font-[15px] font-normal mb-2">Full Name*</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066ac9] transition-all duration-300"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone-number" className="block text-[#747579] font-roboto font-[15px] font-normal mb-2">Phone number</label>
                                    <input
                                        type="text"
                                        id="number"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066ac9] transition-all duration-300"
                                        placeholder="Enter your number"

                                    />

                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-[#747579] font-roboto font-[15px] font-normal mb-2">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066ac9] transition-all duration-300"
                                        placeholder="Enter your email"
                                        required
                                    />

                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-[#747579] font-roboto font-[15px] font-normal mb-2">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066ac9] transition-all duration-300"
                                        placeholder="Enter your location"

                                    />

                                </div>

                            </div>

                            <div className="mt-4">
                                <label htmlFor="about-me" className="block text-[#747579] font-roboto font-[15px] font-normal mb-2">About Me</label>
                                <textarea
                                    type="text"
                                    id="about-me"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066ac9] transition-all duration-300"
                                    placeholder="Write about yourself"

                                />

                            </div>

                            <div className="text-end mt-5">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#066ac91a] text-[#066ac9] rounded-md hover:bg-blue-600 hover:text-white font-roboto font-[15px] transition-all">
                                    Save Changes
                                </button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default EditProfile;