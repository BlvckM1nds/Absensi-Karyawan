const router = require("express").Router();
const authController = require("../controllers/auth");
const requireSignIn = require("../middlewares/requireSignIn");

router.post("/login", authController.loginAuth);

router.get("/initialize", requireSignIn, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User data initialized successfully",
    data: { user: req.user }
  });
});

router.get("/employee-auth", requireSignIn, (_, res) => {
  res.status(200).json({ ok: true });
});

router.get("/admin-auth", requireSignIn, (_, res) => {
  res.status(200).json({ ok: true });
});

module.exports = router;