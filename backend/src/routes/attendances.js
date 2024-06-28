const router = require("express").Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");
const attendanceController = require("../controllers/attendances");

router.get("/", attendanceController.getAllAttendances);

router.get("/:attendanceId", attendanceController.getAttendanceByID);

router.post("/", attendanceController.insertNewAttendance);

router.post("/upload-photo", async (req, res, next) => {
  try {
    const { image_url } = req.body;

    const cloudinary_res = await cloudinary.uploader.upload(image_url, {
      folder: "/evidences-demo"
    });

    res.status(201).json({
      success: true,
      message: "Evidence uploaded",
      data: cloudinary_res.secure_url
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
});

router.put("/:attendanceId/:status", attendanceController.updateAttedanceStatus)

router.delete("/:attendanceId", attendanceController.deleteAttendanceByID);

module.exports = router;