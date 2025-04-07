
import { useState } from "react";
import toast from 'react-hot-toast';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Tooltip } from "react-tooltip";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const imgbb_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

const MultiStepForm = () => {

    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const axiosPublic = useAxiosPublic();
    const [isUploading, setIsUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Step 1
        title: "",
        category: "",
        level: "",
        language: "",
        price: '',
        image: "",
        // Step 2
        courseDescription: "",
        introDes: "",
        finalEndingDescription: "",
        skills: "",
        deadline: "",
        certificate: false,
        // Step 3
        curriculum: [],
        lectures: 0,
        duration: "",
        lastUpdated: "",
        // Step 4
        rating: "",
        totalReviewNumber: 0,
        enrolled: 0,

    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let finalValue;
        if (type === 'checkbox') {
            finalValue = checked;
        } else if (type === 'number') {

            finalValue = value === "" ? 0 : parseFloat(value);
        } else {
            finalValue = value;
        }

        setFormData({
            ...formData,
            [name]: finalValue
        });
    };



    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: type === "checkbox" ? checked : value,
    //     });
    // };


    const handleImage = async (img) => {
        // if (isUploading) {
        //     toast.error("Please wait, image is already being uploaded.");
        //     return;
        // }

        setIsUploading(true);

        // Validate file type and size
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(img.type)) {
            toast.error("Only JPEG, PNG, and GIF images are allowed.");
            setIsUploading(false);
            return;
        }

        if (img.size > maxSize) {
            toast.error("Image size must be less than 5MB.");
            setIsUploading(false);
            return;
        }

        try {
            // Create FormData object
            const data = new FormData();
            data.append("image", img);

            // Upload image to ImgBB
            const res = await axiosPublic.post(imgbb_API, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Check if the upload was successful
            if (res.data.success) {
                // Save the image URL to formData
                setFormData({ ...formData, image: res.data.data.display_url });
                toast.success("Image uploaded successfully!");
                setIsUploading(false);
            } else {
                toast.error("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error(error.message || "An error occurred while uploading the image.");
        } finally {
            setIsUploading(false);
        }
    };

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1:
                //We can also used break instead of return
                return (
                    formData.title.trim() !== '' &&
                    formData.category.trim() !== '' &&
                    formData.level.trim() !== '' &&
                    formData.language.trim() !== '' &&
                    formData.price.trim() !== '' &&
                    formData.image.trim() !== ''
                );

            case 2:
                return (
                    formData.courseDescription.trim() !== '' &&
                    formData.introDes.trim() !== '' &&
                    formData.finalEndingDescription.trim() !== '' &&
                    formData.skills.trim() !== '' &&
                    formData.deadline.trim() !== ''

                );

            case 3:
                return (
                    formData.curriculum.length !== 0 &&
                    formData.lectures !== 0 &&
                    formData.duration.trim() !== '' &&
                    formData.lastUpdated.trim() !== ''
                );

            case 4:
                return (
                    formData.rating.trim() !== '' &&
                    formData.totalReviewNumber !== 0 &&
                    formData.enrolled !== 0
                );

            // default:
            //     return true;
        }
    }


    const handelCurriculum = (e) => {
        // const textOne = e.target.value;
        // const textArray = textOne.split(',').map(item => item.trim());
        // setFormData({ ...formData, curriculum: textArray })

        const textArray = e.target.value.split(',').map(item => item.trim());
        setFormData({ ...formData, curriculum: textArray });
        // console.log(textArray)

    }

    const handleNext = () => {
        // (validateStep(step) === false)
        if (!validateStep(step)) {
            // console.log(step)
            toast.error('Please fill out all required fields.');
            return;
        }

        if (step < 4) {
            setStep(step + 1);
            // console.log(step)
        }



    };



    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(step)) {
            toast.error('Please fill out all required fields.');
            return;
        }

        try {
            const res = await axiosSecure.post('/add-course', { ...formData, email: user?.email, todayData: new Date() })
            if (res.data.insertedId) {
                toast.success('Successfully Added')
                e.target.reset();
                navigate('/dashboard/all-courses')
            }


        } catch (error) {
            toast.error(error.message || 'Failed to complete the action.')
        }


        // console.log("Course Data Submitted:", formData);

    };

    // console.log(step)


    return (
        <div className="min-h-screen flex items-center font-roboto py-10 justify-center bg-gray-900 text-white">
            <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
                {/* Progress Indicator */}
                <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step === s ? "bg-[#066ac9]" : "bg-gray-700"
                                }`}
                        >
                            {s}
                        </div>
                    ))}
                </div>


                {/* Form Steps */}
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-roboto font-bold mb-4">Basic Course Information</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title *"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category *"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="level"
                                placeholder="Level *"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="language"
                                placeholder="Language *"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Price *"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => handleImage(e.target.files[0])}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {formData.image && (
                                <div className="mt-4">
                                    <img
                                        src={formData.image}
                                        alt="Course Thumbnail"
                                        className="w-30 h-24 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-4">Course Description and Details</h2>
                            <textarea
                                name="courseDescription"
                                placeholder="Course Description *"
                                value={formData.courseDescription}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <textarea
                                name="introDes"
                                placeholder="Introduction Description *"
                                value={formData.introDes}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <textarea
                                name="finalEndingDescription"
                                placeholder="Final Ending Description"
                                value={formData.finalEndingDescription}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="skills"
                                placeholder="Skills *"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <div>
                                <input
                                    type="date"
                                    name="deadline"
                                    placeholder="Deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-tooltip-id="deadline-tooltip" // Required: Unique ID for the tooltip
                                    data-tooltip-content="Select the deadline" // Tooltip text
                                />
                                <Tooltip id="deadline-tooltip" />
                            </div>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="certificate"
                                    checked={formData.certificate}
                                    onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span>Certificate Available</span>
                            </label>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-4">Curriculum and Content</h2>
                            <textarea
                                name="curriculum"
                                placeholder="Curriculum *"
                                value={formData.curriculum && formData.curriculum.join(", ")}
                                onChange={handelCurriculum}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="number"
                                name="lectures"
                                placeholder="Number of Lectures *"
                                value={formData.lectures}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="duration"
                                placeholder="Duration *"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div>
                                <input
                                    type="date"
                                    name="lastUpdated"
                                    placeholder="Last Updated *"
                                    value={formData.lastUpdated}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    data-tooltip-id="deadline-tooltip"
                                    data-tooltip-content="Select the Last Updated Date"
                                />
                                <Tooltip id="deadline-tooltip" />
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                            <input
                                type="text"
                                name="rating"
                                placeholder="Rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="totalReviewNumber"
                                placeholder="Total Review Number"
                                value={formData.totalReviewNumber}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="enrolled"
                                placeholder="Enrolled"
                                value={formData.enrolled}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {step > 1 && (
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                Previous
                            </button>
                        )}


                        {step <= 3 && (
                            <button
                                disabled={isUploading}
                                onClick={handleNext}
                                className="px-4 py-2 bg-[#066ac9] rounded hover:bg-[#075eb1]"
                            >
                                {isUploading ? 'Wait a sec' : 'Next'}
                            </button>
                        )}

                        <button
                        type="submit"
                            className={`px-4 py-2 bg-[#066ac9] rounded hover:bg-[#075eb1] ${step === 4 ? 'block' : 'hidden'}`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MultiStepForm;