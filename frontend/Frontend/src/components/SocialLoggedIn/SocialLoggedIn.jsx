import { FaFacebookF, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SocialLoggedIn = () => {
    const { singInWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            await singInWithGoogle();

        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        }
    }

    
    return (
        <>
            <button
                onClick={handleGoogleSignIn}
                className="w-full border border-gray-300 text-white bg-[#3c7ff1] py-2 rounded-md flex gap-2 font-roboto font-medium items-center justify-center mb-2.5 hover:bg-[#3972D9]">
                <FaGoogle />
                Login with Google
            </button>
            <button
                className="w-full border border-gray-300 text-white bg-[#5475bc] py-2 rounded-md flex gap-2 font-roboto font-medium items-center justify-center hover:bg-[#435e99]">
                <FaFacebookF />
                Login with Google
            </button>
        </>
    );
};

export default SocialLoggedIn;