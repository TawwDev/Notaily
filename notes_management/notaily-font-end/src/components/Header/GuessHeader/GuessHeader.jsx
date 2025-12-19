import { FaBell, FaRegCircleQuestion, FaPen } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { BiSolidLogIn } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import logo from "../../../assets/images/logo.jpg";
import { useState, useEffect, useRef} from "react";
import { NavLink, useNavigate} from 'react-router-dom';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import "../HomeHeader/HomeHeader.scss";
import "./GuessHeader.scss"
import { IoMdClose } from "react-icons/io";
function GuessHeader() {
    const [menuStatus, setMenuStatus] = useState(false);
    const [userStatus, setUserStatus] = useState(false);
    const navigate = useNavigate();

    const bellRef = useRef(null);          
    const userIconRef = useRef(null);        
    const menuDropdownRef = useRef(null);    
const userDropdownRef = useRef(null);

    const handleClickMenu = () => {
        setMenuStatus(!menuStatus);
    }

    const handleClickTitle = () => {
        navigate("/");
    }

    const handleClickCircleQuestion = () => {
        startTour();
    }

    const handleClickUser = () => {
        setUserStatus(!userStatus);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuStatus && menuDropdownRef.current && 
                !menuDropdownRef.current.contains(event.target) &&
                !bellRef.current.contains(event.target)) {
                setMenuStatus(false);
            }

            if (userStatus && userDropdownRef.current && 
                !userDropdownRef.current.contains(event.target) &&
                !userIconRef.current.contains(event.target)) {
                setUserStatus(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuStatus, userStatus]);

    const startTour = () => {
        introJs().setOptions({
            steps: [
                {
                    element: document.querySelector(".header__icon--user"),
                    title: "Login",
                    intro: 'Click here and choose login.',
                    position: 'bottom',
                    tooltipClass: 'custom-tooltip-width'
                },
                {
                    element: document.querySelector(".header__icon--bell"),
                    title: "Notification",
                    intro: 'You can see notifications about request from everyone.',
                    position: 'bottom',
                    tooltipClass: 'custom-tooltip-width'
                },
                {
                    title: "Trial account",
                    intro: `
                            <div class="tour-body">
                                Welcome to Notaily.<br/>
                                You can use a trial account to test the web<br/>
                                <strong>Username:</strong> <u>user</u><br/>
                                <strong>Password:</strong> <u>user</u>
                            </div>
                        `,
                    tooltipClass: 'custom-tooltip-width'
                },
                {
                    title: 'Contact',
                    element: '#step5',
                    intro: `
                            <div style="text-align: center;">
                                Nguyen Minh Tam.<br/>
                                <strong>GitHub:</strong> TawwDev<br/>
                                <strong>Email:</strong> minhtamhtyb@gmail.com<br/>
                                <strong>Have a good day at work</strong> 🌻
                            </div>
                        `,
                    tooltipClass: 'custom-tooltip-width'
                }
            ],
            showProgress: true,
            showBullets: false,
            exitOnOverlayClick: true,
            nextLabel: 'Next',
            prevLabel: 'Back',
            doneLabel: 'Finish'
        }).start();
    };

    return (
        <>
            <header className="header">
                <div className="header__title" onClick={handleClickTitle}>
                    <img src={logo} alt="logo"></img>
                    <span>Notaily</span>
                </div>
                <div className="header__notification">
                    <FaRegCircleQuestion className="header__icon header__icon--question" onClick={handleClickCircleQuestion} />
                    <FaBell ref={bellRef} className="header__icon header__icon--bell" onClick={handleClickMenu} />
                    <FaUser ref={userIconRef} className="header__icon header__icon--user" onClick={handleClickUser} />
                    {menuStatus ?
                        <div ref={menuDropdownRef} className="header__dropdown-menu">
                            <div className="header__card">
                                <div className="header__card__title">
                                    <h5>Notification</h5>
                                    <IoMdClose className="close-icon" onClick={() => setMenuStatus(false)} />
                                </div>
                                <div className="header__sub-card">
                                    <img src={"https://api.dicebear.com/9.x/croodles/svg?seed=default"}></img>
                                    <div className="header__info">
                                        <h5>Name</h5>
                                        <span>Muon ket ban voi ban</span>
                                        <div className="dropdown-menu__action">
                                            <button className="dropdown-menu__action__button--accept">Agree</button>
                                            <button className="dropdown-menu__action__button--reject">Decline</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : ``
                    }
                    {userStatus && <div ref={userDropdownRef} className="header__dropdown-user">
                        <div className="header__dropdown-user__item">
                            <NavLink to={"/"}>
                                <IoMdHome className="header__dropdown-user__icon" />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to={"/login"} >
                                <BiSolidLogIn className={"header__dropdown-user__icon"} />
                                <span>Login</span>
                            </NavLink>
                        </div>
                    </div>}
                </div>
            </header>
        </>
    )
}

export default GuessHeader;