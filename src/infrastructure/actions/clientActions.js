import { Login, Register, VerifyDocument, RecoveryPassword, ForgotPassword } from '../../domain/services/clientService';
import { FETCH_CLIENT, LOADING, ERROR, VERIFIED } from '../types/clientTypes';


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
export const registerClient = (client) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await Register(client);
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
export const loginClient = (client) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await Login(client);
    if (response.err) {
        console.log(response.err);
        dispatch({
            type: ERROR,
            payload: response.err.data.message
        });
    }
    else if (response.data.success) {
        dispatch({
            type: FETCH_CLIENT,
            payload: response.data.data
        });
    }
}
export const verifiedClient = (document) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const response = await VerifyDocument(document);
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



