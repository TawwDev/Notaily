import axios from "axios";
import { API_URL } from "../util/constant";

export const apiNotebook = (() => {

    const getNotebooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/notebook`,
                { withCredentials: true }
            );
            console.log(response.data.result)
            return response.data.result;
        } catch (error) {
            console.error("Error fetching notebooks:", error);
        }
    }

    const createNotebook = async (name, image) => {
        try {
            const response = await axios.post(`${API_URL}/notebook`,
                { name, image },
                { withCredentials: true },
            );
            return response.data.result;
        } catch (error) {
            console.error("Error creating notebook:", error);
        }
    }

    const updateNotebook = async (id, request) => {
        try {
            const payload = {
                name: request.name,
                image: request.image
            };

            const response = await axios.patch(`${API_URL}/notebook/${id}`,
                payload,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("Error updating notebook:", error);
        }
    }

    const deleteNotebook = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/notebook/${id}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("Error deleting notebook:", error);
        }
    }

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await axios.post(`${API_URL}/note/upload-image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                }
            )
            return response.data.result;
        } catch (error) {
            console.log("Error get link image: ", error);
        }
    }

    return {
        createNotebook,
        deleteNotebook,
        getNotebooks,
        updateNotebook,
        uploadImageToCloudinary
    };

})();