const searchForm = document.getElementById('searchForm');
const rollNoInput = document.getElementById('rollNo');
const studentInfoDiv = document.getElementById('studentInfo');
let studentId = null;

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    checkRollNo();
});

document.getElementById('deleteBtn').addEventListener('click', async () => {
    deleteStudent();
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/'; 
});

async function deleteStudent() {
    if (!confirm("Are you sure you want to delete this student?")) return;

    const res = await fetch(`/students/${studentId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        alert("Student record deleted.");
        studentInfoDiv.style.display = 'none';
        searchForm.reset();
    } else {
        alert("Failed to delete the student.");
    }
}

async function checkRollNo() {
    const rollNo = rollNoInput.value.trim();
    if (!rollNo) return alert("Please enter a roll number");

    const res = await fetch(`/students/${rollNo}`);
    if (res.ok) {
        const student = await res.json();
        studentId = student._id;

        document.getElementById('name').textContent = student.name;
        document.getElementById('department').textContent = student.department;
        document.getElementById('semester').textContent = student.semester;
        document.getElementById('cgpa').textContent = student.cgpa;
        document.getElementById('email').textContent = student.email;
        document.getElementById('phoneNo').textContent = student.phoneNo;

        studentInfoDiv.style.display = 'block';
    } else {
        studentInfoDiv.style.display = 'none';
        alert("Student not found.");
    }
}