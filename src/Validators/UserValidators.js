const validateNotNull = (s) => s ? true : false;
// const validateEmail = (email) => {
//     if (email) {
//         if (email.includes("@")) {
//             return true;
//         }
//         return false;
//         "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
//     }
//     return false;
// }

const validateEmail = (email) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
const validatePhoneNumber = (phoneNumber) => /^\d+$/.test(phoneNumber)

export { validateEmail, validatePhoneNumber, validateNotNull };