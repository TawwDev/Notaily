
import SideBar from "../SideBar/SideBar";
import { Outlet } from 'react-router-dom';
import "./IndexLayout.scss";
import HomeHeader from "../Header/HomeHeader";


function ProfileLayout() {
    

    return (
        <>
            <div className="layout-default">
                <div className="layout-side-bar">
                    <SideBar />
                </div>
                <div className="layout-default__content">
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

export default ProfileLayout;