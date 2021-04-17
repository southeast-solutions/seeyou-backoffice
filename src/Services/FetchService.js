import axios from "axios";
import { getAuthToken, clearAuthLocalStorage } from "./AuthService"
import { BASE_ROUTE } from "./Constants";
import { navigate } from "svelte-routing";


const checkAuthURL = BASE_ROUTE + "/identity";
const getHttpHeaders = (token) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
const getUnAuthorizedHeaders = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}

const checkAuth = async () => {
    let token = getAuthToken();
    try {
        const response = await axios.get(checkAuthURL, {
            headers: getHttpHeaders(token)
        })
    } catch (e) {
        if (e.response.status === 401) {
            console.log('abfdsfdsfds');
            clearAuthLocalStorage();
            navigate("/login");
        }
    }
}

export const get = async (url) => {
    let token = getAuthToken();
    try {
        const response = await axios.get(url, {
            headers: getHttpHeaders(token)
        })
        return response.data;
    } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
            checkAuth();
        }
        return undefined;
    }
}

export const post = async (url, body) => {
    let token = getAuthToken();
    try {
        const response = await axios.post(url, body, {
            headers: getHttpHeaders(token)
        })
        return response.data;
    } catch (e) {
        if (e.response.status === 401) {
            checkAuth();
        }
        return undefined;
    }
}
export const postUnauthorized = async (url, body) => {
    try {
        const response = await axios.post(url, body, {
            headers: getUnAuthorizedHeaders()
        })
        return response.data;
    } catch (e) {
        return undefined;
    }
}

export const put = async (url, body) => {
    let token = getAuthToken();
    try {
        const response = await axios.put(url, body, {
            headers: getHttpHeaders(token)
        })
        return response.data;
    } catch (e) {
        if (e.response.status === 401) {
            checkAuth();
        }
        return undefined;
    }
}