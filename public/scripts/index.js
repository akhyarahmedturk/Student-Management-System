document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById('viewStudentsBtn');
    viewBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        loadStudents(viewBtn);
    });
});

document.getElementById('addBtn').addEventListener('click', () => {
    window.location.href = '/views/add.html';
});

document.getElementById('updateBtn').addEventListener('click', () => {
    window.location.href = '/views/update.html';
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    window.location.href = '/views/delete.html';
});

document.getElementById('searchFilterBtn').addEventListener('click', () => {
    window.location.href = '/views/search.html';
});

async function loadStudents(viewBtn,) {
    const studentList = document.getElementById('studentList');
    try {
        const res = await fetch('http://localhost:3500/students');
        const data = await res.json();

        // Clear previous list
        studentList.innerHTML = '';
        studentList.style.display = 'flex';

        if (!data.length) {
            studentList.innerHTML = '<p>No students found.</p>';
            return;
        }

        data.forEach(student => {
            const card = document.createElement('div');
            card.className = 'feature';
            card.innerHTML = `
                    <h3>${student.name}</h3>
                    <p><strong>Roll No:</strong> ${student.rollNo}</p>
                    <p><strong>Dept:</strong> ${student.department}</p>
                    <p><strong>Age:</strong> ${student.age}</p>
                    <p><strong>Semester:</strong> ${student.semester}</p>
                    <p><strong>CGPA:</strong> ${student.cgpa}</p>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Phone:</strong> ${student.phoneNo}</p>
                `;
            studentList.appendChild(card);
        });
    } catch (err) {
        alert("Error fetching students.");
        console.error(err);
    }
}
