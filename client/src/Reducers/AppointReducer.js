const appointReducer = (
    state = { appointData: null, dateData: null, loading: false, error: false, updateLoading: false },
    action
) => {
    switch (action.type) {
        case 'APPIONT_START':
            return {...state, loading: true, error: false }
        
        case "GOT_DATE":
            return { ...state, dateData: action.data, loading: false, error: false }

        case 'APPIONT_FAIL':
            return {...state, appointData: null, loading: false, error: true}

        default:
            return state
    }

}

export default appointReducer;