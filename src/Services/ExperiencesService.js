const getExpereinces = async (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve({
                experiences: [
                    { title: "abc" }, { title: "ced" }
                ]
            });

        }, 2000);
    })
}

export { getExpereinces };