const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const encryptionController = require("../controllers/encryptions");

// ---------------------------------------------------
async function loginAuth(req, res) {
  const { body: { email, password } } = req;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  };

  try {
    const user = await authModel.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    };

    const validPassword = await encryptionController.validatePassword(password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    };

    const payload = {
      id: user.id,
      full_name: user.full_name,
      phone: user.phone,
      address: user.address,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user: payload, token }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

module.exports = { loginAuth };