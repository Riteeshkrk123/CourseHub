import { MdDelete } from "react-icons/md";
// import { MdBlock } from "react-icons/md";
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from 'react-helmet-async';
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useState } from "react";
import toast from 'react-hot-toast';


const Students = () => {

    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })


    const openModal = (email) => {
        setIsEmail(email);
        setIsModalOpen(true);
    }


    const closeModal = () => {
        setIsEmail('')
        setIsModalOpen(false)
    }


    const handleDeleteStudent = async () => {
        console.log(isEmail)
        if (isEmail) {
            const res = await axiosSecure.delete(`/student-remove/${isEmail}`)
            console.log(res.data)
            if (res.data.removeEnrolledStudents && res.data.removeEnrollments && res.data.removeStudent) {
                toast.success('Successfully student deleted!')
                refetch();
                closeModal();
            }
        }
    }



    return (
        <>
            <Helmet>
                <title>Students - CourseHub</title>
            </Helmet>

            <div className="w-full border rounded-md">
                <div className="mx-auto px-3 md:px-0">
                    <div className="p-5 border-b">
                        <h2 className="text-[#24292d] text-3xl font-heebo font-bold">Students List
                        </h2>
                    </div>
                    <div className="mt-6 overflow-x-auto px-2 md:px-4"> {/* Ensure this div has overflow-x-auto */}
                        <div className="min-w-[800px]"> {/* Set a minimum width to force overflow */}
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-800 text-white text-base font-bold font-roboto rounded-t-lg">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">User Email</th>
                                        <th className="p-4">User Role</th>
                                        <th className="p-4 rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white">
                                    {users.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-300 hover:bg-[#EFEFEF] cursor-pointer"
                                        >
                                            <td className="p-4 font-heebo font-base font-bold hover:text-[#066ac9] transition-all">
                                                {user?.email}
                                            </td>
                                            <td className="p-4 font-roboto text-[15px] font-normal">
                                                {user?.role}
                                            </td>
                                            <td className="p-4 font-roboto font-normal text-[15px]">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => openModal(user?.email)}
                                                        className="px-2 rounded-full bg-[#d6293e1a] py-2 text-[#d6293e] hover:bg-[#d6293e] hover:text-white transition-all"> <MdDelete size={16} /></button>
                                                    {/* <button className="px-2 bg-[#d6293e1a] text-[#d6293e] py-2 rounded-full hover:bg-[#d6293e] hover:text-white"> <MdBlock size={16} /></button> */}

                                                </div>

                                                <DeleteConfirmationModal isModalOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDeleteStudent} isStudent={true} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Students;