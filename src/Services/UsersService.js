import { BASE_ROUTE } from "./Constants";
import { get, post } from "./FetchService";
const getUsersURL = BASE_ROUTE + '/User'

// const getUsers = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {

//             resolve({
//                 users: [
//                     {
//                         id: "abc",
//                         userType: "concierge",
//                         firstName: "Andrei",
//                         lastName: "Ilie",
//                         email: "ilandrei98@gmail.com",
//                         phoneNumber: "0760998117",
//                         isVerified: false,
//                         city: "Focsani",
//                         country: "Romania",
//                         foreignLanguages: "Romana, Engleza, Franceza, Olandeza",
//                         socialLinks: `www.facebook.com
//                     twitter.com`,
//                     },
//                     {
//                         id: "abc",
//                         userType: "contentCreator",
//                         firstName: "Andrei",
//                         lastName: "Ilie",
//                         email: "ilandrei98@gmail.com",
//                         phoneNumber: "0760998117",
//                         isVerified: false,
//                         city: "Focsani",
//                         foreignLanguages: "Romana, Engleza, Franceza, Olandeza",
//                         socialLinks: `www.facebook.com
//                     twitter.com`,
//                         disponibilityDescription:
//                             "All weekends all day",
//                     },
//                     {
//                         id: "abc",
//                         userType: "promoter",
//                         firstName: "Andrei",
//                         lastName: "Ilie",
//                         email: "ilandrei98@gmail.com",
//                         phoneNumber: "0760998117",
//                         isVerified: false,
//                         city: "Focsani",
//                         country: "Romania",
//                         foreignLanguages: "Romana, Engleza, Franceza, Olandeza",
//                         isStudent: false,
//                         currentJob: "Software developer",
//                         socialLinks: `www.facebook.com
//                     twitter.com`,
//                         disponibilityDescription:
//                             "De luni pana vineri si in zilele de post",
//                     }, {
//                         id: "abc",
//                         userType: "tourOperator",
//                         isVerified: false,
//                         operator: {
//                             firstName: "Andrei",
//                             lastName: "Ilie",
//                             email: "ilandrei98@gmail.com",
//                             phoneNumber: "0760998117",
//                             city: "Focsani",
//                             foreignLanguages: "Romana, Engleza, Franceza, Olandeza",
//                             socialLinks: `www.facebook.com
//                         twitter.com`,
//                         },
//                         business: {
//                             businessName: "Southeast Solutions SRL",
//                             email: "ilandrei98@gmail.com",
//                             website: "southeast-solutions.com",
//                             cui: "avem",
//                             address: "Soseaua mare, Focsani",
//                             socialLinks: `www.facebook.com
//                         twitter.com`,
//                         }
//                     },
//                     {
//                         id: "abc",
//                         userType: "admin",
//                         firstName: "Andrei",
//                         lastName: "Ilie",
//                         email: "ilandrei98@gmail.com",
//                         phoneNumber: "0760998117",
//                         isVerified: false,
//                         city: "Focsani",
//                         country: "Romania",
//                         foreignLanguages: "Romana, Engleza, Franceza, Olandeza",
//                         socialLinks: `www.facebook.com
//                     twitter.com`,
//                     },
//                 ]

//             });

//         }, 2000);
//     })
// }
const getUsers = async () => {
    const response = await get(getUsersURL);
    return response;
}

export { getUsers };