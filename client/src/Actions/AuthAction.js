import * as AuthAPI from '../Api/AuthRequest.js'

export const signIn = (formData) => async (dispatch) => {
    dispatch({type: 'AUTH_START'})

    try {
        const { data } = await AuthAPI.signIn(formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data})
        dispatch({ type: 'SUCCESS', data })
        
    } catch (error) {
 
        dispatch({ type: 'AUTH_ERROR' })
        dispatch({ type: 'ERROR', error})
        
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START'})

    try {
        const { data } = await AuthAPI.signUp(formData)
        dispatch({ type: 'AUTH_SUCCESS', data:data })
        dispatch({ type: 'SUCCESS', data })
        
    } catch (error) {

        dispatch({ type: 'AUTH_ERROR' })
        dispatch({ type: 'ERROR', error})
        
    }
}

export const signOut = (navigate) => async (dispatch) => {
    dispatch({ type: 'SIGN_OUT'})
    navigate('/')
    dispatch({ type: 'LOGOUTALRET'})
    
}
