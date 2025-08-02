const mongoose = require('mongoose');
const Student = require('../model/Student');
const ObjectId = mongoose.Types.ObjectId;


async function getAllStudents(req, res) {
    const data = await Student.find();
    res.json(data);
}

async function getStudent(req, res) {
    const data = req.params.id;
    let student = await Student.findOne({ rollNo: data });
    if (!student && mongoose.isValidObjectId(data)) student = await Student.findOne({ _id: ObjectId.createFromHexString(data) });
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
}

async function createStudent(req, res) {
    const { name, rollNo, department, phoneNo, semester, cgpa, email, age } = req.body;
    if (!name || !rollNo || !department || !phoneNo || !semester || !cgpa || !email || !age) {
        return res.status(400).json({ message: "Some data missing!" });
    }
    const duplicate = await Student.findOne({ rollNo });
    if (duplicate) return res.status(409).json({ message: "This Roll no already exists!" });
    try {
        const newStudent = await Student.create({
            name, rollNo, department, phoneNo, semester, cgpa, email, age
        });
        res.status(201).json(newStudent);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating student", error: err.message });
    }
}


async function updateStudent(req, res) {
    const id = ObjectId.createFromHexString(req.body.id);
    const student = await Student.findOne({ _id: id });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    if (req.body.name) student.name = req.body.name;
    if (req.body.rollNo) student.rollNo = req.body.rollNo;
    if (req.body.department) student.department = req.body.department;
    if (req.body.phoneNo) student.phoneNo = req.body.phoneNo;
    if (req.body.semester) student.semester = req.body.semester;
    if (req.body.cgpa) student.cgpa = req.body.cgpa;
    if (req.body.email) student.email = req.body.email;
    if (req.body.age) student.age = req.body.age;

    await student.save();
    res.status(200).json(student);
}


async function deleteStudent(req, res) {
    const data = req.params.id;
    let student = await Student.findOne({ rollNo: data });
    if (!student && mongoose.isValidObjectId(data)) student = await Student.findOne({ _id: ObjectId.createFromHexString(data) });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    const result = await Student.deleteOne({ _id: student._id });
    res.status(200).json({ message: "Student deleted successfully", deleted_count: result });
}

async function getDepartments(req, res) {
    try {
        const departments = await Student.distinct('department');
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch departments' });
    }
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getDepartments
};