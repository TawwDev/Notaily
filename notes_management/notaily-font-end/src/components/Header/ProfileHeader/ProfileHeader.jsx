import { FaBell, FaRegCircleQuestion} from "react-icons/fa6";
import { useState } from "react";

function ProfileHeader({headerValue}) {
    const [menuStatus, setMenuStatus] = useState(false);

    const handleClickMenu = () => {
        setMenuStatus(!menuStatus);
    }

    return (
        <>
            <header className="header">
                <div className="header__title">
                    <span>{headerValue}</span>
                </div>
                <div className="header__notification">
                    <FaRegCircleQuestion className="header__icon " />
                    <FaBell className="header__icon header__icon--bell" onClick={handleClickMenu} />

                    {menuStatus ?
                        <div className="header__dropdown-menu">
                            <div className="header__card">
                                <div className="header__sub-card">
                                    <img src={"https://api.dicebear.com/9.x/croodles/svg?seed=default"}></img>
                                    <div className="header__info">
                                        <h4>Name</h4>
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
                </div>
            </header>  
        </>
    )
}

export default ProfileHeader;