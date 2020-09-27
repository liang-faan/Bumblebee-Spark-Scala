var apiOptions = {
    hostname: "localhost",
    port: 5000,
    https: false,
    key: "",
    headers: {
        "Authorization":"{0}",
        "User-Agent":"{0}"
    },
    loginUrl: "/api/v1/login",
    apiUrl: "/api/v1",
    userUrl: '/api/v1/users',
    dagsUrl: '/api/v1/dags'
};

module.exports = apiOptions;