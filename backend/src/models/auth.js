const conn = require("../config/db");

async function findUserByEmail(email) {
  const SQL_QUERY = `SELECT * FROM users WHERE email = ?`;

  try {
    const [user] = await conn.query(SQL_QUERY, [email]);
    return user[0];
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

module.exports = { findUserByEmail };