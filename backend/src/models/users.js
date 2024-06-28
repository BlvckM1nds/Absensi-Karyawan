const conn = require("../config/db");
const encryptionController = require("../controllers/encryptions");

// ---------------------------------------------------
async function getAllUsers() {
  const SQL_QUERY = `SELECT * FROM users`;

  try {
    const [rows] = await conn.query(SQL_QUERY);
    return rows;
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function getUserByID(userId) {
  const SQL_QUERY = `SELECT * FROM users WHERE id = ${userId}`;

  try {
    const [rows] = await conn.query(SQL_QUERY);
    return rows[0];
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function createNewUser({ fullName, phone, address, email, password }) {
  const SQL_QUERY = `INSERT INTO users(full_name, phone, address, email, password) VALUES(?, ?, ?, ?, ?)`;

  try {
    const hashedPassword = await encryptionController.hashPassword(password);

    const [result] = await conn.query(SQL_QUERY, [fullName, phone, address, email, hashedPassword]);
    return getUserByID(result.insertId);
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function updateUserByID(userId, { fullName, phone, address, email, password }) {
  let newPassword = password

  if (password) {
    newPassword = await encryptionController.hashPassword(password);
  };

  const SQL_QUERY = `
    UPDATE users
    SET
      full_name = COALESCE(NULLIF(?, ''), full_name),
      phone = COALESCE(NULLIF(?, ''), phone),
      address = COALESCE(NULLIF(?, ''), address),
      email = COALESCE(NULLIF(?, ''), email),
      password = COALESCE(NULLIF(?, ''), password)
    WHERE id = ${userId}
  `;

  try {
    await conn.query(SQL_QUERY, [fullName, phone, address, email, newPassword]);
    return getUserByID(userId);
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function deleteUserByID(userId) {
  const SQL_QUERY = `DELETE FROM users WHERE id = ${userId}`;

  try {
    const [result] = await conn.query(SQL_QUERY);
    return result;
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

module.exports = { getAllUsers, getUserByID, createNewUser, updateUserByID, deleteUserByID };