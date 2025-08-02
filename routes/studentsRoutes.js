const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
// const Roles_list=require('../config/roles_list');
// const verify_roles=require('../middleware/verify_roles');

router.route('/department')
    .get(studentController.getDepartments);

router.route('/')
    .get(studentController.getAllStudents)
    .post(studentController.createStudent)
    .put(studentController.updateStudent);

router.route('/:id')
    .get(studentController.getStudent)
    .delete(studentController.deleteStudent);

module.exports = router;