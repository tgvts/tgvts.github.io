// script.js

let studentsData = [];

// Load JSON after DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  fetch('students.json')
    .then(response => response.json())
    .then(data => studentsData = data)
    .catch(err => console.error('Error loading student data:', err));

  // Get button and attach click
  const viewBtn = document.getElementById('viewResult');
  viewBtn.addEventListener('click', () => {
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

    // Function to get grade
    const getGrade = mark => {
      if (mark >= 20) return 'A';
      if (mark >= 17) return 'B';
      if (mark >= 14) return 'C';
      if (mark >= 11) return 'D';
      return 'E';
    };

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
  });

});