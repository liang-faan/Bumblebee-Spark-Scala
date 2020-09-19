var apiOptions = {
    hostname: "localhost",
    port: 5000,
    https: false,
    key: "",
    headers: {
        "Authorization":"{0}",
        "User-Agent":"{0}"
    },
    loginUrl: "/api/v1/login"
};

module.exports = apiOptions;