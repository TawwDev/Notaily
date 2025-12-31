import { useState, useRef, useEffect } from 'react';
import './EditNotebook.scss';
import { IoMdClose } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import { apiNotebook } from '../../api/NoteBookApi';
import { popupSuccess } from '../../util/popups';

const EditNotebook = ({ isOpen, onClose, notebook, onReload }) => {
    const [notebookName, setNotebookName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (notebook) {
            setNotebookName(notebook.name || '');
            setPreviewImage(notebook.image || '');
        }
    }, [notebook, isOpen]);

    if (!isOpen) return null;

    const handleEditImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            try {
                const cloudinaryImage = await apiNotebook.uploadImageToCloudinary(file);
                setPreviewImage(cloudinaryImage.url);
            } catch (error) {

            } finally {
                setIsUploading(false);
            }
            console.log("File đã chọn:", file);
        }
    }

    const handleUpdateNotebook = async () => {
        try {
            const response = await apiNotebook.updateNotebook(notebook.id, { name: notebookName, image: previewImage });
            console.log(response);
            if (onReload) {
                onReload();
            }
            onClose();
            popupSuccess("Update success!");
        } catch (error) {

        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <header className="modal-header">
                    <h3>Chỉnh sửa Notebook</h3>
                    <button className="close-btn" onClick={onClose}>
                        <IoMdClose size={20} />
                    </button>
                </header>

                <div className="modal-body">
                    <div className="cover-wrapper">
                        <div className={`notebook-preview ${isUploading ? 'loading' : ''}`}>
                            {isUploading && (
                                <div className="loading-overlay">
                                    <div className="spinner"></div>
                                </div>
                            )}
                            <div className="notebook-spine"></div>
                            <img
                                src={previewImage || notebook.image}
                                alt="Preview"
                                style={{ opacity: isUploading ? 0.5 : 1 }}
                            ></img>
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    <button className="change-cover-btn" onClick={handleEditImageClick}>
                        <FaImage size={18} />
                        Đổi ảnh bìa
                    </button>

                    <div className="input-group">
                        <label>Tên Notebook</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={notebookName}
                                onChange={(e) => setNotebookName(e.target.value)}
                            />
                        </div>
                        <span className="helper-text">Sử dụng tên ngắn gọn để dễ nhớ.</span>
                    </div>
                </div>

                <footer className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Hủy bỏ
                    </button>
                    <button className="btn-primary" onClick={handleUpdateNotebook} disabled={isUploading}>
                        Lưu thay đổi
                    </button>
                </footer>

            </div>
        </div>
    );
};

export default EditNotebook;