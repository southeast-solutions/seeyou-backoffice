import { navigate } from "svelte-routing";
import {  tourOperator,  admin ,registerSectionAccTypes } from "../Enums/UserTypes"
import { BASE_ROUTE } from './Constants';
import { validateEmail } from "../Validators/UserValidators";

const LS_AUTH_TOKEN_KEY = "seeyou_auth_token";
const LS_USER_TYPE_KEY = "seeyou_user_type";
const LS_SUB_KEY = "seeyou_user_id";

// const BASE_URL = "localhost:6969";
// const LOGIN_URL = `${BASE_URL}/login`;
// const REGISTER_URL = `${BASE_URL}/register`;

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

async function login(payload) {
    try {
        const loginRes = await fetch(`${BASE_ROUTE}/identity/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: payload.email, password: payload.password })
        }).then(res => res.json())
        if (loginRes.token) {
            const parsedJwt = parseJwt(loginRes.token)
            // setAuthLocalStorage(parsedJwt['custom:custom:userType'], loginRes.token, parsedJwt['sub'])
            setAuthLocalStorage('admin', loginRes.token, parsedJwt['sub'])

            return loginRes.success;
        } else {
            return loginRes.success
        }
    } catch (err) {
        return err;
    }
}

const fieldRequired = 'Field required'

const validateContentCreator = (contentCreatorData) => {
    let validationContentCreator = {};
    
    if(!contentCreatorData.firstName) {
        validationContentCreator['firstName'] = fieldRequired;
    }
    if(!contentCreatorData.lastName) {
        validationContentCreator['lastName'] = fieldRequired;
    } 

    if(!contentCreatorData.phoneNumber) {
        validationContentCreator['phoneNumber'] = fieldRequired;
    }

    if(!contentCreatorData.email) {
        validationContentCreator['email'] = fieldRequired;
    }

    if(!validateEmail(contentCreatorData.email)) {
        validationContentCreator['email'] = 'Invalid email';
    }


    if(!contentCreatorData.password) {
        validationContentCreator['password'] = fieldRequired;
    }

    if(!contentCreatorData.passwordRepeat) {
        validationContentCreator['passwordRepeat'] = fieldRequired;
    } 

    if(contentCreatorData.password !== contentCreatorData.passwordRepeat) {
        if(contentCreatorData.password.length && contentCreatorData.passwordRepeat.length) {
            validationContentCreator['password'] = 'Passwords do not match';
            validationContentCreator['passwordRepeat'] = 'Passwords do not match';
        }
    }

    if(!contentCreatorData.socialLinks) {
        validationContentCreator['socialLinks'] = fieldRequired;
    }

 

    if(!contentCreatorData.city) {
        validationContentCreator['city'] = fieldRequired;
    }

    if(!contentCreatorData.foreignLanguages) {
        validationContentCreator['foreignLanguages'] = fieldRequired;
    }

    if(!contentCreatorData.disponibilityDescription) {
        validationContentCreator['disponibilityDescription'] = fieldRequired;
    }

    return validationContentCreator;
}

const validateConcierge = (conciergeData) => {
    let validationConciergeData = {};

    if(!conciergeData.firstName) {
        validationConciergeData['firstName'] = fieldRequired;
    }
    if(!conciergeData.lastName) {
        validationConciergeData['lastName'] = fieldRequired;
    } 

    if(!conciergeData.phoneNumber) {
        validationConciergeData['phoneNumber'] = fieldRequired;
    }

    if(!conciergeData.email) {
        validationConciergeData['email'] = fieldRequired;
    }

    if(!validateEmail(conciergeData.email)) {
        validationConciergeData['email'] = 'Invalid email';
    }


    if(!conciergeData.password) {
        validationConciergeData['password'] = fieldRequired;
    }

    if(!conciergeData.passwordRepeat) {
        validationConciergeData['passwordRepeat'] = fieldRequired;
    } 

    if(conciergeData.password !== conciergeData.passwordRepeat) {
        if(conciergeData.password.length && conciergeData.passwordRepeat.length) {
            validationConciergeData['password'] = 'Passwords do not match';
            validationConciergeData['passwordRepeat'] = 'Passwords do not match';
        }
    }

    if(!conciergeData.socialLinks) {
        validationConciergeData['socialLinks'] = fieldRequired;
    }

    if(!conciergeData.country) {
        validationConciergeData['country'] = fieldRequired;
    }

    if(!conciergeData.city) {
        validationConciergeData['city'] = fieldRequired;
    }

    if(!conciergeData.foreignLanguages) {
        validationConciergeData['foreignLanguages'] = fieldRequired;
    }

    return validationConciergeData;
}

const validatePromoter = (promoterData) => {
    let validationPromoterData = {};

    if(!promoterData.firstName) {
        validationPromoterData['firstName'] = fieldRequired;
    }
    if(!promoterData.lastName) {
        validationPromoterData['lastName'] = fieldRequired;
    } 

    if(!promoterData.phoneNumber) {
        validationPromoterData['phoneNumber'] = fieldRequired;
    }

    if(!promoterData.email) {
        validationPromoterData['email'] = fieldRequired;
    }

    if(!validateEmail(promoterData.email)) {
        validationPromoterData['email'] = 'Invalid email';
    }


    if(!promoterData.password) {
        validationPromoterData['password'] = fieldRequired;
    }

    if(!promoterData.passwordRepeat) {
        validationPromoterData['passwordRepeat'] = fieldRequired;
    } 

    if(promoterData.password !== promoterData.passwordRepeat) {
        if(promoterData.password.length && promoterData.passwordRepeat.length) {
            validationPromoterData['password'] = 'Passwords do not match';
            validationPromoterData['passwordRepeat'] = 'Passwords do not match';
        }
    }

    if(!promoterData.socialLinks) {
        validationPromoterData['socialLinks'] = fieldRequired;
    }

    if(!promoterData.country) {
        validationPromoterData['country'] = fieldRequired;
    }

    if(!promoterData.city) {
        validationPromoterData['city'] = fieldRequired;
    }

    if(!promoterData.foreignLanguages) {
        validationPromoterData['foreignLanguages'] = fieldRequired;
    }

    if(!promoterData.disponibilityDescription) {
        validationPromoterData['disponibilityDescription'] = fieldRequired;
    }

    return validationPromoterData;
}

const validateTourOperator = (tourOperator, businessOperator) => {
    let validationTourOperator = {};
    let validationBusinessOperator = {}

    if(!tourOperator.firstName) {
        validationTourOperator['firstName'] = fieldRequired;
    }
    if(!tourOperator.lastName) {
        validationTourOperator['lastName'] = fieldRequired;
    } 

    if(!tourOperator.phoneNumber) {
        validationTourOperator['phoneNumber'] = fieldRequired;
    }

    if(!tourOperator.email) {
        validationTourOperator['email'] = fieldRequired;
    }

    if(!validateEmail(tourOperator.email)) {
        validationTourOperator['email'] = 'Invalid email';
    }


    if(!tourOperator.password) {
        validationTourOperator['password'] = fieldRequired;
    }

    if(!tourOperator.passwordRepeat) {
        validationTourOperator['passwordRepeat'] = fieldRequired;
    } 

    if(tourOperator.password !== tourOperator.passwordRepeat) {
        if(tourOperator.password.length && tourOperator.passwordRepeat.length) {
            validationTourOperator['password'] = 'Passwords do not match';
            validationTourOperator['passwordRepeat'] = 'Passwords do not match';
        }
    }


    if(!tourOperator.socialLinks) {
        validationTourOperator['socialLinks'] = fieldRequired;
    }

    if(!tourOperator.city) {
        validationTourOperator['city'] = fieldRequired;
    }

    if(!tourOperator.foreignLanguages) {
        validationTourOperator['foreignLanguages'] = fieldRequired;
    }

    if(!businessOperator.businessName) {
        validationBusinessOperator['businessName'] = fieldRequired;
    }

    if(!businessOperator.cui) {
        validationBusinessOperator['cui'] = fieldRequired;
    }

    if(!businessOperator.email) {
        validationBusinessOperator['email'] = fieldRequired;
    }

    if(!validateEmail(businessOperator.email)) {
        validationBusinessOperator['email'] = 'Invalid email';
    }

    if(!businessOperator.socialLinks) {
        validationBusinessOperator['socialLinks'] = fieldRequired;
    }

    if(!businessOperator.website) {
        validationBusinessOperator['website'] = fieldRequired;
    }

    if(!businessOperator.address) {
        validationBusinessOperator['address'] = fieldRequired;
    }

    return [validationTourOperator, validationBusinessOperator]

}

const register = (registerData, accountType) => {
    let registerRes = {
        promoterDataValidation: {},
        tourBusinessDataValidation: {},
        tourOperatorDataValidation: {},
        conciergeValidation: {},
        contentCreatorValidation: {},
    }
    let promoterDataValidationRes = {};
    let tourOperatorDataValidationRes = {};
    let contentCreatorDataValidationRes = {};
    let conciergeDataValidationRes = {};
    switch (accountType) {
        case registerSectionAccTypes[0]:
            promoterDataValidationRes = validatePromoter(registerData.promoterData);
            if(promoterDataValidationRes !== {}) {
                registerRes.promoterDataValidation = promoterDataValidationRes;
                return registerRes;
            }
            break;
        case registerSectionAccTypes[1]:

            tourOperatorDataValidationRes = validateTourOperator(registerData.tourOperatorData, registerData.tourBusinessData);
            if(promoterDataValidationRes) {
                registerRes.tourBusinessDataValidation = tourOperatorDataValidationRes[1];
                registerRes.tourOperatorDataValidation = tourOperatorDataValidationRes[0];
                return registerRes;
            }
            break;
        case registerSectionAccTypes[2]:
            contentCreatorDataValidationRes = validateContentCreator(registerData.contentCreatorData);
            if(contentCreatorDataValidationRes) {
                registerRes.contentCreatorDataValidation = contentCreatorDataValidationRes;
                return registerRes;
            }
            break;
        case registerSectionAccTypes[3]:
            conciergeDataValidationRes = validateConcierge(registerData.conciergeData);
            if(contentCreatorDataValidationRes) {
                registerRes.conciergeDataValidation = conciergeDataValidationRes;
                return registerRes;
            }
            break;

        default: 
            break;
    }
}

const setAuthLocalStorage = (userType, authToken, userId) => {
    localStorage.setItem(LS_USER_TYPE_KEY, userType);
    localStorage.setItem(LS_AUTH_TOKEN_KEY, authToken)
    localStorage.setItem(LS_SUB_KEY, userId)

    location.reload();
}


const clearAuthLocalStorage = () => {
    localStorage.removeItem(LS_AUTH_TOKEN_KEY);
    localStorage.removeItem(LS_USER_TYPE_KEY);
    localStorage.removeItem(LS_SUB_KEY);

    location.reload();
}

const getAuthToken = () => {
    return localStorage.getItem(LS_AUTH_TOKEN_KEY);
}

const getUserType = () => {
    return localStorage.getItem(LS_USER_TYPE_KEY);
}

const isAuthentified = () => {
    return getAuthToken() && getUserType();
}

const guardSignedUser = () => {
    if (!isAuthentified()) navigate('/login', { replace: true });
}

const guardUnsignedUser = () => {
    if (isAuthentified()) navigate('/profile', { replace: true });
}

const isAdmin = () => getUserType() == admin
const isTourOperator = () => getUserType() == admin || getUserType() == tourOperator

const guardAdmin = () => {
    if (!isAdmin()) navigate('/profile', { replace: true });
}
const guardTourOperator = () => {
    if (!isTourOperator()) navigate('/profile', { replace: true });
}
export { login, register, guardSignedUser, guardUnsignedUser, setAuthLocalStorage, clearAuthLocalStorage, guardAdmin, guardTourOperator, isAdmin, isTourOperator, getAuthToken };