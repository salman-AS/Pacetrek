const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/api", userVerification);
router.post("/api/signup", Signup);
router.post("/api/login", Login);

module.exports = router;
