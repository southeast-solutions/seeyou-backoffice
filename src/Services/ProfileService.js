

const getUserData = async (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve({
                profileUrl: "https://www.pauldavidsmith.co.uk/wp-content/uploads/2019/08/corporate-portraits-cornwall-48-705x529.jpg",
                firstName: "abc",
                userType: "concierge",
                lastName: "abc",
                phoneNumber: "076099811",
                city: "focsani",
                country: "Romania",
                foreignLanguages: "Romana/Engleza",
                socialLinks: "facebook.com \n instagram.com"
            });

        }, 2000);
    })
}

export { getUserData };