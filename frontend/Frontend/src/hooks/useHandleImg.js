import { useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import toast from 'react-hot-toast';

const imgbb_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

const useHandleImg = () => {

    const axiosPublic = useAxiosPublic();
    const [isUploading, setIsUploading] = useState(false);


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

            return res.data;

            // if (res.data.success) {
            //     // Save the image URL to formData
            //     setImage(res.data.data.display_url)
            //     toast.success("Image uploaded successfully!");
            //     setIsUploading(false);
            // }



        } catch (error) {
            console.error("Image upload error:", error);
            toast.error(error.message || "An error occurred while uploading the image.");
        } 
    };


    return { handleImage, isUploading, setIsUploading }
};

export default useHandleImg;