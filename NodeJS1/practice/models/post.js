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

    checkPostId : async(postIdx) => {
        const query = `SELECT * FROM post where postIdx = ${postIdx}`;
        try {
            const result = pool.queryParam(query);
            if (result.length === 0) {
                return false;
            }
            return true;

        } catch(err) {
            console.log('post error');
            
        }
    },

    findOne : async(postIdx) => {
        const query = `SELECT * FROM post where postIdx = ${postIdx}`;
        try {
            const result = pool.queryParam(query);
            return result;
        } catch(err) {
            if (err.errno = 1062) {
                console.log("error");
                return -1;
            }

            throw err;
        }
    },

    deletePost : async(postIdx) => {
        const query = `DELETE FROM post WHERE postIdx = ${postIdx}`;
        try {
            const result = pool.queryParam(query);
            return result;
        }catch(err) {
            if (err.errno == 1062) {
                console.log('Delete error');
            }

            throw err;
        }
    }
}

module.exports = post;