import '../../../Enums/UserTypes';
import { userTypes } from '../../../Enums/UserTypes';

const mapDataAfterUserType = (userInfo) => {
    let user = {};
    
    if(userInfo.userType === userTypes.promoter) {
        user.socialLinks = userInfo.socialLinks;
        user.firstName = userInfo.firstName;
        user.lastName = userInfo.lastName;
        user.foreignLanguages = userInfo.foreignLanguages;
        user.city = userInfo.city;
        user.country = userInfo.country;
        user.phoneNumber = userInfo.phoneNumber;
        user.userType = 'Promoter';
        user.currentJob = userInfo.currentJob;
        user.profilePictureUrl = userInfo.profilePictureUrl;
        user.disponibilityDescription = userInfo.disponibilityDescription;

        return user;
    }

    if(userInfo.userType = userTypes.tourOperator) {
        // Create user tour operator data
        user.address = userInfo.tourBusinessEntity.address;
        user.website = userInfo.tourBusinessEntity.website;
        user.socialLinks = userInfo.tourBusinessEntity.socialLinks;
        user.city = userInfo.tourOperatorEntity.city;
        user.lastName = userInfo.tourOperatorEntity.lastName;
        user.userSocialLinks = userInfo.tourOperatorEntity.socialLinks;
        user.foreignLanguages = userInfo.tourOperatorEntity.foreignLanguages;
        user.lastName = userInfo.tourOperatorEntity.lastName;
        user.cui = userInfo.tourBusinessEntity.cui;
        user.businessName = userInfo.tourBusinessEntity.businessName;
        user.userType = "TourOperator"
        user.profilePictureUrl = userInfo.profilePictureUrl;

        return user;
    }

    if(userInfo.userType === userTypes.contentCreator) {
        user.city = userInfo.city;
        user.firstName = userInfo.firstName;
        user.lastName = userInfo.lastName;
        user.foreignLanguages = userInfo.foreignLanguages;
        user.socialLinks = userInfo.socialLinks;
        user.userType = "ContentCreator";
        user.disponibilityDescription = userInfo.disponibilityDescription;
        user.profilePictureUrl = userInfo.profilePictureUrl;
        return user;
    }

    if(userInfo.userType === userTypes.concierge) {
       user.city = userInfo.city;
       user.country = userInfo.country;
       user.firstName = userInfo.firstName;
       user.lastName = userInfo.lastName;
       user.userType = "Concierge";
       user.foreignLanguages = userInfo.foreignLanguages;
       user.socialLinks = userInfo.socialLinks;
       user.profilePictureUrl = userInfo.profilePictureUrl;
    return user;
    }
}

const tourOperatorMapper = (user) => {
    const userInfo = {};

    userInfo.tourBusinessEntity.address = user.address;
    userInfo.tourBusinessEntity.website = userInfo.website;
    userInfo.tourBusinessEntity.socialLinks = user.socialLinks;
    userInfo.tourOperatorEntity.city = user.city;
    userInfo.tourOperatorEntity.lastName = user.lastName;
    userInfo.tourOperatorEntity.userSocialLinks = user.userSocialLinks;
    userInfo.tourOperatorEntity.foreignLanguages = user.foreignLanguages;
    userInfo.tourOperatorEntity.lastName = user.lastName;
    userInfo.tourBusinessEntity.cui = user.cui;
    userInfo.tourBusinessEntity.businessName = user.businessName;
    userInfo.tourBusinessEntity.businessName = user.businessName;
    user.userType = "TourOperator";
    user.profilePictureUrl = user.profilePictureUrl;

    return (userInfo);

}

export { mapDataAfterUserType, tourOperatorMapper};