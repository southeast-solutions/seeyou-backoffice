
import { BASE_ROUTE } from './Constants';

const getUserData = async (userId) => {
    const LS_AUTH_TOKEN_KEY = "seeyou_auth_token";
    const token = localStorage.getItem(LS_AUTH_TOKEN_KEY);
 
   const res = await fetch(`${BASE_ROUTE}/user/${userId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
    
    return res;
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {

    //         resolve({
    //             profileUrl: "https://www.pauldavidsmith.co.uk/wp-content/uploads/2019/08/corporate-portraits-cornwall-48-705x529.jpg",
    //             userType: "concierge",
    //             firstName: "Andrei",
    //             lastName: "Ilie",
    //             email: "ilandrei98@gmail.com",
    //             phoneNumber: "0760998117",
    //             isVerified: false,
    //             city: "Focsani",
    //             country: "Romania",
    //             foreignLanguages: "Romana, Engleza, Franceza, Olandeza",
    //             socialLinks: `www.facebook.com twitter.com`,
    //         });

    //     }, 2000);
    // })
}

// export { getUserData };

const getUserProfileData = async(userId) => {
    const response = await fetch(`${BASE_ROUTE}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).then(res => res.json());
    console.log(response);

    return response;
}

export { getUserProfileData, getUserData }