import * as AppointAPI from '../Api/AppointRequest'

export const getDate = (date) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.getDate(date)
        dispatch({type: "GOT_DATE", data})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
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
        dispatch({ type: 'ERROR', error})
    }
}

export const getAppointData = (id) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.getAppointData(id)
        dispatch({type: "APPOINT_DATA", data})
        dispatch({ type: 'SUCCESS', data })
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
    }
}

export const allAppointment = (page) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.allAppointment(page)
        dispatch({type: "ALL_APPOINT", data})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
    }
}

export const searchAppointmentData = (search, searchType) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.searchAppointmentData(search, searchType)
        dispatch({type: "SEARCH_APPOINT", data})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
    }
}

export const cancelAppointment = (id) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.cancelAppointment(id)
        dispatch({type: "APPOINT_CANCEL", data})
        dispatch({ type: 'SUCCESS', data })
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
    }
}

export const rescheduleAppointment = (id, dateTime) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.rescheduleAppointment(id, dateTime)
        dispatch({type: "RESCHEDULE_APPOINT", data})
        dispatch({ type: 'RESCHEDULE'})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
    }
}

export const singleAppointment = (id) => async (dispatch) => {
    dispatch({type: "APPIONT_START"})
    try {
        const { data } = await AppointAPI.singleAppointment(id)
        dispatch({type: "SINGLE_APPOINT", data})
    } catch (error) {
        dispatch({type: "APPIONT_FAIL"})
        dispatch({ type: 'ERROR', error})
    }
}