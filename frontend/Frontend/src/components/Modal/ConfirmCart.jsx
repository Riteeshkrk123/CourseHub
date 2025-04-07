import PropTypes from "prop-types";
import { Link } from "react-router";

const ConfirmCart = ({ isOpen, setIsOpen }) => {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div
        >
            {isOpen && (
                <div

                    className={`fixed inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 
          ${isOpen ? "opacity-100 visible z-40" : "opacity-0 invisible"}`}
                >
                    {/* Modal Box */}
                    <div
                        className={`w-full max-w-lg bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 
            ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                    >
                        <div>
                            <h4 className="text-xl font-heebo text-gray-800 font-semibold">
                            Login required to add to cart.
                            </h4>
                            <p className="text-sm font-roboto text-gray-600 mt-4">
                                {
                                    `This message is a short alert that notifies users they must log in before they can add a product to their cart. Thanks!`
                                }
                            </p>
                        </div>

                        <div className="flex gap-4 max-sm:flex-col mt-8">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-2.5 rounded-lg text-gray-800 text-sm tracking-wide border-none outline-none bg-gray-200 hover:bg-gray-300"
                            >
                                No, cancel
                            </button>
                            <button
                                className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wide border-none outline-none bg-[#333] hover:bg-[#222]"
                            >
                                <Link to={'/sign-in'}>Yes, confirm</Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ConfirmCart.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
}


export default ConfirmCart;