const attendanceModel = require("../models/attendances");

// ---------------------------------------------------
async function getAllAttendances(_, res) {
  try {
    const result = await attendanceModel.getAllAttendances();

    res.status(200).json({
      success: true,
      message: "All attendances data retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

// ---------------------------------------------------
async function getAttendanceByID(req, res) {
  const { params: { attendanceId } } = req;

  try {
    const attendance = await attendanceModel.getAttendanceByID(attendanceId);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance with given ID not found"
      });
    };

    res.status(200).json({
      success: true,
      message: "Attendance data with given ID retrieved successfully",
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

// ---------------------------------------------------
async function insertNewAttendance(req, res) {
  const { body } = req;

  try {
    const newAttendance = await attendanceModel.insertNewAttendance(body);

    res.status(201).json({
      success: true,
      message: "New attendance created successfully",
      data: newAttendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

// ---------------------------------------------------
async function updateAttedanceStatus(req, res) {
  const { params } = req;
  console.log(params);

  try {
    if (params.status !== "stop") {
      return res.status(404).json({
        success: false,
        message: "Invalid attendance status"
      });
    };

    const attendance = await attendanceModel.updateAttedanceStatus(params);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance with given ID not found"
      });
    };

    res.status(200).json({
      success: true,
      message: "New attendance updated successfully",
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

// ---------------------------------------------------
async function deleteAttendanceByID(req, res) {
  const { params: attendanceId } = req;

  try {
    const result = await attendanceModel.deleteAttendanceByID(attendanceId);
    if (!result || result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Attendance with given ID not found"
      });
    };

    res.status(200).json({
      success: true,
      message: "Attendance with given ID deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

module.exports = { getAllAttendances, getAttendanceByID, insertNewAttendance, updateAttedanceStatus, deleteAttendanceByID };