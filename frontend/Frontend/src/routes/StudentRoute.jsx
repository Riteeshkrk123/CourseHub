import { Navigate } from "react-router";
import PrimarySpinner from "../components/LoadingSpinner/PrimarySpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

const StudentRoute = ({ children }) => {

    const { user, isLoading } = useAuth();
    const { userRole, isPending } = useRole()

    if (isLoading || isPending) {
        return <PrimarySpinner />
    }

    if (user && userRole === 'student') {
        return children;
    }


    return <Navigate to={'/'} replace />
};

StudentRoute.propTypes = {
    children: PropTypes.node
}

export default StudentRoute;