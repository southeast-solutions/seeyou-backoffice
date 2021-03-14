import { navigate } from "svelte-routing";
import { promoter, tourOperator, concierge, contentCreator, admin } from "../Enums/UserTypes"
import { BASE_ROUTE } from './Constants';

const LS_AUTH_TOKEN_KEY = "seeyou_auth_token";
const LS_USER_TYPE_KEY = "seeyou_user_type";
const LS_SUB_KEY = "seeyou_user_id";

// const BASE_URL = "localhost:6969";
// const LOGIN_URL = `${BASE_URL}/login`;
// const REGISTER_URL = `${BASE_URL}/register`;

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

async function login(payload) {
    try {
      const loginRes = await fetch(`${BASE_ROUTE}/identity/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: payload.email, password: payload.password})
        }).then(res => res.json())
        if(loginRes.token ) {
            const parsedJwt = parseJwt(loginRes.token)
            setAuthLocalStorage(parsedJwt['custom:custom:userType'], loginRes.token, parsedJwt['sub'])

            return loginRes.success;
        } else {
            return loginRes.success
        }
    } catch (err) {
        return err;
    }
}

const register = (payload) => {

}

const setAuthLocalStorage = (userType, authToken, userId) => {
    localStorage.setItem(LS_USER_TYPE_KEY, userType);
    localStorage.setItem(LS_AUTH_TOKEN_KEY, authToken)
    localStorage.setItem(LS_SUB_KEY, userId)

    location.reload();
}


const clearAuthLocalStorage = () => {
    localStorage.removeItem(LS_AUTH_TOKEN_KEY);
    localStorage.removeItem(LS_USER_TYPE_KEY);
    localStorage.removeItem(LS_SUB_KEY);

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

const isAdmin = () => getUserType() == admin
const isTourOperator = () => getUserType() == admin || getUserType() == tourOperator

const guardAdmin = () => {
    if (!isAdmin()) navigate('/profile', { replace: true });
}
const guardTourOperator = () => {
    if (!isTourOperator()) navigate('/profile', { replace: true });
}
export { login, register, guardSignedUser, guardUnsignedUser, setAuthLocalStorage, clearAuthLocalStorage, guardAdmin, guardTourOperator, isAdmin, isTourOperator };