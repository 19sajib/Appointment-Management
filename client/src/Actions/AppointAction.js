import * as AppointAPI from '../Api/AppointRequest'

export const getDate = (date) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.getDate(date)
        dispatch({type: "GOT_DATE", data})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
    }
}

export const getSlot = (bookData, navigate) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.getSlot(bookData)
        dispatch({type: "GOT_SLOT", data})
        navigate('/success')
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
    }
}

export const getAppointData = (id) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.getAppointData(id)
        dispatch({type: "APPOINT_DATA", data})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
    }
}