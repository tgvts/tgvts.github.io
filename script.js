console.log("SCRIPT LOADED");

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

        results.innerHTML = `
            <div class="card p-3">
                <h5>${student.name}</h5>
                <p>Candidate: ${student.candidate}</p>
                <p>Total Points: ${student.totalPoints}</p>
                <p>Division: ${student.division}</p>
            </div>
        `;

    } catch (e) {
        console.error(e);
        error.innerText = "Error loading data";
        error.style.display = "block";
    }
}