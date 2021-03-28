import '../../../Enums/UserTypes';
import { userTypes } from '../../../Enums/UserTypes';

const mapDataAfterUserType = (userInfo) => {
    let user = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
        country: "",
        foreignLanguages: "",
        businessName: "",
        businessWebsite: "",
        cui: "",
        adress: "",
        socialLinks: "",
        currentJob: "",
        disponiblityDescription: "",
        profileUrl: "",
    };
    if(userInfo.userType === userTypes.promoter) {
        user.socialLinks = userInfo.socialLinks;
        user.firstName = userInfo.firstName;
        user.lastName = userInfo.lastName;
        user.foreignLanguages = userInfo.foreignLanguages;
        user.city = userInfo.city;
        user.country = userInfo.country;
        user.cui = userInfo.cui;
        user.adress = userInfo.adress;
        user.businessName = userInfo.businessName;
        user.phoneNumber = userInfo.phoneNumber;
        user.userType = userInfo.userType;
        user.currentJob = userInfo.currentJob;
        user.phoneNumber = userInfo.phoneNumber;

        return user;
    }

    if(userInfo.userType = userTypes.tourOperator) {
        // Create user tour operator data
        return user;
    }

    if(userInfo.userType === userTypes.contentCreator) {
        //content creator
        return user;
    }

    if(userInfo.userType === userTypes.concierge) {
        // concierge
        return user;
    }
}

export { mapDataAfterUserType };