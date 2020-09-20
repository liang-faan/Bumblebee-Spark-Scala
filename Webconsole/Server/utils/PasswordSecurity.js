var crypto = require('crypto');

var digest = 'sha256';
var iterations = 99999;
var keyLength = 32;

exports.hash = function(password) {
  var executor = function(resolve, reject) {
    var callback = function(error, salt) {
      if (error) {
        return reject(error);
      }

      var callback = function(error, key) {
        if (error) {
          return reject(error);
        }

        var buffer = Buffer.alloc(keyLength * 2);

        salt.copy(buffer);
        key.copy(buffer, salt.length);

        resolve(buffer.toString('base64'));
      };

      crypto.pbkdf2(password, salt, iterations, keyLength, digest, callback);
    };

    crypto.randomBytes(keyLength, callback);
  };

  return new Promise(executor);
};

exports.same = function(password, hash) {
  var executor = function(resolve, reject) {
    var buffer = Buffer.alloc(hash, 'hex');
    var salt = buffer.slice(0, keyLength);
    var keyA = buffer.slice(keyLength, keyLength * 2);

    var callback = function(error, keyB) {
      if (error) {
        return reject(error);
      }

      resolve(keyA.compare(keyB) == 0);
    };

    crypto.pbkdf2(password, salt, iterations, keyLength, digest, callback);
  };

  return new Promise(executor);
};