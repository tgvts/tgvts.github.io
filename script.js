// script.js

let studentsData = [];
fetch('students.json')
  .then(response => response.json())
  .then(data => studentsData = data)
  .catch(err => console.error('Error loading student data:', err));

// Function to get grade from marks
function getGrade(mark) {
  if (mark >= 20) return 'A';
  if (mark >= 17) return 'B';
  if (mark >= 14) return 'C';
  if (mark >= 11) return 'D';
  return 'E';
}

// Display result by parent phone
function viewStudentResult() {
  const phone = document.getElementById('parentPhone').value.trim();
  const container = document.getElementById('resultContainer');
  container.innerHTML = '';

  if (!phone) {
    container.innerHTML = '<div class="alert alert-warning">Please enter a phone number.</div>';
    return;
  }

  const student = studentsData.find(s => s.parent_phone === phone);
  if (!student) {
    container.innerHTML = `<div class="alert alert-danger">No student found with phone ${phone}.</div>`;
    return;
  }

  let subjectsHTML = '<table class="table table-bordered"><thead><tr><th>Subject</th><th>Marks</th><th>Grade</th></tr></thead><tbody>';
  student.subjects.forEach(sub => {
    subjectsHTML += `<tr><td>${sub.name}</td><td>${sub.marks}</td><td>${getGrade(sub.marks)}</td></tr>`;
  });
  subjectsHTML += '</tbody></table>';

  container.innerHTML = `
    <h4>Parent: ${student.parent_name} | Phone: ${student.parent_phone}</h4>
    <h5>Student: ${student.name} - ${student.class} (${student.term} ${student.year})</h5>
    ${subjectsHTML}
    <p><strong>Total Marks:</strong> ${student.total}</p>
    <p><strong>Average:</strong> ${student.average}</p>
    <p><strong>Division:</strong> ${student.division}</p>
    <p><strong>Remarks:</strong> ${student.remarks}</p>
  `;
}

// Display all students
function showAllStudents() {
  const container = document.getElementById('resultContainer');
  container.innerHTML = '';

  if (!studentsData.length) {
    container.innerHTML = '<div class="alert alert-warning">No student data available.</div>';
    return;
  }

  let tableHTML = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Parent Name</th>
          <th>Parent Phone</th>
          <th>Subjects</th>
          <th>Total</th>
          <th>Average</th>
          <th>Division</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
  `;

  studentsData.forEach(student => {
    const subjectsList = student.subjects.map(s => `${s.name}: ${s.marks} (${getGrade(s.marks)})`).join('<br>');
    tableHTML += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.parent_name}</td>
        <td>${student.parent_phone}</td>
        <td>${subjectsList}</td>
        <td>${student.total}</td>
        <td>${student.average}</td>
        <td>${student.division}</td>
        <td>${student.remarks}</td>
      </tr>
    `;
  });

  tableHTML += '</tbody></table>';
  container.innerHTML = tableHTML;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const viewBtn = document.getElementById('viewResult');
  if (viewBtn) viewBtn.addEventListener('click', viewStudentResult);

  const showAllBtn = document.getElementById('showAllResults');
  if (showAllBtn) showAllBtn.addEventListener('click', showAllStudents);
});