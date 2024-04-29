const { Signup, Login, SignupStudent, LoginStudent } = require("../Controllers/AuthController");
const { userVerification, studentVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/api/admin", userVerification);
router.post("/api/admin/signup", Signup);
router.post("/api/admin/login", Login);

router.post("/api/student", studentVerification);
router.post("/api/student/signup", SignupStudent);
router.post("/api/student/login", LoginStudent);

module.exports = router;
