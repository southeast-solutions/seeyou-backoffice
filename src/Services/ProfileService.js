
import { BASE_ROUTE } from './Constants';
import { get } from './FetchService';

const getUserData = async (userId) =>
    await get(`${BASE_ROUTE}/user/profile`);


const getUserProfileData = async (userId) =>
    await get(`${BASE_ROUTE}/user/${userId}`);


export { getUserProfileData, getUserData }