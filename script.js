const studentDataUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
let students = [];

// Fetch student data
fetch(studentDataUrl)
    .then(response => response.json())
    .then(data => {
        students = data;
        displayStudents(students);
    });

const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

// Event listeners for search and sort buttons
searchButton.addEventListener('click', handleSearch);
document.getElementById('sortAZ').addEventListener('click', () => sortStudents('az'));
document.getElementById('sortZA').addEventListener('click', () => sortStudents('za'));
document.getElementById('sortMarks').addEventListener('click', () => sortStudents('marks'));
document.getElementById('sortPassing').addEventListener('click', () => sortStudents('passing'));
document.getElementById('sortClass').addEventListener('click', () => sortStudents('class'));
document.getElementById('sortGender').addEventListener('click', () => sortStudents('gender'));

// Display students in the table
function displayStudents(studentList) {
    studentTable.innerHTML = '';
    studentList.forEach(student => {
        const row = studentTable.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td class="profile"><img src=${student.img_src} class='profile-img'>${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Pass' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
    });
}

// Handle search input
function handleSearch() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return student.first_name.toLowerCase().includes(searchTerm) || 
               student.last_name.toLowerCase().includes(searchTerm) ||
               student.email.toLowerCase().includes(searchTerm);
    });
    displayStudents(filteredStudents);
}

// Sort students based on the given criteria
function sortStudents(criteria) {
    let sortedStudents = [...students];
    if (criteria === 'az') {
        sortedStudents.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
    } else if (criteria === 'za') {
        sortedStudents.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
    } else if (criteria === 'marks') {
        sortedStudents.sort((a, b) => a.marks - b.marks);
    } else if (criteria === 'passing') {
        sortedStudents = sortedStudents.filter(student => student.passing);
    } else if (criteria === 'class') {
        sortedStudents.sort((a, b) => a.class - b.class);
    } else if (criteria === 'gender') {
        const maleStudents = sortedStudents.filter(student => student.gender === 'male');
        const femaleStudents = sortedStudents.filter(student => student.gender === 'female');
        displayGenderTables(maleStudents, femaleStudents);
        return;
    }
    displayStudents(sortedStudents);
}

// Display separate tables for male and female students
function displayGenderTables(maleStudents, femaleStudents) {
    const maleTableContainer = document.getElementById('maleTableContainer');
    const femaleTableContainer = document.getElementById('femaleTableContainer');

    maleTableContainer.innerHTML = '<h2>Male Students</h2>' + generateTableHtml(maleStudents);
    femaleTableContainer.innerHTML = '<h2>Female Students</h2>' + generateTableHtml(femaleStudents);
}

// Generate HTML for the given student list
function generateTableHtml(studentList) {
    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
    `;
    studentList.forEach(student => {
        tableHtml += `
            <tr>
                <td>${student.id}</td>
                <td class="profile"><img src={student.src_img} class='profile-img'>${student.first_name} ${student.last_name}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Pass' : 'Failed'}</td>
                <td>${student.email}</td>
            </tr>
        `;
    });
    tableHtml += '</tbody></table>';
    return tableHtml;
}
