import { ImSpinner9 } from "react-icons/im";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <ImSpinner9 className="m-auto animate-spin" />
        </div>
    );
};

export default LoadingSpinner;