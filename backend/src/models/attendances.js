const conn = require("../config/db");

// ---------------------------------------------------
async function getAllAttendances() {
  try {
    const SQL_QUERY = `
      SELECT 
        a.id, 
        u.id AS user_id, 
        u.full_name, 
        a.evidence, 
        a.created_at, 
        a.last_modified, 
        a.status
      FROM users u INNER JOIN attendances a 
      ON u.id = a.user_id`;

    const [rows] = await conn.query(SQL_QUERY);
    return rows;
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function getAttendanceByID(attendanceId) {
  const SQL_QUERY = `SELECT * FROM attendances WHERE id = ${attendanceId}`;

  try {
    const [rows] = await conn.query(SQL_QUERY);
    return rows[0];
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function insertNewAttendance({ userId, evidence }) {
  const SQL_QUERY = `INSERT INTO attendances(user_id, evidence) VALUES(?, ?)`;

  try {
    const [result] = await conn.query(SQL_QUERY, [userId, evidence]);
    return getAttendanceByID(result.insertId);
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function updateAttedanceStatus({ attendanceId, status }) {
  let attendanceStatus;

  if (status === "stop") {
    attendanceStatus = "attended";
  } else {
    attendanceStatus = "running";
  };

  const SQL_QUERY = `
    UPDATE attendances
    SET status = ?
    WHERE id = ${attendanceId}
  `;

  try {
    await conn.query(SQL_QUERY, [attendanceStatus]);
    return getAttendanceByID(attendanceId);
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

// ---------------------------------------------------
async function deleteAttendanceByID(attendanceId) {
  const SQL_QUERY = `DELETE FROM attendances WHERE id = ${attendanceId}`;

  try {
    const [result] = await conn.query(SQL_QUERY);
    return result;
  } catch (error) {
    console.log("Error executing query", error);
    throw error;
  };
};

module.exports = { getAllAttendances, getAttendanceByID, insertNewAttendance, updateAttedanceStatus, deleteAttendanceByID };