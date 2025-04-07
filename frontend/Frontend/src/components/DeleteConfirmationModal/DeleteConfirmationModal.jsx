import PropTypes from "prop-types";

const DeleteConfirmationModal = ({ isModalOpen, closeModal, handleDelete, isStudent }) => {


    return (
        <div >
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#00000054] bg-opacity-90 z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Confirm Deletion</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <p className="mb-6">{`Are you sure you want to delete this ${isStudent ? 'Student' : 'course'}?`}</p>

                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


DeleteConfirmationModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    handleDelete: PropTypes.func,
    isStudent: PropTypes.bool
}

export default DeleteConfirmationModal;