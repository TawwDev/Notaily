import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { CiClock1 } from "react-icons/ci";
import { MdHistory, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { TbAlphabetGreek } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiNotebook } from '../../api/NoteBookApi';
import './NotebookDashboard.scss';
import EditNotebook from '../../components/EditNotebook/EditNotebook';
import { popupDelete, popupError } from '../../util/popups';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const NotebookPage = () => {
    const PAGE_SIZE = 8;
    const BACKGROUND_DEFAULT = "https://res.cloudinary.com/dozyhynkf/image/upload/v1766827704/notaily/note/background-notebook-default.jpg_20251227162834.jpg";
    const [openOptionId, setOpenOptionId] = useState(null);
    const [notebooks, setNotebooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [totalNumberPage, setTotalNumberpage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortConfig, setSortConfig] = useState({ sortBy: 'createdAt', sortDir: 'DESC' });
    const [isSortOpen, setIsSortOpen] = useState(false);

    const fetchNotebooks = async () => {
        try {
            const response = await apiNotebook.getNotebooks(currentPage, PAGE_SIZE, sortConfig.sortBy, sortConfig.sortDir);
            const totalNbResponse = await apiNotebook.getTotalNotebook();
            setNotebooks(response || []);
            const totalPage = Math.ceil(totalNbResponse / PAGE_SIZE);
            setTotalNumberpage(totalPage);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchNotebooks();
        const closeMenu = () => setOpenOptionId(null);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, [currentPage, sortConfig]);

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
            fetchNotebooks();
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

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        } else {
            popupError("Can't previous page!");
        }
    }

    const handleNextPage = () => {
        if (currentPage + 1 < totalNumberPage) {
            setCurrentPage(next => next + 1);
        } else {
            popupError("Can't next page!");
        }
    }


    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="search-wrapper">
                    <CiSearch className="search-icon" size={20} />
                    <input type="text" placeholder="Search notebooks, tags..." />
                    <div className="filter-container" style={{ position: 'relative' }}>
                        <LuSlidersHorizontal
                            className="filter-icon"
                            size={20}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSortOpen(!isSortOpen);
                            }}
                        />

                        {isSortOpen && (
                            <div className="sort-dropdown" onClick={(e) => e.stopPropagation()}>
                                <div className="sort-header">SORT BY</div>

                                <div
                                    className={`sort-item ${sortConfig.sortBy === 'createdAt' && sortConfig.sortDir === 'DESC' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortConfig({ sortBy: 'createdAt', sortDir: 'DESC' });
                                        setIsSortOpen(false);
                                        setCurrentPage(0);
                                    }}
                                >
                                    <div className="sort-icon-bg"><CiClock1 size={18} /></div>
                                    <span>Newest First</span>
                                    {sortConfig.sortBy === 'createdAt' && sortConfig.sortDir === 'DESC' && <FaCheck className="check-icon" />}
                                </div>

                                <div
                                    className={`sort-item ${sortConfig.sortBy === 'createdAt' && sortConfig.sortDir === 'ASC' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortConfig({ sortBy: 'createdAt', sortDir: 'ASC' });
                                        setIsSortOpen(false);
                                        setCurrentPage(0);
                                    }}
                                >
                                    <div className="sort-icon-bg"><MdHistory size={18} /></div>
                                    <span>Oldest First</span>
                                    {sortConfig.sortBy === 'createdAt' && sortConfig.sortDir === 'ASC' && <FaCheck className="check-icon" />}
                                </div>

                                <div
                                    className={`sort-item ${sortConfig.sortBy === 'name' && sortConfig.sortDir === 'ASC' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortConfig({ sortBy: 'name', sortDir: 'ASC' });
                                        setIsSortOpen(false);
                                        setCurrentPage(0);
                                    }}
                                >
                                    <div className="sort-icon-bg"><TbAlphabetGreek size={18} /></div>
                                    <span>Alphabetical (A-Z)</span>
                                    {sortConfig.sortBy === 'name' && sortConfig.sortDir === 'ASC' && <FaCheck className="check-icon" />}
                                </div>
                            </div>
                        )}
                    </div>
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

            {
                totalNumberPage === 0 ? "" : <footer className="pagination">
                    <button className="pagi-btn" onClick={handlePreviousPage}><FaChevronLeft size={20} /></button>
                    <span className="pagi-text">Page {currentPage + 1} of {totalNumberPage}</span>
                    <button className="pagi-btn" onClick={handleNextPage}><FaChevronRight size={20} /></button>
                </footer>
            }


            <EditNotebook
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                notebook={selectedNotebook}
                onReload={() => fetchNotebooks()}
            />
        </div>


    );
};

export default NotebookPage;