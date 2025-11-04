import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import avatar from '../../assets/images/avatar.png'
import "./SideBar.scss";
import { FaUserPen, FaUser, FaNoteSticky, FaRegClock, FaRegTrashCan, FaFolderOpen, FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
function SideBar() {
    const [noteBookStatus, setNoteBookStatus] = useState(false);
    const handleClickNotesBook = () => {
        setNoteBookStatus(!noteBookStatus);
    }
    const navLinkOptionLinkActive = (e) => {
        return e.isActive ? "sidebar__link sidebar__link--active" : "sidebar__link";
    }

    const navLinkOptionSubLinkActive = (e) => {
        return e.isActive ? "sidebar__sublink sidebar__sublink--active" : "sidebar__sublink";
    }

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
                        <div className="sidebar__profile--flex-row">
                            <img src={avatar}></img>
                            <h6>Bud Wisers</h6>
                            <MdKeyboardArrowDown className='sidebar__profile__icon-size' />
                        </div>
                        <div className='sidebar__profile--dropdown-menu'>
                            <NavLink to={"/profile"}>
                                <FaUser className='sidebar__profile__icon' />
                                <span>My Profile</span>
                            </NavLink>
                            <NavLink to={"/profile/edit-profile"}>
                                <FaUserPen className='sidebar__profile__icon' />
                                <span>Edit Profile</span>
                            </NavLink>
                        </div>
                    </div>
                    <nav className="sidebar__nav">
                        <ul className="sidebar__menu">
                            <li className="sidebar__item" >
                                <NavLink to="/" className={navLinkOptionLinkActive}>
                                    <FaPenToSquare />
                                    <span>Your Notes</span>
                                </NavLink>
                            </li>

                            <li className="sidebar__item">
                                <div className={`sidebar__header ${noteBookStatus ? "sidebar__header--active" : ""}`} onClick={handleClickNotesBook}>
                                    <FaFolderOpen />
                                    <span>Notesbook</span>
                                </div>
                                {noteBookStatus ?
                                    <ul className="sidebar__submenu">
                                        <li className="sidebar__subitem">
                                            <NavLink to="/project-plans" className={navLinkOptionSubLinkActive}>
                                                <FaNoteSticky />
                                                <span>Project Plans</span>
                                            </NavLink>
                                        </li>
                                        <li className="sidebar__subitem">
                                            <NavLink to="/routine-notes" className={navLinkOptionSubLinkActive}>
                                                <FaNoteSticky />
                                                <span>Routine Notes</span>
                                            </NavLink>
                                        </li>
                                        <li className="sidebar__subitem">
                                            <NavLink to="/planning" className={navLinkOptionSubLinkActive}>
                                                <FaNoteSticky />
                                                <span>Planning</span>
                                            </NavLink>
                                        </li>
                                    </ul> : ""
                                }
                            </li>

                            <li className="sidebar__item">
                                <NavLink to="/reminder" className={navLinkOptionLinkActive}>
                                    <FaRegClock />
                                    <span>Reminder</span>
                                </NavLink>
                            </li>

                            <li className="sidebar__item">
                                <NavLink to="/bin" className={navLinkOptionLinkActive}>
                                    <FaRegTrashCan />
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