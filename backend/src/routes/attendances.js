const router = require("express").Router();
const attendanceController = require("../controllers/attendances");
const uploadPhoto = require("../middlewares/uploadPhoto");

router.get("/", attendanceController.getAllAttendances);

router.get("/:attendanceId", attendanceController.getAttendanceByID);

router.post("/", attendanceController.insertNewAttendance);

router.post("/upload-photo", uploadPhoto);

router.put("/:attendanceId/:status", attendanceController.updateAttedanceStatus)

router.delete("/:attendanceId", attendanceController.deleteAttendanceByID);

module.exports = router;