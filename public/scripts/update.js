document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    checkRollNo();
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        id: form._id.value,
        name: form.name.value,
        rollNo: form.rollNo.value,
        department: form.department.value,
        age: parseInt(form.age.value),
        semester: parseInt(form.semester.value),
        phoneNo: form.phoneNo.value,
        email: form.email.value,
        cgpa: parseFloat(form.cgpa.value),
    };

    const res = await fetch(`/students`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert('Student record updated!');
        form.reset();
        form.style.display = 'none';
    } else {
        alert('Update failed.');
    }
});


async function checkRollNo() {
    const rollNo = document.getElementById('searchRollNo').value.trim();
    if (!rollNo) {
        alert('Please enter a roll number.');
        return;
    }

    const res = await fetch(`/students/${rollNo}`);
    const student = await res.json();

    if (!res.ok || !student) {
        alert('Student not found!');
        return;
    }
    return displayFourm(student);
}

async function displayFourm(student) {
    // Pre-fill form
    const form = document.getElementById('updateForm');
    form.name.value = student.name;
    form.rollNo.value = student.rollNo;
    form._id.value = student._id;
    form.department.value = student.department;
    form.age.value = student.age;
    form.semester.value = student.semester;
    form.phoneNo.value = student.phoneNo;
    form.email.value = student.email;
    form.cgpa.value = student.cgpa;

    // Show update form
    form.style.display = 'block';
}