import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function sucessNotification(messageNotification: string) {

    toast.success(messageNotification, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "sucessNotification"
    });
}

export function errorNotification(messageNotification: string) {

    toast.error(messageNotification, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "errorNotification"
    });
}

export function warningNotification(messageNotification: string) {

    toast.warning(messageNotification, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "warningNotification"
    });
}