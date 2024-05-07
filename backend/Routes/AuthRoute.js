const { Signup, Login, SignupStudent, LoginStudent } = require("../Controllers/AuthController");
const { deleteCode, deleteAptitude, deleteCoursework, deleteEvent } = require("../Controllers/DeleteController");
const { getStudents, getAptitudes, getCourseworks, getCodes, getEvents, getNotifs, getAptitude, getCoursework } = require("../Controllers/GetController");
const { postAptitude, postCoursework, postCode, postEvent, postNotif } = require("../Controllers/PostController");
const { putAptitude, putCoursework, putCode, updateStudent } = require("../Controllers/PutController");
const { userVerification, studentVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/api/admin", userVerification);
router.post("/api/admin/signup", Signup);
router.post("/api/admin/login", Login);

router.post("/api/student", studentVerification);
router.post("/api/student/signup", SignupStudent);
router.post("/api/student/login", LoginStudent);
router.get("/api/student/getStudents", getStudents)
router.put("/api/student/postAptitude/:id", putAptitude)
router.put("/api/student/postCoursework/:id", putCoursework)
router.put("/api/student/postCode/:id", putCode)
router.put("/api/student/update/:id", updateStudent)

router.post("/api/aptitude/add", postAptitude)
router.get("/api/aptitude/getAll", getAptitudes)
router.delete("/api/aptitude/delete/:id", deleteAptitude)
router.get("/api/aptitude/get/:id", getAptitude)

router.post("/api/coursework/add", postCoursework)
router.get("/api/coursework/getAll", getCourseworks)
router.delete("/api/coursework/delete/:id", deleteCoursework)
router.get("/api/coursework/get/:id", getCoursework)

router.post("/api/code/add", postCode)
router.get("/api/code/getAll", getCodes)
router.delete("/api/code/delete/:id", deleteCode)

router.post("/api/event/add", postEvent)
router.get("/api/event/getAll", getEvents)
router.delete("/api/event/delete/:id", deleteEvent)

router.post("/api/notif/add", postNotif)
router.get("/api/notif/getAll", getNotifs)

module.exports = router;
