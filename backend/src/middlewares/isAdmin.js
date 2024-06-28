const userModel = require("../models/users");

async function isAdmin(req, res, next) {
  try {
    const user = await userModel.getUserByID(req.user.id);
    if (user.role !== "2") {
      res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
      next();
    } else {
      next();
    };
  } catch (error) {
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  };
};

module.exports = isAdmin;