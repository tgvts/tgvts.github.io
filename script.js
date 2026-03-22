function displayResults(student) {
  const resultsContainer = document.getElementById('resultsContainer');

  let subjectsHtml = '';
  for (let i = 0; i < allSubjects.length; i++) {
    const grade = student.grades[i] || '-';
    const points = student.points[i] || 0;

    let gradeClass = '';
    if (grade === 'A') gradeClass = 'grade-a';
    else if (grade === 'B') gradeClass = 'grade-b';
    else if (grade === 'C') gradeClass = 'grade-c';
    else if (grade === 'D') gradeClass = 'grade-d';
    else gradeClass = 'grade-f';

    subjectsHtml += `
      <tr>
        <td>${allSubjects[i]}</td>
        <td class="${gradeClass}"><strong>${grade}</strong></td>
        <td class="text-center">${points}</td>
      </tr>`;
  }

  resultsContainer.innerHTML = `
    <div class="result-card p-3 border rounded">
      
      <h4>${student.name}</h4>

      <p>
        <strong>Candidate:</strong> ${student.candidate} <br>
        <strong>Form:</strong> ${student.form} <br>
        <strong>Sex:</strong> ${student.sex === 'M' ? 'Male' : 'Female'} <br>
        <strong>Parent:</strong> ${student.parent}
      </p>

      <div class="row text-center mb-3">
        <div class="col"><strong>Total Points</strong><br>${student.totalPoints}</div>
        <div class="col"><strong>Division</strong><br>${student.division}</div>
        <div class="col"><strong>Average</strong><br>${student.average || '-'}</div>
        <div class="col"><strong>Position</strong><br>${student.position || '-'}</div>
      </div>

      <div class="alert alert-info text-center">
        <strong>Remarks:</strong> ${student.remarks || 'N/A'}
      </div>

      <table class="table table-bordered subject-table">
        <thead>
          <tr><th>Subject</th><th>Grade</th><th>Points</th></tr>
        </thead>
        <tbody>
          ${subjectsHtml}
        </tbody>
      </table>

      <button class="btn btn-secondary mt-2" onclick="window.print()">
        Print Results
      </button>
    </div>
  `;
}