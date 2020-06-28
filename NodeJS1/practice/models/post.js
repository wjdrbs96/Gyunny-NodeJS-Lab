const pool = require('../modules/pool');
const table = 'post';

const post = {
    findAll : async() => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            if (err.errno == 1062) {
                console.log('POST LIST ERROR');
                return -1;
            }

            throw err;
        }
    },

    
}

module.exports = post;