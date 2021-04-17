
import { BASE_ROUTE } from './Constants';
import { get } from './FetchService';

const getUserData = async () => {

    const response = await get(`${BASE_ROUTE}/user/profile`)
    if (response.userType === "ADMIN") { response.userType = "CONCIERGE" }

    return response;
}
export { getUserData }