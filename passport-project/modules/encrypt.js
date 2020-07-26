const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');


module.exports = {
  encrypt: async(password) => {
    return new Promise(async(resolve, rejects) => {
      try {
        const salt = (await crypto.randomBytes(32)).toString('hex');
        pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
          if (err) throw err;
          const hashed = derivedKey.toString('hex');
          resolve({salt, hashed});
        })
      } catch(err) {
        console.log(err)
        rejects(err);
      }
    })
  },
  
}