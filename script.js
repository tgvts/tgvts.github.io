console.log("SCRIPT LOADED");

const subjects = [
    "History", "Geography", "Kiswahili", "English",
    "Physics", "Chemistry", "Biology", "Mathematics",
    "Business", "Book Keeping", "Religion", "Civics"
];

async function verifyPhone() {
    console.log("BUTTON CLICKED");

    const phone = document.getElementById("phoneNumber").value.trim();
    const error = document.getElementById("error");
    const results = document.getElementById("results");

    error.style.display = "none";
    results.innerHTML = "";

    if (!phone) {
        error.innerText = "Enter phone number";
        error.style.display = "block";
        return;
    }

    try {
        const res = await fetch("students.json");
        const data = await res.json();

        const student = data.find(s => s.phone === phone);

        if (!student) {
            error.innerText = "Phone not found";
            error.style.display = "block";
            return;
        }

        displayResults(student);

    } catch (e) {
        console.error(e);
        error.innerText = "Error loading data";
        error.style.display = "block";
    }
}

function displayResults(student) {

    let rows = '';

    for (let i = 0; i < subjects.length; i++) {
        let grade = student.grades[i] || '-';
        let point = student.points[i] || 0;

        rows += `
        <tr>
            <td>${subjects[i]}</td>
            <td>${grade}</td>
            <td>${point}</td>
        </tr>`;
    }

    document.getElementById("results").innerHTML = `
        <div class="card p-3">

            <h5>${student.name}</h5>

            <p>
                Candidate: ${student.candidate}<br>
                Form: ${student.form}<br>
                Parent: ${student.parent}
            </p>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>

            <hr>

            <p><strong>Total Points:</strong> ${student.totalPoints}</p>
            <p><strong>Division:</strong> ${student.division}</p>
            <p><strong>Average:</strong> ${student.average}</p>
            <p><strong>Remarks:</strong> ${student.remarks}</p>

        </div>
    `;
}