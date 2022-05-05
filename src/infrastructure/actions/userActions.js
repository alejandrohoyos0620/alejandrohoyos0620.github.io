import {
    Login,
    Register,
    VerifyDocument,
    RecoveryPassword,
    ForgotPassword,
    FetchAll,
    FetchUserLogged
} from '../../domain/services/userService';
import { Update } from '../../domain/services/toastService';
import { 
    FETCH_USER, 
    LOADING, 
    ERROR, 
    VERIFIED, 
    FETCH_ROLES,
    FETCH_USERS
} from '../types/userTypes';


export const setLoading = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
}

export const setVerified = () => async (dispatch) => {
    dispatch({
        type: VERIFIED,
    });
}
export const registerUser = (user) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await Register(user);
    if (response.err) {
        console.log(response.err);
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
        return false;
    }
    else if (response.data.success) {
        console.log('Registro correcto');
        console.log(response.data);
        return true;
    }
}
export const loginUser = (user) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await Login(user);
    if (response.err) {
        console.log(response.err);
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
    }
    else if (response.data.success) {
        dispatch({
            type: FETCH_USERS,
            payload: response.data.data
        });
        return true;
    }
}
export const recoveryPassword = (recovery_data) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await RecoveryPassword(recovery_data);
    if (response.err) {
        console.log(response.err);
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
        return false;
    } else if (response.data.success) {
        dispatch({
            type: VERIFIED,
        });
        return true;
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await ForgotPassword(email);
    if (response.err) {
        console.log(response.err);
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
        return false;
    } else if (response.data.success) {
        dispatch({
            type: VERIFIED,
        });
        return true;
    }
}
export const catchError = (errorMessage) => async (dispatch) => {
    dispatch({
        type: ERROR,
        payload: errorMessage
    });
}


//real
export const fetchUsers = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await FetchAll();
    if (response.err) {
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
        return false;
    } else if (response.data.success) {
        dispatch({
            type: FETCH_USERS,
            payload: response.data.data.data
        });
        return true;
    }
}

export const fetchUserLogged = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await FetchUserLogged();
    if (response.err) {
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
        Update(response.err.data.message, id, true, false);
        return false;
    } else if (response.data) {
        Update('Carga completa', id, false, true);
        dispatch({
            type: FETCH_USER,
            payload: response.data
        });
        return true;
    }
}
