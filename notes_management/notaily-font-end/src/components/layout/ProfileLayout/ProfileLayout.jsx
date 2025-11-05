
import ProfileHeader from "../../Header/ProfileHeader/ProfileHeader";
import SideBar from "../../SideBar/SideBar";
import { Outlet, useLocation} from 'react-router-dom';


function ProfileLayout() {
    const location = useLocation();
    const headerValue = location.state?.headerValue || "Use Profile";

    return (
        <>
            <div className="layout-default">
                <div className="layout-side-bar">
                    <SideBar />
                </div>
                <div className="layout-default__content">
                    <ProfileHeader
                        headerValue={headerValue}
                    />
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