const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    department: { type: String, required: true },
    phoneNo: { type: String, required: true },
    age: { type: Number, required: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    email: { type: String, required: true },
    cgpa: { type: Number, min: 0, max: 4 }
});


module.exports = mongoose.model('Student', studentSchema, 'Students');