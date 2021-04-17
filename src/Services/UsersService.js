import { BASE_ROUTE } from "./Constants";
import { get, post } from "./FetchService";
const getUsersURL = BASE_ROUTE + '/User'
const verifyUserURL = BASE_ROUTE + '/User/updateVerifiedStatus';

const getUsers = async () => {
    const response = await get(getUsersURL);
    return response;
}

const verify = async (id, value) => {
    return await post(verifyUserURL, { VerifiedValue: value, Id: id })
}

export { getUsers, verify };