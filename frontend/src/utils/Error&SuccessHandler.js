import {toast} from "react-toastify";

export const handleSuccess = (msg)=>{
    console.log("SUCCESS TOAST:", msg);  
    toast.success(msg , {
        position:"top-right",
        autoClose:3000,
    });
}

export const handleError = (msg)=>{
    console.log("handlerError aaya");
    toast.error(msg , {
        position:"top-right",
        autoClose:3000,
    });
}