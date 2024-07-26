// script.js

const studentDataUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
let students = [];

fetch(studentDataUrl)
    .then(response => response.json())
    .then(data => {
        students = data;
        assignIDs(students);
        displayStudents(students);
    });

const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', handleSearch);

document.getElementById('sortAZ').addEventListener('click', () => sortStudents('az'));
document.getElementById('sortZA').addEventListener('click', () => sortStudents('za'));
document.getElementById('sortMarks').addEventListener('click', () => sortStudents('marks'));
document.getElementById('sortPassing').addEventListener('click', () => sortStudents('passing'));
document.getElementById('sortClass').addEventListener('click', () => sortStudents('class'));
document.getElementById('sortGender').addEventListener('click', () => sortStudents('gender'));

function assignIDs(studentList) {
    studentList.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].id = i + 1; // Assigning ID starting from 1
    }
}

function displayStudents(studentList) {
    studentTable.innerHTML = '';
    studentList.forEach(student => {
        const row = studentTable.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
    });
}

function handleSearch() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return student.first_name.toLowerCase().includes(searchTerm) || 
               student.last_name.toLowerCase().includes(searchTerm) ||
               student.email.toLowerCase().includes(searchTerm);
    });
    displayStudents(filteredStudents);
}

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

function displayGenderTables(maleStudents, femaleStudents) {
    const maleTableContainer = document.getElementById('maleTableContainer');
    const femaleTableContainer = document.getElementById('femaleTableContainer');

    maleTableContainer.innerHTML = `
        <h2>Male Students</h2>
        ${generateTableHtml(maleStudents)}
    `;
    femaleTableContainer.innerHTML = `
        <h2>Female Students</h2>
        ${generateTableHtml(femaleStudents)}
    `;
}

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
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
            </tr>
        `;
    });
    tableHtml += '</tbody></table>';
    return tableHtml;
}
