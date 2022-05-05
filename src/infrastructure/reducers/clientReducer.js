import { FETCH_CLIENT, LOADING, ERROR, VERIFIED } from "../types/clientTypes";

const INITIAL_STATE = {
    client: {},
    loading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CLIENT:
            return {
                ...state,
                client: action.payload,
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
