document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/'; 
});

document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
    alert("Student record submitted!");
    e.target.reset();
} else if (res.status === 409) {
    const result = await res.json();
    alert(result.message); // Shows: "This Roll No already exists!"
} else {
    alert("Submission failed. Please try again.");
}
});