import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PrimarySpinner from "../components/LoadingSpinner/PrimarySpinner";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const { userRole, isPending } = useRole();

    if (isLoading || isPending) {
        return <PrimarySpinner />
    }

    if (user && userRole === 'admin') {
        return children;
    }

    return <Navigate to={'/'} replace />
};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;