let deptSelected = 'All';
let semtSelect = 'Any';
let cgpaSelect = 'Any';

document.getElementById('applyFilters').addEventListener('click', () => {
  deptSelected = document.getElementById('departmentFilter').value;
  semtSelect = document.getElementById('semesterFilter').value;
  cgpaSelect = document.getElementById('cgpaFilter').value;
  document.getElementById('searchInput').dispatchEvent(new Event('input'));
});

document.getElementById('resetFilters').addEventListener('click', () => {
  deptSelected = 'All';
  semtSelect = 'Any';
  cgpaSelect = 'Any';
  // Reset UI
  document.getElementById('departmentFilter').value = 'All';
  document.getElementById('semesterFilter').value = 'Any';
  document.getElementById('cgpaFilter').value = 'Any';
  document.getElementById('searchInput').dispatchEvent(new Event('input'));
});

window.addEventListener('DOMContentLoaded', async () => {
  const deptSelect = document.getElementById('departmentFilter');
  const semSelect = document.getElementById('semesterFilter');
  try {
    const res = await fetch('/students/department');
    const departments = await res.json();

    departments.forEach(dept => {
      const option = document.createElement('option');
      option.value = dept;
      option.textContent = dept;
      deptSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
  for (let i = 1; i < 9; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    semSelect.appendChild(option);
  }
});

document.getElementById('searchInput').addEventListener('input', async (e) => {
  const query = e.target.value.trim().toLowerCase();
  const res = await fetch('/students');
  const students = await res.json();
  const filtered = students.filter(student =>
    (
      student.name.toLowerCase().includes(query) ||
      student.rollNo.toLowerCase().includes(query) ||
      student.department.toLowerCase().includes(query)
    ) &&
    (deptSelected === 'All' || student.department.toLowerCase() === deptSelected.toLowerCase()) &&
    (semtSelect === 'Any' || Number(student.semester) === Number(semtSelect)) &&
    (
      cgpaSelect === 'Any' ||
      (cgpaSelect === '4-4' && Number(student.cgpa) === 4.0) ||
      (cgpaSelect === '3.5-4' && Number(student.cgpa) >= 3.5 && Number(student.cgpa) < 4.0) ||
      (cgpaSelect === '3-3.5' && Number(student.cgpa) >= 3.0 && Number(student.cgpa) < 3.5) ||
      (cgpaSelect === '2.5-3' && Number(student.cgpa) >= 2.5 && Number(student.cgpa) < 3.0) ||
      (cgpaSelect === '0-2.5' && Number(student.cgpa) >= 0 && Number(student.cgpa) < 2.5)
    )
  );

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  filtered.forEach(s => {
    const card = document.createElement('div');
    card.className = 'feature';
    card.innerHTML = `
          <h3>${s.name}</h3>
          <p><strong>Roll No:</strong> ${s.rollNo}</p>
          <p><strong>Department:</strong> ${s.department}</p>
          <p><strong>CGPA:</strong> ${s.cgpa}</p>
          <p><strong>Semester:</strong> ${s.semester}</p>
        `;
    resultsDiv.appendChild(card);
  });

  if (filtered.length === 0) {
    resultsDiv.innerHTML = '<p>No matching students found.</p>';
  }
});