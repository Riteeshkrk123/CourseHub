import { FaCalendarAlt, FaEnvelope, FaPhone, FaUser, FaVenusMars } from "react-icons/fa";

const StepOne = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="flex items-center space-x-4">
                <FaUser className="text-gray-400" />
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"

                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-center space-x-4">
                <FaEnvelope className="text-gray-400" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"

                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-center space-x-4">
                <FaPhone className="text-gray-400" />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number *"

                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-gray-400" />
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth *"

                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-center space-x-4">
                <FaVenusMars className="text-gray-400" />
                <select
                    name="gender"

                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    );
};

export default StepOne;