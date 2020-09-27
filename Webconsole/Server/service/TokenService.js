const jwt = require('jsonwebtoken');
const config = require('../Config')
// const crypto = require('crypto')
// const bcrypt =require('bcrypt')
const {hash, same} = require('../utils/PasswordSecurity')

exports.TokenVerify = function (req, scopes, schema) {
    const bearerRegex = /^Bearer\s/;

    var token = req.headers.authorization

    if (token && bearerRegex.test(token)) {
        var newToken = token.replace(bearerRegex, '');
        return jwt.verify(newToken, config.jwtSecretKey, config.jwtIssuer.issuer, (error, decoded) => {
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

exports.verifyPassword = function (password, combined, callback) {
    // extract the salt and hash from the combined buffer
    // var saltBytes = combined.readUInt32BE(0);
    // var hashBytes = combined.length - saltBytes - 8;
    // var iterations = combined.readUInt32BE(4);
    // var salt = combined.slice(8, saltBytes + 8);
    // var hash = combined.toString('binary', saltBytes + 8);

    var encodedPassword = combined.split(":")

    // const hashStr = bcrypt.hashSync("shen20121",12);// Store hash in your password DB.

    // console.log(hashStr.toString('utf8'))

    // same("shen20121", encodedPassword[2]).then(function(resolve, reject){
        // console.log(resolve)
    // });

    // hash("shen20121").then(function(resolve, reject){
    //     console.log(resolve);
    // });

    

    callback(hash);
//     crypto.pbkdf2('shen20121', 'salt', 100000, 64, 
//          'sha256', (err, derivedKey) => { 
  
//   if (err) throw err; 
  
//   // Prints derivedKey 
//   console.log(derivedKey.toString('hex')); 
// }); 
  
    // verify the salt and hash against the password
    // crypto.pbkdf2Sync(password, salt, iterations, hashBytes, function(err, verify) {
    //   if (err) {
    //     return callback(err, false);
    //   }
  
    //   callback(null, verify.toString('binary') === hash);
    // });
  }

exports.TokenSignature = function(user, expDate){
    var payload = {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        issuer: config.jwtIssuer.issuer,
        exp: expDate,
        iat: Math.floor(Date.now() / 1000)

    }
    return jwt.sign(payload, config.jwtSecretKey)
}


