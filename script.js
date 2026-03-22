// script.js

// Load students data
let studentsData = [];
fetch('students.json')
  .then(response => response.json())
  .then(data => {
    studentsData = data;
  })
  .catch(err => console.error('Error loading student data:', err));

// Display single student result
function viewStudentResult() {
  const studentId = document.getElementById('studentId').value.trim();
  const container = document.getElementById('resultContainer');
  container.innerHTML = '';

  if (!studentId) {
    container.innerHTML = '<div class="alert alert-warning">Please enter a student ID.</div>';
    return;
  }

  const student = studentsData.find(s => s.id === studentId);
  if (!student) {
    container.innerHTML = `<div class="alert alert-danger">Student with ID ${studentId} not found!</div>`;
    return;
  }

  let subjectsHTML = '<table class="table table-bordered"><thead><tr><th>Subject</th><th>Marks</th></tr></thead><tbody>';
  student.subjects.forEach(sub => {
    subjectsHTML += `<tr><td>${sub.name}</td><td>${sub.marks}</td></tr>`;
  });
  subjectsHTML += '</tbody></table>';

  container.innerHTML = `
    <h4>${student.name} - ${student.class} (${student.term} ${student.year})</h4>
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
          <th>Name</th>
          <th>Class</th>
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
    const subjectsList = student.subjects.map(s => `${s.name}: ${s.marks}`).join('<br>');
    tableHTML += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.class}</td>
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