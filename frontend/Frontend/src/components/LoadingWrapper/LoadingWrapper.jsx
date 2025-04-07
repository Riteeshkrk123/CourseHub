import { useEffect, useState } from "react";
import PrimarySpinner from "../LoadingSpinner/PrimarySpinner";
import PropTypes from "prop-types";

const LoadingWrapper = ({ children }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    if (loading) {
        return <PrimarySpinner />
    }

    return children;

};


LoadingWrapper.propTypes = {
    children: PropTypes.node
}

export default LoadingWrapper;