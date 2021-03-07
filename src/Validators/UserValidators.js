const validateNotNull = (s) => s ? true : false;
const validateEmail = (email) => {
    if (email) {
        if (email.includes("@")) {
            return true;
        }
        return false;

    }
    return false;
}
const validatePhoneNumber = (phoneNumber) => /^\d+$/.test(phoneNumber)

export { validateEmail, validatePhoneNumber, validateNotNull };