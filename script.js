// ================= LOAD DATA =================
async function loadStudents() {
    const response = await fetch('students.json');
    return await response.json();
}

// ================= VERIFY PHONE =================
async function verifyPhone() {
    console.log("Button clicked"); // debug

    const phoneInput = document.getElementById('phoneNumber').value.trim();
    const error = document.getElementById('error');
    const results = document.getElementById('results');

    error.style.display = 'none';
    results.innerHTML = '';

    if (!phoneInput) {
        error.innerText = "Enter phone number";
        error.style.display = 'block';
        return;
    }

    const cleanPhone = phoneInput.replace(/\D/g, '');

    try {
        const students = await loadStudents();

        const student = students.find(s => s.phone === cleanPhone);

        if (!student) {
            error.innerText = "Phone not found";
            error.style.display = 'block';
            return;
        }

        displayResults(student);

    } catch (err) {
        console.error(err);
        error.innerText = "Failed to load data";
        error.style.display = 'block';
    }
}

// ================= DISPLAY =================
function displayResults(student) {

    const subjects = [
        "History","Geography","Kiswahili","English",
        "Physics","Chemistry","Biology","Math",
        "Business","Book Keeping","Religion","Civics"
    ];

    let rows = '';

    for (let i = 0; i < subjects.length; i++) {
        const g = student.grades[i] || '-';
        const p = student.points[i] || 0;

        let cls = '';
        if (g === 'A') cls = 'grade-a';
        else if (g === 'B') cls = 'grade-b';
        else if (g === 'C') cls = 'grade-c';
        else if (g === 'D') cls = 'grade-d';
        else cls = 'grade-f';

        rows += `
        <tr>
            <td>${subjects[i]}</td>
            <td class="${cls}">${g}</td>
            <td>${p}</td>
        </tr>`;
    }

    document.getElementById('results').innerHTML = `
        <div class="card p-3">
            <h5>${student.name}</h5>

            <p>
                Candidate: ${student.candidate}<br>
                Form: ${student.form}<br>
                Parent: ${student.parent}
            </p>

            <table class="table table-bordered">
                <thead>
                    <tr><th>Subject</th><th>Grade</th><th>Points</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>

            <b>Total Points:</b> ${student.totalPoints} <br>
            <b>Division:</b> ${student.division}
        </div>
    `;
}