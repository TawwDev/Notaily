import { TiArrowSortedUp, TiArrowSortedDown  } from "react-icons/ti";
import { CiLock } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";
import "./ProjectPlansPage.scss";

function ProjectPlansPage() {
    return (
        <>
            <div className="table">
                <table>
                    <thead className="table__head">
                        <th>TITLE</th>
                        <th>CREATED BY</th>
                        <th>UPDATED</th>
                        <th>SHARED WITH</th>
                        <th>ACCTION</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table__title">
                                <TiArrowSortedUp className="icon" />
                                <span>First Notebook</span>
                            </td>
                            <td className="table__created">Bud Wiser</td>
                            <td className="table__update">Dec 4</td>
                            <td className="table__shared">
                                <CiLock className="icon"/>
                                <span>Only You</span>
                            </td>
                            <td className="table__action">
                                <div className="table__action__edit">
                                    <GoPencil className="icon"/>
                                </div>
                                <div className="table__action__delete">
                                    <RiDeleteBin6Line className="icon"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table__title">
                                <TiArrowSortedUp className="icon"/>
                                <span>Project Plan</span>
                            </td>
                            <td className="table__created">Bud Wiser</td>
                            <td className="table__update">Dec 4</td>
                            <td className="table__shared">
                                <LiaUserFriendsSolid className="icon"/>
                                <span>02 share</span>
                            </td>
                            <td className="table__action">
                                <div className="table__action__edit">
                                    <GoPencil className="icon"/>
                                </div>
                                <div className="table__action__delete">
                                    <RiDeleteBin6Line className="icon"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProjectPlansPage;