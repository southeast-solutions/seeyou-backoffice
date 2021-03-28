const promoter = "promoter";
const tourOperator = "tourOperator"
const contentCreator = "contentCreator";
const concierge = "concierge";
const admin = "admin"

const userTypes = {
    promoter: 1,
    tourOperator: 2,
    contentCreator: 3,
    concierge: 4,
    admin: 5,
};



const registerSectionAccTypes = [
    {
        id: promoter,
        name: "Promoter",
        description:
            "Promote - incredible experiences and grow the SeeYouRomania userbase",
    },
    {
        id: tourOperator,
        name: "Tour operator",
        description:
            "Tour operator - incredible experiences and grow the SeeYouRomania userbase",
    },
    {
        id: contentCreator,
        name: "Content creator",
        description:
            "Content Creator - incredible experiences and grow the SeeYouRomania userbase",
    },
    {
        id: concierge,
        name: "Concierge",
        description:
            "Concierge - incredible experiences and grow the SeeYouRomania userbase",
    },
];


export { promoter, tourOperator, contentCreator, concierge, admin, registerSectionAccTypes, userTypes };

