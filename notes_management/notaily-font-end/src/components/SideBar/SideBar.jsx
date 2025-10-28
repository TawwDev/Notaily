import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import avatar from '../../assets/images/avatar.png'
import "./SideBar.scss";
function SideBar() {
    return (
        <>
            <div className="layout-default__sidebar">
                <aside className="sidebar">
                    <div className='sidebar__logo'>
                        <NavLink to={"/"} className={"sidebar__logo--flex-row"}>
                            <img src={logo}></img>
                            <h4>Notaily</h4>
                        </NavLink>
                        <hr className="divider" />
                    </div>

                    <div className='sidebar__profile'>
                        <div className={"sidebar__profile--flex-row"}>
                            <img src={avatar}></img>
                            <h6>Bud Wiser</h6>
                            {/* icon dropdown */}
                        </div>
                        <div className='sidebar__profile--dropdown-menu'>
                            <NavLink to={"/user-profile"}>
                                <span>My Profile</span>
                            </NavLink>
                            <NavLink to={"/edit-profile"}>
                                <span>Edit Profile</span>
                            </NavLink>
                        </div>
                    </div>
                    <nav className="sidebar__nav">
                        <ul className="sidebar__menu">
                            <li className="sidebar__item sidebar__item--active">
                                <NavLink to="/" className="sidebar__link">
                                    <span>Your Notes</span>
                                </NavLink>
                            </li>

                            <li className="sidebar__item">
                                <div className="sidebar__header">
                                    <span>Notesbook</span>
                                </div>
                                <ul className="sidebar__submenu">
                                    <li className="sidebar__subitem">
                                        <NavLink to="/project-plans" className="sidebar__sublink">
                                            <span>Project Plans</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar__subitem">
                                        <NavLink to="/routine-notes" className="sidebar__sublink">
                                            <span>Routine Notes</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar__subitem">
                                        <NavLink to="/planning" className="sidebar__sublink">
                                            <span>Planning</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="sidebar__item">
                                <NavLink to="/reminder" className="sidebar__link">
                                    <span>Reminder</span>
                                </NavLink>
                            </li>

                            <li className="sidebar__item">
                                <NavLink to="/bin" className="sidebar__link">
                                    <span>Bin</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                </aside>
            </div>
        </>
    )
}

export default SideBar;