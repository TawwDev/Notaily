import "./CreateNote.scss"
import { Tiptap } from "../TipTap/TiptapCreateNote";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFileAlt, FaClipboardList, FaCog, FaBell, FaCamera, FaBirthdayCake, FaRegCommentDots } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";


function CreateNote() {
    const [description, setDescription] = useState("");

    return (
        <>
            <section className="create-note">
                <div className="create-note__title">
                    <span >Title</span>
                    <input type="text" className="form-control" placeholder="Enter title" />
                </div>
                <hr className="divider" />
                <div className="create-note__description">
                    <span>Description</span>
                    <Tiptap setDescription={setDescription} />
                </div>
                <div className="create-note__reminder">
                    <span >Reminder Date</span>
                    <div className="create-note__component">
                        <input type="date" className="form-control" placeholder="01/01/2025" />
                        <input type="time" className="form-control" placeholder="01/01/2025" />
                    </div>
                </div>

                <div className="create-note__icon">
                    <span>Icon</span>
                    <div className="create-note__icon__container">
                        <div className="create-note__icon__btn create-note__icon__btn--active"><FaFileAlt /></div>
                        <div className="create-note__icon__btn"><FaClipboardList /></div>
                        <div className="create-note__icon__btn"><FaBoxArchive /></div>
                        <div className="create-note__icon__btn"><FaCog /></div>
                        <div className="create-note__icon__btn"><FaBell /></div>
                        <div className="create-note__icon__btn"><FaCamera /></div>
                        <div className="create-note__icon__btn"><FaBirthdayCake /></div>
                        <div className="create-note__icon__btn"><FaRegCommentDots /></div>
                    </div>
                </div>

                <div className="create-note__priority">
                    <span>Priority</span>
                    <select className="form-control">
                        <option>Default</option>
                        <option>Very Low</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Very High</option>
                    </select>
                </div>

                <div className="create-note__action">
                    <button className="close-btn">Close</button>
                    <button className="save-btn">Save</button>
                </div>

            </section>
        </>
    )
}

export default CreateNote;