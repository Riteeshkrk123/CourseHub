import { createBrowserRouter } from "react-router";
import Main from "../layouts/Main";
import HomePage from "../pages/HomePage/HomePage/HomePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import CoursePage from "../pages/CoursePage/CoursePage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Layout from "../layouts/DashBoard";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Dashboard/Student/Cart/Cart";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import EditProfile from "../pages/Dashboard/EditProfile/EditProfile";
import CourseVideoPage from "../pages/Dashboard/Student/CourseVideoPage/CourseVideoPage";
import MyCourse from "../pages/Dashboard/MyCourse/MyCourse";
import Orders from "../pages/Dashboard/Admin/Orders/Orders";
import StudentRoute from "./StudentRoute";
import AdminRoute from "./AdminRoute";
import Students from "../pages/Dashboard/Admin/Students/Students";
import AddCourse from "../pages/Dashboard/Admin/AddCourse/AddCourse";
import AllCourses from "../pages/Dashboard/Admin/AllCourses/AllCourses";
import Statistic from "../pages/Dashboard/Statistic/Statistic";
import UpdateCourse from "../pages/Dashboard/Admin/UpdateCourse/UpdateCourse";
import WebDesign from "../pages/CategoryPages/WebDesign";
import Development from "../pages/CategoryPages/Development";
import GraphicDesign from "../pages/CategoryPages/GraphicDesign";
import Marketing from "../pages/CategoryPages/Marketing";
import Finance from "../pages/CategoryPages/Finance";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <div>This is error page</div>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'courses',
                element: <CoursePage />
            },
            {
                path: 'courses/:id',
                element: <PrivateRoute><CourseDetails /></PrivateRoute>
            },
            {
                path: 'category/web-design',
                element: <WebDesign />

            },
            {
                path: 'category/development',
                element: <Development />

            },
            {
                path: 'category/graphic-design',
                element: <GraphicDesign />

            },
            {
                path: 'category/marketing',
                element: <Marketing />

            },
            {
                path: 'category/finance',
                element: <Finance />

            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'payment-info',
                element: <PaymentHistory />
            }

        ]
    },
    {
        path: '/sign-in',
        element: <SignInPage />
    },
    {
        path: '/sign-up',
        element: <SignUpPage />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Layout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Statistic />
            },
            {
                path: 'my-course',
                element: <StudentRoute><MyCourse /></StudentRoute>
            },
            {
                path: 'video/:id',
                element: <StudentRoute><CourseVideoPage /></StudentRoute>
            },
            {
                path: 'my-cart',
                element: <StudentRoute><Cart /></StudentRoute>
            },
            {
                path: 'payment-info',
                element: <StudentRoute><PaymentHistory /></StudentRoute>
            },
            {
                path: 'edit-profile',
                element: <PrivateRoute><EditProfile /></PrivateRoute>
            },
            {
                path: 'all-courses',
                element: <AdminRoute><AllCourses /></AdminRoute>
            },
            {
                path: 'course/update/:id',
                element: <AdminRoute><UpdateCourse /></AdminRoute>
            },
            {
                path: 'add-course',
                element: <AdminRoute><AddCourse /></AdminRoute>
            },
            {
                path: 'orders',
                element: <AdminRoute><Orders /></AdminRoute>
            },
            {
                path: 'students',
                element: <AdminRoute><Students /></AdminRoute>
            }
        ]
    }
])

export default router;