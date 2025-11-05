import { FaBell, FaRegCircleQuestion, FaPen } from "react-icons/fa6";
import { useState } from "react";
import "./HomeHeader.scss";
import CreateNote from "../../CreateNote/CreateNote";

function HomeHeader() {
    const [menuStatus, setMenuStatus] = useState(false);
    const [searchStatus, setSearchStatus] = useState(false);
    const [createNoteStatus, setCreateNoteStatus] = useState(false);

    const handleClickMenu = () => {
        setMenuStatus(!menuStatus);
    }

    const handleClickSearch = () => {
        setSearchStatus(!searchStatus);
    }

    const handleClickCreateNote = () => {
        setCreateNoteStatus(!createNoteStatus);
    }

    return (
        <>
            <header className="header">
                <div className="header__title" onClick={handleClickCreateNote}>
                    <FaPen className="header__title__icon" />
                    <span>Write Your Note</span>
                </div>
                <div className="header__notification">
                    <FaRegCircleQuestion className="header__icon " onClick={handleClickSearch} />
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
            
            {createNoteStatus ? <CreateNote/> : ""}
                
            
        </>
    )
}

export default HomeHeader;