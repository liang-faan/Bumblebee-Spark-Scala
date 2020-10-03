const hostname = document.hostname
const port  = window.location.port
const protocal = window.location.protocol


var apiOptions = {
    hostname: hostname,
    port: port,
    protocal: protocal,
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