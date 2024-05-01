const { Signup, Login, SignupStudent, LoginStudent } = require("../Controllers/AuthController");
const { deleteCode, deleteAptitude, deleteCoursework } = require("../Controllers/DeleteController");
const { getStudents, getAptitudes, getCourseworks, getCodes } = require("../Controllers/GetController");
const { postAptitude, postCoursework, postCode } = require("../Controllers/PostController");
const { userVerification, studentVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/api/admin", userVerification);
router.post("/api/admin/signup", Signup);
router.post("/api/admin/login", Login);

router.post("/api/student", studentVerification);
router.post("/api/student/signup", SignupStudent);
router.post("/api/student/login", LoginStudent);
router.get("/api/student/getStudents", getStudents)

router.post("/api/aptitude/add", postAptitude)
router.get("/api/aptitude/getAll" , getAptitudes)
router.delete("/api/aptitude/delete/:id", deleteAptitude)

router.post("/api/coursework/add", postCoursework)
router.get("/api/coursework/getAll" , getCourseworks)
router.delete("/api/coursework/delete/:id", deleteCoursework)

router.post("/api/code/add", postCode)
router.get("/api/code/getAll", getCodes)
router.delete("/api/code/delete/:id", deleteCode)

module.exports = router;
