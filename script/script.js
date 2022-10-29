const search = document.querySelector(".search");

// * Optimized for speed. The best I could.

const groups = ["one", "two"];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    `Error ${err}`;
  }
}

//! Fetch by group
async function getArrOfStudentID(groups) {
  const arrOfPromises = [];
  const studentsArrObj = [];
  const studId = [];
  for (let j = 0; j < groups.length; j++) {
    const groupProm = fetchData(
      `https://capsules7.herokuapp.com/api/group/${groups[j]}`
    );
    arrOfPromises.push(groupProm);
  }
  const result = await Promise.all(arrOfPromises);
  studentsArrObj.push(...result.flat());

  for (let student of studentsArrObj) {
    studId.push(student.id);
  }
  getArrOfStudentsObj(studId);
}

//! Fetch by user id
async function getArrOfStudentsObj(data) {
  const arrOfPromises = [];
  const students = [];
  for (let i = 0; i < data.length; i++) {
    const studentsProm = fetchData(
      `https://capsules7.herokuapp.com/api/user/${data[i]}`
    );
    arrOfPromises.push(studentsProm);
  }
  const result = await Promise.all(arrOfPromises);
  students.push(result);
  // console.log(students);
  buildStudentsArr(students[0]);
}

async function buildStudentsArr(data) {
  const arrOfStudents = [];
  for (let n = 0; n < data.length; n++) {
    arrOfStudents.push([
      data[n].id,
      data[n].gender,
      data[n].firstName,
      data[n].lastName,
      data[n].age,
      data[n].hobby,
      data[n].capsule,
    ]);
  }
  paintRow(arrOfStudents);
}

const paintRow = (arrOfData) => {
  const table = document.querySelector(".table");
  for (i = 0; i < arrOfData.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (j = 0; j < arrOfData[j].length; j++) {
      const cell = document.createElement("div");
      cell.textContent = arrOfData[i][j];
      cell.classList.add("cell");
      row.appendChild(cell);
      table.appendChild(row);
    }
  }
  searchText(arrOfData);
};

function searchText(arr) {
  search.addEventListener("input", inputFilter);

  function inputFilter(e) {
    const allRows = document.querySelectorAll(".row");
    const allCells = document.querySelectorAll(".cell");
    console.log(arr);
    let text = e.target.value;

    for (let row of allRows) {
      let innerContent = row.innerText;
      console.log(innerContent);
      if (innerContent.indexOf(text) === -1) {
        row.classList.add("hidden");
      } else {
        row.classList.remove("hidden");
      }
    }
  }
}

function start() {
  getArrOfStudentID(groups);
}

start();
