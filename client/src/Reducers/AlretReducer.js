import { toast } from "react-toastify";

const alretReducer =  ( alret = [], action) => {
    switch(action.type) {
        case 'SUCCESS':
            toast.success(action?.data.message)
            return alret;
        case 'RESCHEDULE':
            toast.success('Your Appointment Rescheduled Successfully, Please Refresh The Page...')
            return alret;
        case 'ERROR':
            toast.error(action?.error.response.data.message);
            return alret;
        case 'LOGOUTALRET':
            toast.warn("You have been logged out.")
            return alret;
        default:
            return alret;
    }
}

export default alretReducer