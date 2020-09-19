const jwt = require('jsonwebtoken');

exports.TokenVerify = function (req, scopes, schema) {
    const bearerRegex = /^Bearer\s/;

    var token = req.headers.authorization

    if (token && bearerRegex.test(token)) {
        var newToken = token.replace(bearerRegex, '');
        return jwt.verify(newToken, 'secretKey',
            {
                issuer: 'ISA Auth'
            },
            (error, decoded) => {
                if (error === null && decoded) {
                    return true;
                }
                // throw { status: 403, message: 'forbidden' }
                return false;
            }
        );
    } else {
        return false;
    }
}