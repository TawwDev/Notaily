import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

//success
export const popupSuccess = (message) => {
    Swal.fire({
        title: "Good job!",
        text: message,
        icon: "success"
    });
}

//error Something went wrong!
export const popupError = (message) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
}

//delete
export const popupDelete = async (message) => {
    const result = await Swal.fire({
        title: "Do you want to delete " + message + " ?",
        icon: "question",
        iconHtml: "?",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        showCloseButton: true
    });
    return result.isConfirmed ? true : false;
}
