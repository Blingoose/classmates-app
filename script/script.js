const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

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
  btn.addEventListener("click", btnAction);
  document.addEventListener("keyup", coolFunc);
  search.addEventListener("input", bla);
  const selectCells = document.querySelectorAll(".cell");

  function coolFunc(e) {
    if (e.key === "Enter") {
    }
  }
  function btnAction(e) {}

  function bla(e) {
    let text = e.target.value;
    if (text !== "") {
      for (let m = 0; m < arr.length; m++) {
        arr[m].filter((el) => {
          if (el.toString() === text) {
            selectCells.classList.add("hidden");
          }
        });
      }
    } else {
      return;
    }
  }
}

function paintSearch(arr) {
  const table = document.querySelector(".table");
  const row = document.createElement("div");
  row.classList.add("row");
  for (i = 0; i < arr.length; i++) {
    const cell = document.createElement("div");
    cell.textContent = arr[i];
    cell.classList.add("cell");
    row.append(cell);
    table.append(row);
  }
}

function start() {
  getArrOfStudentID(groups);
}

start();
