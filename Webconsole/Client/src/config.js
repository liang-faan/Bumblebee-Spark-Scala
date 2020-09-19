var apiOptions = {
    hostname: "localhost",
    port: 8080,
    https: false,
    key: "",
    headers: {
        "Authorization":"{0}",
        "User-Agent":"{0}"
    },
    loginUrl: "/api/v1/security/login"
};

module.exports = apiOptions;