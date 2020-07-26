const crypto = require('crypto');
const passport = require('passport');
const { resolve } = require('path');
const { rejects } = require('assert');

module.exports = {
  encrypt : async(password, salt) => {
    return new Promise(async(resolve, rejects) => {
      try {
        crypto.pbkdf2(passport, salt, 1, 32, 'sha512', (err, derivedKey) => {
          if (err) throw err;
          const hashed = derivedKey.toString('hex');
          resolve(hashed);
        });
      } catch(err) {
        console.log(err);
        rejects(err);
      }
    })
  }
}