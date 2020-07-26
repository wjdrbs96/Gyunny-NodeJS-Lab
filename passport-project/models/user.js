const table = 'user';
const poolPromise = require('../config/database');
const pool = require('../modules/pool'); 

const user = {
  getUserByName: async(username) => {
    const query = `SELECT * FROM ${table} WHERE name = ${username}`;
    try {
      const result = await pool.queryParam(query);
      return result[0];
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  getUserById: async(id) => {
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    try {
      const result = await pool.queryParam(query);
      return result[0];
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  userCheck: async(id) => {
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    try {
      const result = await pool.queryParam(query);
      if (result.length === 0) {
        return true;
      }
      return false;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },

  signUp: async(id, password, salt, name, email, phone) => {
    const fields = 'id, password, salt, name, email, phone';
    const questions = `'${id}', '${password}', '${salt}', '${name}', '${email}', '${phone}'`;
    const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParam(query);
      return result.id;
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = user;