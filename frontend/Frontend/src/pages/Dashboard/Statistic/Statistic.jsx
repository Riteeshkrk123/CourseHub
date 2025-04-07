import useRole from "../../../hooks/useRole";
import AdminStatistic from "../Admin/AdminStatistic/AdminStatistic";
import StudentStatistic from "../Student/StudentStatistic/StudentStatistic";

const Statistic = () => {

    const { userRole } = useRole();

    return (
        <>
            {userRole === 'admin' && <AdminStatistic />}
            {userRole === 'student' && <StudentStatistic />}
        </>

    );
};

export default Statistic;