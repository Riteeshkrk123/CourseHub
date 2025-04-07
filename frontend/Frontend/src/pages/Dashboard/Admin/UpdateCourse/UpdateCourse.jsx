import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'; // Assuming you're using react-tooltip for tooltips
import useHandleImg from '../../../../hooks/useHandleImg';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router';
import PrimarySpinner from '../../../../components/LoadingSpinner/PrimarySpinner';

const UpdateCourse = () => {
    const { handleImage, isUploading, setIsUploading } = useHandleImg()
    const [step, setStep] = useState(1);
    const [loading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
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



    useEffect(() => {
        setIsLoading(true)
        axiosSecure.get(`/singel-course/${id}`)
            .then(res => {
                setFormData(res.data);
                setIsLoading(false)
            })
    }, [axiosSecure, id])



    console.log(formData)

    const { mutateAsync } = useMutation({
        mutationFn: async (updatedDate) => {
            const res = await axiosSecure.put(`/update-course/${id}`, updatedDate)
            return res.data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                toast.success('Successfully Updated')
                navigate('/dashboard/all-courses', { replace: true })
            }
        }
    })



    const imageUpload = async (value) => {
        const finalResult = await handleImage(value);

        setFormData({ ...formData, image: finalResult.data.display_url })
        toast.success("Image uploaded successfully!");
        setIsUploading(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedDate = Object.assign({}, formData);
        delete updatedDate._id;

        await mutateAsync(updatedDate)


        // console.log(updatedDate)
    };



    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };


    const handelCurriculum = (e) => {
        const textArray = e.target.value.split(',').map(item => item.trim());
        setFormData({ ...formData, curriculum: textArray });

    }


    if (loading) {
        return <PrimarySpinner />
    }




    return (
        <div className={`inset-0 z-50 flex py-10 items-center justify-center bg-black backdrop-blur-sm`}>
            <div className={`w-full max-w-2xl p-8 bg-gray-800 text-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out`}>


                {/* Progress Indicator */}
                <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step === s ? 'bg-[#066ac9]' : 'bg-gray-700'
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
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Title *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="Category *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="level"
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                placeholder="Level *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                placeholder="Language *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="Price *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => imageUpload(e.target.files[0])}
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
                                value={formData.courseDescription}
                                onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                                placeholder="Course Description *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <textarea
                                name="introDes"
                                value={formData.introDes}
                                onChange={(e) => setFormData({ ...formData, introDes: e.target.value })}
                                placeholder="Introduction Description *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <textarea
                                name="finalEndingDescription"
                                value={formData.finalEndingDescription}
                                onChange={(e) => setFormData({ ...formData, finalEndingDescription: e.target.value })}
                                placeholder="Final Ending Description"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                placeholder="Skills *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={new Date(formData.deadline).toISOString().split('T')[0]}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    placeholder="Deadline"
                                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-tooltip-id="deadline-tooltip"
                                    data-tooltip-content="Select the deadline"
                                />
                                <Tooltip id="deadline-tooltip" />
                            </div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="certificate"
                                    checked={formData.certificate}
                                    onChange={(e) => setFormData({ ...formData, certificate: e.target.checked })}
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
                                value={formData.lectures}
                                onChange={(e) => setFormData({ ...formData, lectures: e.target.value })}
                                placeholder="Number of Lectures *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                placeholder="Duration *"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div>
                                <input
                                    type="date"
                                    name="lastUpdated"
                                    value={new Date(formData.lastUpdated).toISOString().split('T')[0]}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    placeholder="Last Updated *"
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
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                placeholder="Rating"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="totalReviewNumber"
                                value={formData.totalReviewNumber}
                                onChange={(e) => setFormData({ ...formData, totalReviewNumber: e.target.value })}
                                placeholder="Total Review Number"
                                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="enrolled"
                                value={formData.enrolled}
                                onChange={(e) => setFormData({ ...formData, enrolled: e.target.value })}
                                placeholder="Enrolled"
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
                            type='submit'
                            className={`px-4 py-2 bg-[#066ac9] rounded hover:bg-[#075eb1] ${step === 4 ? 'block' : 'hidden'
                                }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UpdateCourse.propTypes = {
    isOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    course: PropTypes.object
}

export default UpdateCourse;