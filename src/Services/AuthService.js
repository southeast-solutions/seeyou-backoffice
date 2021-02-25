import { navigate } from "svelte-routing";

const LS_AUTH_TOKEN_KEY = "seeyou_auth_token";
const LS_USER_TYPE_KEY = "seeyou_user_type";

const BASE_URL = "localhost:6969";
const LOGIN_URL = `${BASE_URL}/login`;
const REGISTER_URL = `${BASE_URL}/register`;

const login = (payload) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (payload.email === "anaaremere") {
                resolve();
            }
            else {
                reject();
            }
        }, 2000);
    })
}

const register = (payload) => {

}

const setAuthLocalStorage = (userType, authToken) => {
    localStorage.setItem(LS_USER_TYPE_KEY, userType);
    localStorage.setItem(LS_AUTH_TOKEN_KEY, authToken)

    location.reload();
}


const clearAuthLocalStorage = () => {
    localStorage.removeItem(LS_AUTH_TOKEN_KEY);
    localStorage.removeItem(LS_USER_TYPE_KEY);

    location.reload();
}

const getAuthToken = () => {
    return localStorage.getItem(LS_AUTH_TOKEN_KEY);
}

const getUserType = () => {
    return localStorage.getItem(LS_USER_TYPE_KEY);
}

const isAuthentified = () => {
    return getAuthToken() && getUserType();
}

const guardSignedUser = () => {
    if (!isAuthentified()) navigate('/login', { replace: true });
}

const guardUnsignedUser = () => {
    if (isAuthentified()) navigate('/profile', { replace: true });
}
export { login, register, guardSignedUser, guardUnsignedUser, setAuthLocalStorage, clearAuthLocalStorage };