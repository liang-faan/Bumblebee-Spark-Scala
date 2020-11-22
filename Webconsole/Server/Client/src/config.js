const hostname1 = window.location.hostname
const port1  = window.location.port
const protocal1 = window.location.protocol


exports.apiOptions = {
    hostname: hostname1,
    port: port1,
    protocal: protocal1,
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

exports.searchOptions = {
    url: `${protocal1}://${hostname1}:${port1}`,
    searchIndex: "/books",
    searchAction: "/_search",
    createAction: "/_creeate"
    
}

// module.exports = apiOptions, searchOptions;