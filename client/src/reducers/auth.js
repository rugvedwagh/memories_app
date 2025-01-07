import {
    AUTH,
    LOGOUT,
    USER_INFO,
    START_LOADING,
    END_LOADING,
    ERROR,
    BOOKMARK_POST,
    UPDATE_USER
} from '../constants/actionTypes';

const userReducer = (state = {
    authData: null,
    clientData: null,
    isLoading: true,
    errorMessage: null
}, action) => {
    switch (action.type) {

        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {
                ...state,
                authData: action?.payload
            };

        case LOGOUT:
            localStorage.removeItem('profile');
            return {
                ...state,
                authData: null,
                clientData: null
            };

        case USER_INFO:
            return {
                ...state,
                clientData: action.payload
            };

        case BOOKMARK_POST:
            return {
                ...state,
                clientData: {
                    ...state.clientData,
                    bookmarks: action.payload.bookmarks,
                },
            };

        case UPDATE_USER:
            const updatedClientData = {
                ...state.clientData,
                ...action.payload
            };

            if (state.authData) {
                const updatedAuthData = {
                    ...state.authData,
                    result: updatedClientData
                };
                localStorage.setItem('profile', JSON.stringify(updatedAuthData));
            }

            return {
                ...state,
                clientData: updatedClientData,
                errorMessage: null
            };

        case ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };

        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case END_LOADING:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
};

export default userReducer;
