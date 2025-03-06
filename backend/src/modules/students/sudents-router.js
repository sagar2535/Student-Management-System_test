const express = require("express");
const router = express.Router();
const studentController = require("./students-controller");

router.post("/add-student", studentController.handleAddStudent);
router.post("/get-students", studentController.handleGetAllStudents);
router.get("/:id", studentController.handleGetStudentDetail);
router.post("/:id/status", studentController.handleStudentStatus);
router.put("/:id", studentController.handleUpdateStudent);
router.delete("/:id", studentController.handleDeleteStudent);

module.exports = { studentsRoutes: router };
