
import SideBar from "../SideBar/SideBar";
import { Outlet } from 'react-router-dom';
import "./IndexLayout.scss";
import HomeHeader from "../Header/HomeHeader";


function IndexLayout() {
    

    return (
        <>
            <div className="layout-default">
                <div className="layout-side-bar"></div>
                <SideBar />
                <div className="layout-default__content">
                    <HomeHeader />
                    <main className="layout-default__main">
                        <Outlet />
                    </main>
                    <footer className="layout-default__footer">
                        Copyright @Nguyen Minh Tam
                    </footer>
                </div>

            </div>
        </>
    )
}

export default IndexLayout;