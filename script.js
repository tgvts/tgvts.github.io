// script.js

let studentsData = [];

// Function to get grade based on marks
function getGrade(marks) {
    if (marks >= 10) return 'A';
    if (marks >= 8) return 'B';
    if (marks >= 5) return 'C';
    if (marks >= 4) return 'D';
    if (marks > 0) return 'F';
    return '-';
}

// Function to get division based on total points
function getDivision(points) {
    if (points >= 70) return 'I';
    if (points >= 60) return 'II';
    if (points >= 45) return 'III';
    if (points >= 30) return 'IV';
    if (points > 0) return '0';
    return 'INC';
}

// Load data when page is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load JSON file
    fetch('students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load students.json');
            }
            return response.json();
        })
        .then(data => {
            studentsData = data;
            console.log('Loaded', studentsData.length, 'students');
        })
        .catch(err => {
            console.error('Error loading student data:', err);
            document.getElementById('resultContainer').innerHTML = '<div class="alert alert-danger">Error loading student data. Please make sure students.json file exists.</div>';
        });
});

// Function to verify phone and show results
function verifyPhone() {
    const phoneInput = document.getElementById('parentPhone');
    const container = document.getElementById('resultContainer');
    const errorDiv = document.getElementById('loginError');
    
    // Clear previous
    if (errorDiv) errorDiv.style.display = 'none';
    container.innerHTML = '';
    
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        container.innerHTML = '<div class="alert alert-warning">Please enter a phone number.</div>';
        return;
    }
    
    // Clean phone number (remove non-digits)
    let cleanedPhone = phone.replace(/[^0-9]/g, '');
    
    // Remove leading 0 or 255 if present
    if (cleanedPhone.startsWith('255')) {
        cleanedPhone = cleanedPhone.substring(3);
    }
    if (cleanedPhone.startsWith('0')) {
        cleanedPhone = cleanedPhone.substring(1);
    }
    
    console.log('Searching for phone:', cleanedPhone);
    
    // Find student
    const student = studentsData.find(s => s.parent_phone === cleanedPhone);
    
    if (!student) {
        container.innerHTML = `<div class="alert alert-danger">No student found with phone ${phone}.<br><br><strong>Available phone numbers:</strong><br>${studentsData.map(s => s.parent_phone + ' - ' + s.name).join('<br>')}</div>`;
        return;
    }
    
    // Display results
    displayResults(student);
}

// Function to display results
function displayResults(student) {
    const container = document.getElementById('resultContainer');
    
    // Build subjects table
    let subjectsHTML = '<table class="table table-bordered"><thead><tr><th>Subject</th><th>Marks</th><th>Grade</th></tr></thead><tbody>';
    
    student.subjects.forEach(sub => {
        subjectsHTML += `<tr><td>${sub.name}</td><td>${sub.marks}</td><td>${sub.grade}</td></tr>`;
    });
    
    subjectsHTML += '</tbody></table>';
    
    // Division display
    let divisionText = '';
    if (student.division === 'I') divisionText = '🏆 Division I (Excellent)';
    else if (student.division === 'II') divisionText = '🥈 Division II (Very Good)';
    else if (student.division === 'III') divisionText = '🥉 Division III (Good)';
    else if (student.division === 'IV') divisionText = '📘 Division IV (Satisfactory)';
    else if (student.division === '0') divisionText = '⭕ Division 0 (Needs Improvement)';
    else if (student.division === 'ABS') divisionText = '🚫 Absent';
    else divisionText = '⚠️ Incomplete';
    
    const html = `
        <div class="result-card p-4 border rounded mt-4">
            <h3 class="text-success">${student.name}</h3>
            <p><strong>Candidate No:</strong> ${student.candidate}</p>
            <p><strong>Class:</strong> ${student.class} | <strong>Term:</strong> ${student.term} ${student.year}</p>
            <p><strong>Parent:</strong> ${student.parent_name} | <strong>Phone:</strong> ${student.parent_phone}</p>
            
            <div class="row mt-3 mb-3">
                <div class="col-md-6">
                    <div class="bg-light p-3 rounded text-center">
                        <h4>Total Points: ${student.total_points}</h4>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-light p-3 rounded text-center">
                        <h4>Division: ${student.division}</h4>
                        <small>${divisionText}</small>
                    </div>
                </div>
            </div>
            
            <h5>Subject Performance</h5>
            <div class="table-responsive">
                ${subjectsHTML}
            </div>
            
            <div class="mt-3">
                <p><strong>Average:</strong> ${student.average}</p>
                <p><strong>Remarks:</strong> ${student.remarks}</p>
            </div>
            
            <button class="btn btn-secondary mt-3" onclick="window.print()"><i class="fas fa-print me-2"></i> Print Results</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Make verifyPhone available globally
window.verifyPhone = verifyPhone;