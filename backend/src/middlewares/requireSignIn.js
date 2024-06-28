const jwt = require("jsonwebtoken");

function requireSignIn(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized access, token not found"
    });
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: "Invalid token" 
    });
  };
};

module.exports = requireSignIn;