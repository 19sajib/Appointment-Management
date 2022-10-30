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