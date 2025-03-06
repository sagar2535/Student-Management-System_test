const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
  deleteStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  //write your code
  const payload = req.body;
  const students = await getAllStudents(payload);
  res.status(200).json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  //write your code
  const payload = req.body;
  await addNewStudent(payload);
  res.status(201).json({
    success: true,
    message: "Student Added Successfully",
  });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  //write your code
  const payload = req.body;
  const { id } = req.params;
  const user = await updateStudent({ userId: id, ...payload });
  res
    .status(201)
    .json({ success: true, user, message: "Student Updated Successfully" });
});
const handleDeleteStudent = asyncHandler(async (req, res) => {
  //write your code
  const { id } = req.params;
  await deleteStudent(id);
  res
    .status(204)
    .json({ success: true, message: "Student Deleted Successfully" });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  //write your code
  const { id } = req.params;
  const student = await getStudentDetail(id);
  res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  //write your code
  const user = req.user;
  const { userId, status } = req.body;

  const student = await setStudentStatus({
    userId,
    reviewerId: user.id,
    status,
  });
  res.status(200).json(student);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
  handleDeleteStudent,
};
