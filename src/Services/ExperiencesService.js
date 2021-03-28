import axios from "axios";
import { BASE_ROUTE } from "./Constants";

import { getAuthToken } from "./AuthService"
import { get } from "./FetchService";


const addExperienceUrl = BASE_ROUTE + "/experience/addExperience";
const getExperiencesUrl = BASE_ROUTE + "/experience/myExperiences";
const uploadImageUrl = "http://localhost:5001" + "/images/experience"

// const getExpereinces = async (userId) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {

//             resolve({
//                 experiences: [
//                     {
//                         title: "Plimbare cu bicicleta pe la castelul peles",
//                         physicalLocation: { latitude: 45.3599816, longitude: 25.5426423 },
//                         duration: 5, type: "tour", price: 50, numberOfTourists: 20,
//                         availableLanguages: "Romanian/ English/ Spanish",
//                         dateTime: "2012-04-23T18:25:43.511Z",
//                         description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc",
//                         includedServices: [
//                             "Cazare gratis",
//                             "Transport gratis",
//                             "Glumeam cu primele 2"
//                         ],
//                         notIncludedServices: [
//                             "Mancarea",
//                             "Cealalta mancare"
//                         ],
//                         photos: [
//                             "https://forums-images.oneplus.net/attachments/904/904853-921c9e6f5c245ddc35fa4c415bdc3ac8.png",
//                             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43qLkUDZv9TrvcQ5KzbLM-DNNFEfscamM1Q&usqp=CAU",
//                             "https://img.lovepik.com/photo/50121/7345.jpg_wh860.jpg",
//                             "https://forums-images.oneplus.net/attachments/904/904853-921c9e6f5c245ddc35fa4c415bdc3ac8.png",
//                         ]
//                     }, { title: "ced", physicalLocation: { latitude: 21, longitude: 25 } }
//                 ]
//             });

//         }, 2000);
//     })
// }

const getExpereinces = async () => {

    const response = await get(getExperiencesUrl);
    return response;
}
const addExperience = async (expereinceObj) => {
    let translatedExperience = expereinceObj;
    let token = getAuthToken();
    let response = await post(addExperienceUrl, translatedExperience);
    return await response.json();

}
const uploadPhoto = (file) => {
    let token = getAuthToken();
    console.log(file);
    const formData = new FormData();
    formData.append('dataFile', file);
    const upload = fetch(uploadImageUrl, {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
    }).then((response) => response.json()).then((result) => {
        console.log('Success:', result);
    })
        .catch((error) => {
            console.error('Error:', error);
        });

}
export { getExpereinces, addExperience, uploadPhoto };