import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEllipsis, FaCakeCandles, FaUserLock, FaCalendarDays } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LiaThumbtackSolid } from "react-icons/lia";
import { NavLink } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

function GuessPage() {
    return (
        <>
            <div className="home">
                <span className="home__title">Publics Notes</span>
                <div className="home__card mt-3">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="card-item">
                                <div className="card-item__action position-relative">
                                    <div className="card-item__icon-box">
                                        <FaCakeCandles className="card-item__icon-main" />
                                    </div>
                                    <div className="d-flex">
                                        <FaRegHeart className="card-item__icon" />
                                        <LiaThumbtackSolid className="card-item__icon" />
                                        <div className="card-item__dropdown-container">
                                            <FaEllipsis className="card-item__ellipsis" />
                                            <div className="card-item__dropdown">
                                                <div className="dropdown-item">
                                                    <FaRegEye /> <span>View</span>
                                                </div>
                                                <div className="dropdown-item">
                                                    <MdOutlineEdit /> <span>Edit</span>
                                                </div>
                                                <div className="dropdown-item text-danger">
                                                    <RiDeleteBinLine /> <span>Delete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-item__info ">
                                    <h3 className="card-item__title">Birthday Celebration</h3>
                                    <span className="card-item__content">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </span>
                                </div>
                                <div className="card-item__footer">
                                    <div className="card-item__shared">
                                        <FaUserLock className="card-item__icon" />
                                        <span>Only you</span>
                                    </div>
                                    <div className="card-item__time">
                                        <FaCalendarDays className="card-item__icon" />
                                        <span>12 Jan 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card-item">
                                <div className="card-item__action position-relative">
                                    <div className="card-item__icon-box">
                                        <FaCakeCandles className="card-item__icon-main" />
                                    </div>
                                    <div className="d-flex">
                                        <FaRegHeart className="card-item__icon" />
                                        <LiaThumbtackSolid className="card-item__icon" />
                                        <div className="card-item__dropdown-container">
                                            <FaEllipsis className="card-item__ellipsis" />
                                            <div className="card-item__dropdown">
                                                <div className="dropdown-item">
                                                    <FaRegEye /> <span>View</span>
                                                </div>
                                                <div className="dropdown-item">
                                                    <MdOutlineEdit /> <span>Edit</span>
                                                </div>
                                                <div className="dropdown-item text-danger">
                                                    <RiDeleteBinLine /> <span>Delete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-item__info ">
                                    <h3 className="card-item__title">Birthday Celebration</h3>
                                    <span className="card-item__content">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </span>
                                </div>
                                <div className="card-item__footer">
                                    <div className="card-item__shared">
                                        <FaUserLock className="card-item__icon" />
                                        <span>Only you</span>
                                    </div>
                                    <div className="card-item__time">
                                        <FaCalendarDays className="card-item__icon" />
                                        <span>12 Jan 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card-item">
                                <div className="card-item__action position-relative">
                                    <div className="card-item__icon-box">
                                        <FaCakeCandles className="card-item__icon-main" />
                                    </div>
                                    <div className="d-flex">
                                        <FaRegHeart className="card-item__icon" />
                                        <LiaThumbtackSolid className="card-item__icon" />
                                        <div className="card-item__dropdown-container">
                                            <FaEllipsis className="card-item__ellipsis" />
                                            <div className="card-item__dropdown">
                                                <div className="dropdown-item">
                                                    <FaRegEye /> <span>View</span>
                                                </div>
                                                <div className="dropdown-item">
                                                    <MdOutlineEdit /> <span>Edit</span>
                                                </div>
                                                <div className="dropdown-item text-danger">
                                                    <RiDeleteBinLine /> <span>Delete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-item__info ">
                                    <h3 className="card-item__title">Birthday Celebration</h3>
                                    <span className="card-item__content">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </span>
                                </div>
                                <div className="card-item__footer">
                                    <div className="card-item__shared">
                                        <FaUserLock className="card-item__icon" />
                                        <span>Only you</span>
                                    </div>
                                    <div className="card-item__time">
                                        <FaCalendarDays className="card-item__icon" />
                                        <span>12 Jan 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}
export default GuessPage;