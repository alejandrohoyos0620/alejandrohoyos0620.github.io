import {
    FETCH_USER,
    FETCH_USERS,
    LOADING,
    ERROR,
    VERIFIED
} from "../types/userTypes";

const INITIAL_STATE = {
    users: {},
    userLogged: {},
    loading: false,
    error: '',
    roles: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: ''
            };
        case FETCH_USER:
            return {
                ...state,
                userLogged: action.payload,
                loading: false,
                error: ''
            };
        case LOADING:
            return { ...state, loading: true };
        case VERIFIED:
            return { ...state, loading: false, error: '' };
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default: return state;
    }
}
