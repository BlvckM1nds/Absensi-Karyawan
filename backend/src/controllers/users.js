const userModel = require("../models/users");

// ---------------------------------------------------
async function getAllUsers(_, res) {
  try {
    const result = await userModel.getAllUsers();
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found"
      });
    };

    res.status(200).json({
      success: true,
      message: "All users data retrieved successfully",
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
async function getUserByID(req, res) {
  const { params: { userId } } = req;

  try {
    const user = await userModel.getUserByID(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with given ID not found"
      });
    };

    res.status(200).json({
      success: true,
      message: "User data with given ID retrieved successfully",
      data: user
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
async function createNewUser(req, res) {
  const { body } = req;

  try {
    const newUser = await userModel.createNewUser(body);

    res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: newUser
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
async function updateUserByID(req, res) {
  const { body, params: { userId } } = req;

  try {
    if (!body.fullName && !body.email && !body.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters, at least one of the parameters (fullName, phone, address, email, password) must be provided"
      });
    };

    const result = await userModel.updateUserByID(userId, body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User with given ID not found"
      });
    };

    res.status(200).json({
      success: true,
      message: "User with given ID updated successfully",
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
async function deleteUserByID(req, res) {
  const { params: { userId } } = req;

  try {
    const result = await userModel.deleteUserByID(userId);
    if (!result || result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "User with given ID not found"
      });
    };

    res.status(200).json({
      success: true,
      message: "User with given ID deleted successfully",
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

module.exports = { getAllUsers, getUserByID, createNewUser, updateUserByID, deleteUserByID };