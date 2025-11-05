import { IoSettingsOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ProfilePage.scss";
import AvatarModal from "./AvatarModal";
import React, { useState } from 'react';

function ProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleOpenAvatarModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <>
            <div className="profile">
                <div className="profile__info">
                    <img
                        src={selectedAvatar || "https://api.dicebear.com/9.x/croodles/svg?seed=default"}
                        alt="avatar"
                        className="profile__image"
                    ></img>
                    <h5>Email: minhtamhtyb21</h5>
                    <span>Username: minhtamhtyb@gmail.com</span>
                    <hr className="divider" />
                    <div className="profile__action row">
                        <IoSettingsOutline className="profile__action__icon col-4" />
                        <CiEdit
                            className="profile__action__icon col-4"
                            onClick={handleOpenAvatarModal}
                        />
                        <IoIosMore className="profile__action__icon col-4" />
                    </div>
                </div>
                <div className="profile__public-page">
                    <h5>Public Pages</h5>
                    <div className="profile__public-page__component">

                    </div>
                </div>
                {isModalOpen ?
                    <AvatarModal
                        onSelect={setSelectedAvatar}
                        onClose={() => setIsModalOpen(false)}
                    /> : ""
                }
            </div>
        </>
    )
}

export default ProfilePage;