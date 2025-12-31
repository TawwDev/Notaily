import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { CiClock1 } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiNotebook } from '../../api/NoteBookApi';
import './NotebookDashboard.scss';
import EditNotebook from '../../components/EditNotebook/EditNotebook';
import { popupDelete } from '../../util/popups';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const NotebookPage = () => {
    const PAGE_SIZE = 8;
    const BACKGROUND_DEFAULT = "https://res.cloudinary.com/dozyhynkf/image/upload/v1766827704/notaily/note/background-notebook-default.jpg_20251227162834.jpg";
    const [openOptionId, setOpenOptionId] = useState(null);
    const [notebooks, setNotebooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotebook, setSelectedNotebook] = useState(null);

    const fetchNotebooks = async () => {
            try {
                const response = await apiNotebook.getNotebooks();
                setNotebooks(response || []);
            } catch (error) {

            }
        };
    useEffect(() => {
        fetchNotebooks();
        const closeMenu = () => setOpenOptionId(null);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, []);

    const handleNewNotebook = async () => {
        try {
            const newDbNotebook = await apiNotebook.createNotebook("Untitled", BACKGROUND_DEFAULT);
            setNotebooks(prevNotebooks => {
                const updatedList = [{ ...newDbNotebook, isEditing: true }, ...prevNotebooks];
                return updatedList.slice(0, PAGE_SIZE);
            });
        } catch (error) {

        }
    }

    const handleSaveName = async (id, name) => {
        try {
            await apiNotebook.updateNotebook(id, { name });
            setNotebooks(notebooks.map(nb => nb.id === id ? { ...nb, isEditing: false } : nb));
        } catch (error) {

        }
    }

    const handleNameChange = (id, newName) => {
        setNotebooks(notebooks.map(nb =>
            nb.id === id ? { ...nb, name: newName } : nb
        ));
    }

    const handleClickOption = (e, id) => {
        e.stopPropagation();
        setOpenOptionId(openOptionId === id ? null : id);
    }

    const handleEditNoteBook = (notebook) => {
        setSelectedNotebook(notebook);
        setIsModalOpen(true);
        setOpenOptionId(null);
    }

    const handleDeleteNoteBook = async (nb) => {
        const isConfirmed = await popupDelete("notebook: " + nb.name);

        if (isConfirmed) {
            try {
                await apiNotebook.deleteNotebook(nb.id);
                setOpenOptionId(null);
                fetchNotebooks();
            } catch (error) {

            }
        }
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="search-wrapper">
                    <CiSearch className="search-icon" size={20} />
                    <input type="text" placeholder="Search notebooks, tags..." />
                    <LuSlidersHorizontal className="filter-icon" size={20} />
                </div>
                <button className="btn-add" onClick={handleNewNotebook}>
                    <FiPlus size={20} />
                    <span>New Notebook</span>
                </button>

            </header>

            <main className='notebook-grid row g-4'>
                {notebooks.map((nb) => (
                    <div key={nb.id} className="col-lg-3 col-md-4 col-sm-6">
                        <div className="notebook-card">
                            <div className="card-image-section">
                                <img src={nb.image} alt={nb.title} />
                                <button className="options-btn" onClick={(e) => handleClickOption(e, nb.id)}>
                                    <FiMoreHorizontal size={20} color="white" />
                                </button>
                                {openOptionId === nb.id && (
                                    <div className="options-menu" onClick={(e) => e.stopPropagation()}>
                                        <div className="menu-item" onClick={() => handleEditNoteBook(nb)}>
                                            <MdOutlineEdit className="icon" />
                                            <span>Edit</span>
                                        </div>
                                        <div className="menu-item delete" onClick={() => handleDeleteNoteBook(nb)}>
                                            <RiDeleteBinLine className="icon" />
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="card-info">
                                {nb.isEditing ? (
                                    <input
                                        className="card-item__input"
                                        autoFocus
                                        value={nb.name}
                                        onChange={(e) => handleNameChange(nb.id, e.target.value)}
                                        onBlur={() => handleSaveName(nb.id, nb.name)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveName(nb.id, nb.name)}
                                    />
                                ) : (
                                    <span onDoubleClick={() => setNotebooks(notebooks.map(item => item.id === nb.id ? { ...item, isEditing: true } : item))}>
                                        {nb.name}
                                    </span>
                                )}
                                {/* <div className="update-time">
                                    <CiClock1 size={14} />
                                    <span>{nb.time}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <footer className="pagination">
                <button className="pagi-btn"><FaChevronLeft size={20} /></button>
                <span className="pagi-text">Page 1 of 5</span>
                <button className="pagi-btn"><FaChevronRight size={20} /></button>
            </footer>

            <EditNotebook
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                notebook={selectedNotebook}
                onReload = {() => fetchNotebooks()}
            />
        </div>


    );
};

export default NotebookPage;