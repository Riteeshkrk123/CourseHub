import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import PrimarySpinner from "../../components/LoadingSpinner/PrimarySpinner";
import { useState } from "react";
import SocialLoggedIn from "../../components/SocialLoggedIn/SocialLoggedIn";


const SignInPage = () => {

    const { user, userSignIn, isLoading, setIsLoading } = useAuth();
    const [isType, setIsType] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location)
    if (isLoading) {
        return <PrimarySpinner />
    }

    if (user) {
        return <Navigate to={'/'} replace={true} />
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        // console.log(email)

        try {
            const userCredential = await userSignIn(email, password)
            if (userCredential.user) {
                toast.success('Successfully Logged In!');
                navigate(location.state ? location.state : '/', { replace: true });
            }

            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error('Invalid Credentials')
            setIsLoading(false)
        }

    }


    return (
        <section>
            <div className="container mx-auto px-3 md:px-2">

                <div className="min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden">
                        <div className="block text-center bg-blue-50 p-8">
                            <h1 className="text-[37px] font-bold text-[#24292d] font-heebo mb-2">Welcome to our largest community</h1>
                            <p className="text-[#24292d] text-base mb-6">Lets learn something new today!</p>
                            <div className="flex justify-center mb-6">
                                <img src="https://themes.stackbros.in/eduport_r/assets/02-CxJqFtvR.svg" alt="Illustration" className="w-full" />
                            </div>
                            <div className="text-center">
                                <p className="text-base font-heebo text-[#24292d]">4k+ Students joined us, now its your turn.</p>
                            </div>
                        </div>
                        <div className="p-4 lg:p-20">
                            <h2 className="text-[37px] font-heebo font-bold text-[#24292d] mb-4">
                                <span className="mr-2 block">👋</span>
                                Login into Eduport!
                            </h2>
                            <p className="text-[#747579] font-roboto font-normal text-[19px] mb-6">Nice to see you! Please log in with your account.</p>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label className="text-[#747579] font-normal font-sm font-roboto mb-2 block">Email address *</label>
                                    <div className="relative flex items-center">
                                        <input name="email" type="email" required className="w-full font-sm font-heebo text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-gray-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter email" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                                            <defs>
                                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                                </clipPath>
                                            </defs>
                                            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>

                                <div className="mt-4 mb-4">
                                    <label className="text-[#747579] font-normal font-sm font-roboto mb-2 block">Password *</label>
                                    <div className="relative flex items-center">
                                        <input name="password" type={isType ? 'text' : 'password'} required className="w-full text-sm font-heebo text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-gray-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter password" />
                                        <svg
                                            onClick={() => setIsType(!isType)}
                                            xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>
                                    </div>

                                    <p className="text-sm font-roboto text-[#9a9ea4] mt-1.5">Your password must be 8 characters at least</p>
                                </div>



                                <div className="flex items-center justify-between mb-6">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox text-blue-600" />
                                        <span className="ml-2 font-roboto text-base text-[#747579]">Remember me</span>
                                    </label>
                                    <a href="#" className="text-base font-roboto text-[#9a9ea4] hover:text-[#066ac9] underline">Forgot password?</a>
                                </div>
                                <button type="submit"
                                    className="w-full bg-[#066ac9] text-white py-2 rounded-md hover:bg-[#084783] font-roboto text-base font-medium">Login</button>
                            </form>
                            <div className="my-6 text-center text-gray-500">Or</div>

                            <SocialLoggedIn />

                            <div className="mt-4 text-center font-roboto text-[#747579] text-base">
                                <span>Don&lsquo;t have an account? <Link to={'/sign-up'} className="text-[#066ac9]">Signup here</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SignInPage;