import google from '../../assets/footer/google.jpg'
import apple from '../../assets/footer/apple.jpg'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import PropTypes from 'prop-types';


const Footer = ({ bgColor }) => {
    return (
        <footer className={`${bgColor ? bgColor : 'bg-[#f5f7f9]'} py-10`}>
            <div className="container mx-auto px-10 md:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">CourseHub</h1>
                        <p className="mt-4 text-sm md:text-base font-roboto text-gray-600">
                            Empowering learners with knowledge, resources, and opportunities to grow. Your journey to success starts here.
                        </p>
                        <div className="flex space-x-3 mt-4">
                            <a href="#" className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaFacebookF color='#316FF6' />
                            </a>
                            <a href="#" className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaInstagram color='#cd486b' />
                            </a>
                            <a href="#" className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaXTwitter />
                            </a>
                            <a href="#" className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaLinkedinIn color='#0077B5' />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold font-heebo text-gray-800">Company</h2>
                        <ul className="mt-4 space-y-2 text-sm md:text-base font-roboto text-gray-600">
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">About us</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Contact us</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">News and Blogs</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Career</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold font-heebo text-gray-800">Teaching</h2>
                        <ul className="mt-4 space-y-2 text-sm md:text-base font-roboto text-gray-700">
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Become a teacher</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">How to guide</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold font-heebo text-gray-800">Contact</h2>
                        <p className="text-sm md:text-base text-gray-700 font-roboto mt-2">Toll free: +1234 567 890</p>
                        <p className="text-sm md:text-base text-gray-700 font-roboto">(9:AM to 8:PM)</p>
                        <p className="text-sm md:text-base text-gray-700 font-roboto mt-2">Email: info@courseHub.com</p>
                        <div className="flex space-x-4 mt-4">
                            <img src={google} alt="Google Play" className=" max-w-full h-28" />
                            <img src={apple} alt="App Store" className=" max-w-full h-28" />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6 text-sm md:text-base font-roboto text-gray-600 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p>{`Copyrights ©${new Date().getFullYear()}`} CourseHub. Build by Developer Riteesh</p>
                        <div className="flex space-x-4 mt-4 sm:mt-0">
                            <a href="#" className="text-gray-800 hover:text-blue-600">Terms of use</a>
                            <a href="#" className="text-gray-800 hover:text-blue-600">Privacy policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

Footer.propTypes = {
    bgColor: PropTypes.string
}

export default Footer;