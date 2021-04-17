import { BASE_ROUTE } from "./Constants";

import { getAuthToken } from "./AuthService"
import { get, post } from "./FetchService";


const addExperienceUrl = BASE_ROUTE + "/experience/addExperience";
const getExperiencesUrl = BASE_ROUTE + "/experience/myExperiences";
const uploadImageUrl = BASE_ROUTE + "/images/experience"
const deleteExperienceUrl = BASE_ROUTE + "/experience/deleteExperience";


const getExpereinces = async () => {

    const response = await get(getExperiencesUrl);
    return response;
}
const addExperience = async (expereinceObj) => {
    let translatedExperience = { experience: expereinceObj };
    return await post(addExperienceUrl, translatedExperience);


}
const uploadPhoto = async (file) => {
    let token = getAuthToken();
    console.log(file);
    const formData = new FormData();
    formData.append('dataFile', file);
    try {
        const upload = await fetch(uploadImageUrl, {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await upload.json();
        if (result.success) {
            return result.url
        }
        else {
            return undefined;
        }
    }
    catch (e) {
        console.log(e);
        return undefined;
    }

}

const deleteEx = async (id) => {
    return await post(deleteExperienceUrl, { id })
}
export { getExpereinces, addExperience, uploadPhoto, deleteEx };