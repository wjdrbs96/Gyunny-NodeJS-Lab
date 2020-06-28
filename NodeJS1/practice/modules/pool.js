const poolPromise = require('../config/database');

module.exports = {
    queryParam : async(query) => {
        return new Promise( async(resolve, reject) => {
            try {
                const pool = await poolPromise;
                const connection = await pool.getConnection();
                try {
                    const result = await connection.query(query);
                    pool.releaseConnection(connection);   
                    resolve(result);
                } catch(err) {
                    pool.releaseConnection(connection);    

                }

            } catch(err) {
                reject(err);
            }
        })
    },

    queryParamArr : async(query, value) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await poolPromise;
                const connection = await pool.getConnection();
                try {
                    const result = await connection.query(query, value);
                    resolve(result);
                } catch (err) {
                    pool.releaseConnection(connection);
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    }
}