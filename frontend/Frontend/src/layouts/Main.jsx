import { Outlet, useLocation, useNavigation } from "react-router";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";
import PrimarySpinner from "../components/LoadingSpinner/PrimarySpinner";

const Main = () => {

    const navigation = useNavigation();
    const location = useLocation();

    if (navigation.state === 'loading') return <PrimarySpinner />

    /* 
    we also can do it using state
    */
    const getFooterBgColor = () => {
        if (location.pathname === '/') {
            return 'bg-white'
        }
    }



    // console.log(location)



    return (
        <div>
            {/* Herder */}
            <Header />
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <Footer bgColor={getFooterBgColor()} />
        </div>
    );
};

export default Main;