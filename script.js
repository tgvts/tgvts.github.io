const allSubjects = ["History of Tanzania & Civics","History","Geography","Kiswahili","English Language","Physics","Chemistry","Biology","Mathematics","Business Studies","Book Keeping","Islamic Religious Education"];
const subjectCodes = ["HistoriaTZ","History","Geography","Kiswahili","English","Physics","Chemistry","Biology","Mathematics","BusinessStudies","BookKeeping","ElimuDini"];

async function loadData() {
  const response = await fetch('students.json');
  const data = await response.json();
  return data;
}

async function verifyPhone() {
  const phoneInput = document.getElementById('phoneNumber').value.trim();
  const errorDiv = document.getElementById('loginError');
  const resultsContainer = document.getElementById('resultsContainer');

  errorDiv.style.display = 'none';
  resultsContainer.innerHTML = '';

  if (!phoneInput) {
    errorDiv.innerText = 'Please enter your phone number';
    errorDiv.style.display = 'block';
    return;
  }

  let cleanedPhone = phoneInput.replace(/[^0-9]/g,'');
  const students = await loadData();
  const student = students.find(s => s.phone === cleanedPhone);

  if (student) {
    displayResults(student);
  } else {
    errorDiv.innerText = 'Phone number not found. Contact school.';
    errorDiv.style.display = 'block';
  }
}

function displayResults(student) {
  const resultsContainer = document.getElementById('resultsContainer');
  let subjectsHtml = '';
  for (let i=0;i<allSubjects.length;i++){
    const grade = student.grades[i] || '-';
    const points = student.points[i] || 0;
    let gradeClass = grade==='A'?'grade-a':grade==='B'?'grade-b':grade==='C'?'grade-c':grade==='D'?'grade-d':'grade-f';
    subjectsHtml += `<tr><td>${allSubjects[i]}</td><td class="${gradeClass}"><strong>${grade}</strong></td><td class="text-center">${points}</td></tr>`;
  }

  resultsContainer.innerHTML = `
    <div class="result-card p-3 border rounded">
      <h5>${student.name}</h5>
      <p>Candidate: ${student.candidate} | ${student.form} | ${student.sex==='M'?'Male':'Female'}<br>Parent: ${student.parent}</p>
      <table class="table table-sm table-bordered subject-table"><thead><tr><th>Subject</th><th>Grade</th><th>Points</th></tr></thead><tbody>${subjectsHtml}</tbody></table>
      <div class="points-badge">Total Points: ${student.totalPoints} | Division: ${student.division}</div>
    </div>
  `;
}