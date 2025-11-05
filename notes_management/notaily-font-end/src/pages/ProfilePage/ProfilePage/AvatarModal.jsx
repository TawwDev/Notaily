import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import './AvatarModal.scss';

const avatarStyles = ['adventurer', 'lorelei', 'pixel-art', 'notionists'];
const tabLabels = {
    'adventurer': 'Adventurer',
    'lorelei': 'Lorelei',
    'pixel-art': 'Pixel Art',
    'notionists': 'Notionists'
};

const AvatarModal = ({  onClose, onSelect }) => {
    const [activeTab, setActiveTab] = useState('lorelei');
    const [seed] = useState('minhtamhtyb');

    const generateAvatars = () => {
        const avatars = [];
        for (let i = 0; i < 10; i++) {
            const randomSeed = `${seed}-${i}`;
            avatars.push(`https://api.dicebear.com/9.x/${activeTab}/svg?seed=${randomSeed}`);
        }
        return avatars;
    };

    return (
        <div className="avatar-modal__backdrop" >
            <div className="avatar-modal">
                <div className="avatar-modal__header">
                    <h3>Choose an Avatar</h3>
                    <button className="avatar-modal__close" onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>

                <div className="avatar-modal__body">
                    <div className="avatar-modal__nav">
                        {avatarStyles.map((style) => (
                            <button
                                key={style}
                                className={`avatar-modal__tab ${activeTab === style ? 'active' : ''}`}
                                onClick={() => setActiveTab(style)}
                            >
                                {tabLabels[style]}
                            </button>
                        ))
                        }
                    </div>

                    <div className="avatar-modal__selection">
                        {generateAvatars().map((src, index) => (
                            <div
                                key={index}
                                className="avatar-modal__item"
                                onClick={() => {
                                    onSelect(src);     
                                    onClose();         
                                }}
                            >
                                <img src={src} alt={`Avatar ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarModal;