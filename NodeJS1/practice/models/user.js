const pool = require('../modules/pool');
const table = 'user';

const user = {
    signUp : async(loginId, password, salt, name, email) => {
        const fields = 'loginId, password, salt, name, email';
        const questions = `?, ?, ?, ?, ?`;
        const values = [loginId, password, salt, name, email];
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err) {
            if (err.errno == 1062) {
                return -1;
            }
            throw err;
        }
    },

    checkUser : async (loginId) => {
        const query = `SELECT * FROM ${table} WHERE loginId = "${loginId}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;     // 아이디가 존재하지 않을 때
            }

            return true;          // 아이디가 존재할 때

        } catch(err) {
            if (err.errno == 1062) {
                return -1;
            }
            console.log('signUp ERROR : ', err);
            throw err;
        }
    } 
}

module.exports = user;