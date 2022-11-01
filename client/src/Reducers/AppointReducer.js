const appointReducer = (
    state = { appointData: null, dateData: null, loading: false, error: false, updateLoading: false },
    action
) => {
    switch (action.type) {
        case 'APPIONT_START':
            return {...state, loading: true, error: false }
        
        case "GOT_DATE":
            return { ...state, dateData: action.data, loading: false, error: false }

        case "GOT_SLOT":
        case "APPOINT_DATA":
            return { ...state, appointData: action.data, loading: false, error: false }
        
        case "APPOINT_CANCEL":
            console.log(action.data.oldBooking)
            return { ...state, appointData: state.appointData.map((data)=> data._id === action.data.oldBooking._id ? action.data.oldBooking : data), loading: false, error: false }

        case 'APPIONT_FAIL':
            return {...state, appointData: null, loading: false, error: true}

        default:
            return state
    }

}

export default appointReducer;