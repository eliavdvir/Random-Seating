import { 
  tableArray, 
  studentArray, 
  tableCounter, 
  isRunning, 
  lockedTextboxes, 
  editBarOpened, 
  expandOptionsOpened, 
  expandOptionsOpened2, 
  studentAmount, 
  tableDivsArray 
} from './variables.js';
import { Table, Student } from './classes.js';

// Function to make Div elements Draggable
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
// Function to Remove Table
function removeTable()
{
  if(tableArray.length == 0)
  {
    return;
  }
  let theID = "leftSeatTable" + tableArray.length
  if(lockedTextboxes.includes(theID)) {
      lockedTextboxes.splice(lockedTextboxes.indexOf(theID), 1);
  }
  let theID2 = "rightSeatTable" + tableArray.length
  if(lockedTextboxes.includes(theID2)) {
      lockedTextboxes.splice(lockedTextboxes.indexOf(theID2), 1);
  }
  let tableToRemove = document.getElementById("table" + tableArray.length)
  tableToRemove.remove()
  tableArray.pop()
  tableDivsArray.pop()
  tableCounter = tableCounter - 1;  // Decrease table counter on interface 
  let counterText = document.getElementById('tableCounter')
if(tableCounter > 9) {
  counterText.style.right = "37.5%";
}
else {
  counterText.style.right = "42.5%";

}
counterText.innerText = tableCounter;
  
}

// Function to add new Student
function addStudent()
{
  let StudentName = document.getElementById('newStudentName').value
  let StudentGender = document.getElementById('newStudentGender').value
  let StudentSitNear = document.getElementById('sitNear').value
  if(StudentName.length < 1 || StudentGender == "")
  {
    alert('חובה למלא את כל השדות כולל שם ומין')
    return;
  }
  let newStudent = new Student()
  newStudent.name = StudentName
  newStudent.gender = StudentGender
  newStudent.sitNear = StudentSitNear
  studentArray.push(newStudent);
  
  let list = document.getElementById('studentTable')
  let tr = document.createElement("tr")
  let tdName = document.createElement("td")
  let tdGender = document.createElement("td")
  let tdSitnear = document.createElement("td")
  let tdOptions = document.createElement("td")
  let genderImg = document.createElement("img")


  tdName.innerText = StudentName
  if(StudentGender == "Male")
  {
    genderImg.src = "https://i.ibb.co/Q90kK4P/male-student.png"
    genderImg.className = "gender-img-male"
  } else {
    genderImg.src = "https://i.ibb.co/GFqPFqx/woman.png"
    genderImg.className = "gender-img-female"

  }
  if(StudentSitNear == "Anyone") {
    tdSitnear.innerText = "כולם"
  } else if (StudentSitNear == "Male") {
    tdSitnear.innerText = "רק בנים"
  } else {
    tdSitnear.innerText = "רק בנות"
  }

  let deleteButton = document.createElement("img")
  deleteButton.src="https://i.ibb.co/mTXWpmF/bin.png"
  tdOptions.appendChild(deleteButton)

  let editButton = document.createElement("img")
  editButton.src = "https://i.ibb.co/gz8CYFx/pencil.png"
  tdOptions.appendChild(editButton)


  tdGender.appendChild(genderImg)
  tr.appendChild(tdOptions)
  tr.appendChild(tdSitnear)
  tr.appendChild(tdName)
  tr.appendChild(tdGender)

  list.appendChild(tr)

editButton.addEventListener("click" , () => {
  let imgElement = tdGender.querySelector('img');
  tdGender.textContent = "";
  let imgSrc = imgElement.src;

  let maleImg = document.createElement("img")
  maleImg.src = "https://i.ibb.co/Q90kK4P/male-student.png"

  let femaleImg = document.createElement("img")
  femaleImg.src = "https://i.ibb.co/GFqPFqx/woman.png"

  let updateGenderSelect = document.createElement("select")

  let option1 = document.createElement("option");
option1.value = "Male";
option1.text = "בן";

let option2 = document.createElement("option");
option2.value = "Female";
option2.text = "בת";

if(imgSrc == "https://i.ibb.co/Q90kK4P/male-student.png")
{
  option1.selected = true;
} else {
  option2.selected = true;
}

updateGenderSelect.add(option1);
updateGenderSelect.add(option2);

updateGenderSelect.className = "update-gender-select"
tdGender.appendChild(updateGenderSelect)

let oldName = tdName.innerText
tdName.textContent = "";
let updateNameTextbox = document.createElement("input")
updateNameTextbox.value = oldName
updateNameTextbox.className = "update-name-text"
tdName.appendChild(updateNameTextbox)

let oldSitnear = tdSitnear.innerText
tdSitnear.textContent = "";
let updateSitnearSelect = document.createElement("select")

let anyoneOption = document.createElement("option")
anyoneOption.value = "Anyone";
anyoneOption.text = "כולם";
let maleOption = document.createElement("option")
maleOption.value = "Male";
maleOption.text = "רק בנים";
let femaleOption = document.createElement("option")
femaleOption.value = "Female";
femaleOption.text = "רק בנות";

updateSitnearSelect.add(anyoneOption);
updateSitnearSelect.add(maleOption);
updateSitnearSelect.add(femaleOption);

if(oldSitnear == "כולם")
{
  anyoneOption.selected = true;
} else if(oldSitnear == "רק בנים"){
  maleOption.selected = true;
} else if(oldSitnear == "רק בנות"){
  femaleOption.selected = true;
}
updateSitnearSelect.className = "update-sitnear-select"
tdSitnear.appendChild(updateSitnearSelect)

tdOptions.textContent = "";

let xButton = document.createElement("img")
xButton.src="https://i.ibb.co/y8Sc0yp/cancel.png"


let vButton = document.createElement("img")
vButton.src="https://i.ibb.co/ct4WNdJ/check-mark.png"
tdOptions.appendChild(vButton)
tdOptions.appendChild(xButton)

xButton.addEventListener("click", ()=>{
  tdGender.textContent = "";
tdGender.appendChild(genderImg)

tdName.textContent = "";
tdName.innerText = StudentName

tdSitnear.textContent = "";
if(StudentSitNear == "Anyone") {
    tdSitnear.innerText = "כולם"
  } else if (StudentSitNear == "Male") {
    tdSitnear.innerText = "רק בנים"
  } else {
    tdSitnear.innerText = "רק בנות"
  }

  tdOptions.textContent = "";
  tdOptions.appendChild(deleteButton)
  tdOptions.appendChild(editButton)

})

vButton.addEventListener("click" , ()=>{
  if(updateNameTextbox.value.length < 1)
  {
    alert('שם חייב להכיל תווים')
    return;
  }

  newStudent.name = updateNameTextbox.value
  newStudent.gender = updateGenderSelect.value
  newStudent.sitNear = updateSitnearSelect.value
  StudentName = updateNameTextbox.value
  StudentSitNear = updateSitnearSelect.value

  for (let i = 0; i < studentArray.length; i++) {
  if (studentArray[i].id === newStudent.id) {
    studentArray[i].name = updateNameTextbox.value;
    studentArray[i].gender = updateGenderSelect.value;
    studentArray[i].sitNear = updateSitnearSelect.value
    break;
  } }
  
  tdGender.textContent = "";
if(updateGenderSelect.value == "Male")
  {
    genderImg.src = "https://i.ibb.co/Q90kK4P/male-student.png"
    genderImg.className = "gender-img-male"
  } else {
    genderImg.src = "https://i.ibb.co/GFqPFqx/woman.png"
    genderImg.className = "gender-img-female"
  }
  tdGender.appendChild(genderImg)

  tdName.textContent = "";
  tdName.innerText = updateNameTextbox.value;

  tdSitnear.textContent = "";
  if(updateSitnearSelect.value == "Anyone") {
    tdSitnear.innerText = "כולם"
  } else if (updateSitnearSelect.value == "Male") {
    tdSitnear.innerText = "רק בנים"
  } else {
    tdSitnear.innerText = "רק בנות"
  }

  tdOptions.textContent = "";
  tdOptions.appendChild(deleteButton)
  tdOptions.appendChild(editButton)

})


})

  deleteButton.addEventListener("click", () => {
    const confirmed = window.confirm("האם אתה בטוח שאתה רוצה למחוק את " + StudentName + " מהרשימה?");

if (confirmed) {
  const nameToDelete = newStudent.name;
  const idToDelete = newStudent.id;
  const index = studentArray.findIndex(student => student.name === nameToDelete && student.id === idToDelete);
 // If the student was found in the array
 if (index !== -1) {
    // Remove the student object from the array
    studentArray.splice(index, 1);
    
    // Log a message to the console to confirm the deletion
    console.log("Student deleted from array:", studentArray);
  }

  tr.remove()
    deleteStudent(newStudent)}

  });
  studentAmount++;
  let studentTD = document.getElementById('studentAmount')
  studentTD.innerText = studentAmount
  clearStudentForm()
}

// Function to clear the Add Student Form after submitting
function clearStudentForm()
{
  document.getElementById('newStudentName').value = ""
  document.getElementById('newStudentGender').selectedIndex = 0;
  document.getElementById('sitNear').selectedIndex = 0;

}

// Function to delete Student
function deleteStudent(theStudent) {
    studentAmount--;
    let studentTD = document.getElementById('studentAmount')
      studentTD.innerText = studentAmount
    console.log("Student deleted:", theStudent);
    }

// Function to get random number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  // Function to add a lot of Students at once
  function addStudentBulk() {
    let studentsToAdd420 = document.getElementById('bulkStudentTextbox').value
    let studentsToAdd = studentsToAdd420.trim()
    if(studentsToAdd.charAt(studentsToAdd.length - 1) == ',')
    {
     let studentsToAdd1 = studentsToAdd.slice(0, -1); 
     studentsToAdd = studentsToAdd1
    } 
    let messedArray = studentsToAdd.split(",");
    if (messedArray.length % 3 !== 0) {
        alert("יש לתקן את הרשימה ולנסות שוב. הפורמט להכנסת התלמידים הוא: שם, מין, יושב ליד (דוגמא: אבי כהן, בן, בנים, נועה לוי, בת, כולם)")    
        return;
    }
  
    let errorAlready = false; // bool to know if 'Error div' already has an error inside
    for (let i = 0; i < messedArray.length; i += 3) {
      let aName1 = messedArray[i].trim();
      let aName = aName1.replace(/\s+/g, ' ');
      let aGender = messedArray[i + 1].trim();
      let aSitNear = messedArray[i + 2].trim();
      let aStudent = new Student;
      aStudent.name = aName;
  
      if(aGender == "בן") {
        aStudent.gender = "Male"
      } else if (aGender == "בת") {
        aStudent.gender = "Female"
      } else {        // If user had a typo
        errorAlready = true;
        let errorDiv =  document.getElementById('errorBulkDiv')
        let errorContent = document.getElementById('errorContent')
        let errorCountdown = document.getElementById('errorCountdown')
        let errorXbutton = document.getElementById('errorXbutton')
  
        errorDiv.style.backgroundColor = "#ffabab"
  
        if (errorAlready == true) {   // Add a <br> if theres already an error
        let br = document.createElement("br")
        errorDiv.appendChild(br)
       }
  
       errorContent.innerText += "לא ניתן להכניס את " + aName + " בגלל ש '" + aGender + "' לא מוכר למערכת•"
  
       const errorDivColor = setTimeout(()=>{   // Reset the error Div
          errorDiv.style.backgroundColor = "transparent"
          errorContent.innerText = ""
          errorXbutton.innerText = ""
          errorXbutton.removeEventListener("click", clickHandler);
          errorXbutton.style.cursor = "default"
        }, 15000);
  
        let loopCounter = 14;
  errorCountdown.innerText = "15";
  
  const countdownInterval = setInterval(() => {
    if (loopCounter > 0) {
      errorCountdown.innerText = loopCounter;
    } else {
      errorCountdown.innerText = "";
      clearInterval(countdownInterval); // Clear the interval when the countdown is finished
      errorXbutton.style.cursor = "default"
    }
    loopCounter--;
  }, 1000);
  
        errorXbutton.innerText = "X"
        errorXbutton.style.cursor = "pointer"
        errorXbutton.addEventListener("click", function clickHandler() {
    errorDiv.style.backgroundColor = "transparent"
    errorContent.innerText = ""
    errorXbutton.innerText = ""
    errorCountdown.innerText = ""
    loopCounter = 0;
    clearTimeout(errorDivColor);
    errorXbutton.style.cursor = "default"
  
    // Remove the event listener
    errorXbutton.removeEventListener("click", clickHandler);
  });
  
        delete(aStudent)
        continue;
      }
  
      if(aSitNear == "כולם")
      {
        aStudent.sitNear = "Anyone"
      } else if (aSitNear == "בנים") {
        aStudent.sitNear = "Male"
      } else if (aSitNear == "בנות") {
        aStudent.sitNear = "Female"
      } else {
        console.log("ERROR with " + aName + " couldnt understand sitNear")
        delete(aStudent)
        continue;
      }
  
      
      studentArray.push(aStudent);
      studentAmount++;
      
    let list = document.getElementById('studentTable')
    let tr = document.createElement("tr")
    let tdName = document.createElement("td")
    let tdGender = document.createElement("td")
    let tdSitnear = document.createElement("td")
    let tdOptions = document.createElement("td")
    let genderImg = document.createElement("img")
  
  
    tdName.innerText = aName
    if(aStudent.gender == "Male")
    {
      genderImg.src = "https://i.ibb.co/Q90kK4P/male-student.png"
      genderImg.className = "gender-img-male"
    } else {
      genderImg.src = "https://i.ibb.co/GFqPFqx/woman.png"
      genderImg.className = "gender-img-female"
  
    }
    if(aStudent.sitNear == "Anyone") {
      tdSitnear.innerText = "כולם"
    } else if (aStudent.sitNear == "Male") {
      tdSitnear.innerText = "רק בנים"
    } else {
      tdSitnear.innerText = "רק בנות"
    }
  
    let deleteButton = document.createElement("img")
    deleteButton.src="https://i.ibb.co/mTXWpmF/bin.png"
    tdOptions.appendChild(deleteButton)
  
    let editButton = document.createElement("img")
    editButton.src = "https://i.ibb.co/gz8CYFx/pencil.png"
    tdOptions.appendChild(editButton)
  
  
    tdGender.appendChild(genderImg)
    tr.appendChild(tdOptions)
    tr.appendChild(tdSitnear)
    tr.appendChild(tdName)
    tr.appendChild(tdGender)
  
    list.appendChild(tr)
    
    
  editButton.addEventListener("click" , () => {
    let imgElement = tdGender.querySelector('img');
    tdGender.textContent = "";
    let imgSrc = imgElement.src;
  
    let maleImg = document.createElement("img")
    maleImg.src = "https://i.ibb.co/Q90kK4P/male-student.png"
  
    let femaleImg = document.createElement("img")
    femaleImg.src = "https://i.ibb.co/GFqPFqx/woman.png"
  
    let updateGenderSelect = document.createElement("select")
  
    let option1 = document.createElement("option");
  option1.value = "Male";
  option1.text = "בן";
  
  let option2 = document.createElement("option");
  option2.value = "Female";
  option2.text = "בת";
  
  if(imgSrc == "https://i.ibb.co/Q90kK4P/male-student.png")
  {
    option1.selected = true;
  } else {
    option2.selected = true;
  }
  
  updateGenderSelect.add(option1);
  updateGenderSelect.add(option2);
  
  updateGenderSelect.className = "update-gender-select"
  tdGender.appendChild(updateGenderSelect)
  
  let oldName = tdName.innerText
  tdName.textContent = "";
  let updateNameTextbox = document.createElement("input")
  updateNameTextbox.value = oldName
  updateNameTextbox.className = "update-name-text"
  tdName.appendChild(updateNameTextbox)
  
  let oldSitnear = tdSitnear.innerText
  tdSitnear.textContent = "";
  let updateSitnearSelect = document.createElement("select")
  
  let anyoneOption = document.createElement("option")
  anyoneOption.value = "Anyone";
  anyoneOption.text = "כולם";
  let maleOption = document.createElement("option")
  maleOption.value = "Male";
  maleOption.text = "רק בנים";
  let femaleOption = document.createElement("option")
  femaleOption.value = "Female";
  femaleOption.text = "רק בנות";
  
  updateSitnearSelect.add(anyoneOption);
  updateSitnearSelect.add(maleOption);
  updateSitnearSelect.add(femaleOption);
  
  if(oldSitnear == "כולם")
  {
    anyoneOption.selected = true;
  } else if(oldSitnear == "רק בנים"){
    maleOption.selected = true;
  } else if(oldSitnear == "רק בנות"){
    femaleOption.selected = true;
  }
  updateSitnearSelect.className = "update-sitnear-select"
  tdSitnear.appendChild(updateSitnearSelect)
  
  tdOptions.textContent = "";
  
  let xButton = document.createElement("img")
  xButton.src="https://i.ibb.co/y8Sc0yp/cancel.png"
  
  
  let vButton = document.createElement("img")
  vButton.src="https://i.ibb.co/ct4WNdJ/check-mark.png"
  tdOptions.appendChild(vButton)
  tdOptions.appendChild(xButton)
  
  xButton.addEventListener("click", ()=>{
    tdGender.textContent = "";
  tdGender.appendChild(genderImg)
  
  tdName.textContent = "";
  tdName.innerText = aStudent.name
  
  tdSitnear.textContent = "";
  if(aStudent.sitNear == "Anyone") {
      tdSitnear.innerText = "כולם"
    } else if (aStudent.sitNear == "Male") {
      tdSitnear.innerText = "רק בנים"
    } else {
      tdSitnear.innerText = "רק בנות"
    }
  
    tdOptions.textContent = "";
    tdOptions.appendChild(deleteButton)
    tdOptions.appendChild(editButton)
  
  })
  
  vButton.addEventListener("click" , ()=>{
    if(updateNameTextbox.value.length < 1)
    {
      alert('שם חייב להכיל תווים')
      return;
    }
  
    aStudent.name = updateNameTextbox.value
    aStudent.gender = updateGenderSelect.value
    aStudent.sitNear = updateSitnearSelect.value
    aName = updateNameTextbox.value
    aSitNear = updateSitnearSelect.value
  
    for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id === aStudent.id) {
      studentArray[i].name = updateNameTextbox.value;
      studentArray[i].gender = updateGenderSelect.value;
      studentArray[i].sitNear = updateSitnearSelect.value
      break;
    } }
    
    tdGender.textContent = "";
  if(updateGenderSelect.value == "Male")
    {
      genderImg.src = "https://i.ibb.co/Q90kK4P/male-student.png"
      genderImg.className = "gender-img-male"
    } else {
      genderImg.src = "https://i.ibb.co/GFqPFqx/woman.png"
      genderImg.className = "gender-img-female"
    }
    tdGender.appendChild(genderImg)
  
    tdName.textContent = "";
    tdName.innerText = updateNameTextbox.value;
  
    tdSitnear.textContent = "";
    if(updateSitnearSelect.value == "Anyone") {
      tdSitnear.innerText = "כולם"
    } else if (updateSitnearSelect.value == "Male") {
      tdSitnear.innerText = "רק בנים"
    } else {
      tdSitnear.innerText = "רק בנות"
    }
  
    tdOptions.textContent = "";
    tdOptions.appendChild(deleteButton)
    tdOptions.appendChild(editButton)
  
  })
  
  
  })
    
  deleteButton.addEventListener("click", () => {
      const confirmed = window.confirm("האם אתה בטוח שאתה רוצה למחוק את " + aName + " מהרשימה?");
  
  if (confirmed) {
    const nameToDelete = aStudent.name;
    const idToDelete = aStudent.id;
    const index = studentArray.findIndex(student => student.name === nameToDelete && student.id === idToDelete);
   // If the student was found in the array
   if (index !== -1) {
      // Remove the student object from the array
      studentArray.splice(index, 1);
      
      // Log a message to the console to confirm the deletion
      console.log("Student deleted from array:", studentArray);
    }
  
    tr.remove()
      deleteStudent(aStudent)}
  
    });
    let studentTD = document.getElementById('studentAmount')
    studentTD.innerText = studentAmount
    }  
  clearStudentBulkForm()
  }

  // Function to clear Student Bulk adder form after submitting
  function clearStudentBulkForm() {
    document.getElementById('bulkStudentTextbox').value = ""
  }

// Function to calculate Div size for Organizer functions
    function calculateDivSize() {
    let divElement = document.getElementById('bigBlock')
    const width = divElement.clientWidth;
    const height = divElement.clientHeight;
    return { width, height };
  }

// Function to Organize Tables 3 in each Row
function positionTablesThreeInRow() {
    let tableAmount = tableDivsArray.length
  const divSize = calculateDivSize();
  let valuesWidth = [
    parseInt(tableWidthNow) + "%",
    parseInt(tableWidthNow) + 25 + "%",
    parseInt(tableWidthNow) + 50 + "%",
  ];
  
  if(tableAmount > 0 && tableAmount < 4) {
    for(let i=0; i<tableDivsArray.length; i++) 
    {
      let topPlacement = parseInt(tableHeightNow) + 30 + "%";
      let leftPlacement = valuesWidth[i % valuesWidth.length];
      tableDivsArray[i].style.top = topPlacement;
      tableDivsArray[i].style.left = leftPlacement;
    }
  }  else if(tableAmount > 3 && tableAmount < 7) {
    for(let i=0; i<tableDivsArray.length; i++) 
    {
      let leftPlacement = valuesWidth[i % valuesWidth.length];
      tableDivsArray[i].style.left = leftPlacement;
  
      if (i < 3) {
      topPlacement = parseInt(tableHeightNow) + 15 + "%";
    } else {
      topPlacement = parseInt(tableHeightNow) + 35 + "%";
    }
    tableDivsArray[i].style.top = topPlacement;
    } 
  } else if(tableAmount > 6 && tableAmount < 10) {
    for(let i=0; i<tableDivsArray.length; i++) 
    {
      let leftPlacement = valuesWidth[i % valuesWidth.length];
      tableDivsArray[i].style.left = leftPlacement;
  
      if (i < 3) {
      topPlacement = parseInt(tableHeightNow) + 5 + "%";
    } else if (i < 6) {
      topPlacement = parseInt(tableHeightNow) + 25 + "%";
    } else {
      topPlacement = parseInt(tableHeightNow) + 45 + "%";
    }
    tableDivsArray[i].style.top = topPlacement;
    } 
  } else if(tableAmount > 9 && tableAmount < 13) {
    for(let i=0; i<tableDivsArray.length; i++) 
    {
      let leftPlacement = valuesWidth[i % valuesWidth.length];
      tableDivsArray[i].style.left = leftPlacement;
  
      if (i < 3) {
      topPlacement = parseInt(tableHeightNow) + 5 + "%";
    } else if (i < 6) {
      topPlacement = parseInt(tableHeightNow) + 25 + "%";
    } else if (i < 9){
      topPlacement = parseInt(tableHeightNow) + 45 + "%";
    } else {
      topPlacement = parseInt(tableHeightNow) + 65 + "%";
    }
    tableDivsArray[i].style.top = topPlacement;
    } 
  } else if(tableAmount > 12 && tableAmount < 16) {
    for(let i=0; i<tableDivsArray.length; i++) 
    {
      let leftPlacement = valuesWidth[i % valuesWidth.length];
      tableDivsArray[i].style.left = leftPlacement;
  
      if (i < 3) {
      topPlacement = parseInt(tableHeightNow / 2) + 2.5 + "%";
    } else if (i < 6) {
      topPlacement = parseInt(tableHeightNow) + 12.5 + "%";
    } else if (i < 9){
      topPlacement = parseInt(tableHeightNow) + 27.5 + "%";
    } else if (i < 12) {
      topPlacement = parseInt(tableHeightNow) + 42.5 + "%";
    } else {
      topPlacement = parseInt(tableHeightNow) + 57.5 + "%";
    }
    tableDivsArray[i].style.top = topPlacement;
    } 
  }  else {
  alert("סידור 3 שולחנות בשורה עובד רק כאשר יש בין 1 ל15 שולחנות")
  }
  
  }

  // Function to Organize Tables 4 in each row
  function positionTablesFourInRow() {
    let tableAmount = tableDivsArray.length
    const divSize = calculateDivSize();
    let valuesWidth = [
      parseInt(tableWidthNow / 3) + "%",
      parseInt(tableWidthNow) + 12.5 + "%",
      parseInt(tableWidthNow) + 37.5 + "%",
      parseInt(tableWidthNow) + 62.5 + "%"
    ];
    
    if(tableAmount > 0 && tableAmount < 5) {
      for(let i=0; i<tableDivsArray.length; i++) 
      {
        let topPlacement = parseInt(tableHeightNow) + 30 + "%";
        let leftPlacement = valuesWidth[i % valuesWidth.length];
        tableDivsArray[i].style.top = topPlacement;
        tableDivsArray[i].style.left = leftPlacement;
      }
    } else if(tableAmount > 4 && tableAmount < 9) {
      for(let i=0; i<tableDivsArray.length; i++) 
      {
        let leftPlacement = valuesWidth[i % valuesWidth.length];
        tableDivsArray[i].style.left = leftPlacement;
    
        if (i < 4) {
        topPlacement = parseInt(tableHeightNow) + 15 + "%";
      } else {
        topPlacement = parseInt(tableHeightNow) + 35 + "%";
      }
      tableDivsArray[i].style.top = topPlacement;
      } 
    } else if(tableAmount > 8 && tableAmount < 13) {
      for(let i=0; i<tableDivsArray.length; i++) 
      {
        let leftPlacement = valuesWidth[i % valuesWidth.length];
        tableDivsArray[i].style.left = leftPlacement;
    
        if (i < 4) {
        topPlacement = parseInt(tableHeightNow) + 10 + "%";
      } else if (i > 4 && i < 9) {
        topPlacement = parseInt(tableHeightNow) + 30 + "%";
      } else {
        topPlacement = parseInt(tableHeightNow) + 50 + "%";
      }
      tableDivsArray[i].style.top = topPlacement;
      } 
    } else if(tableAmount > 12 && tableAmount < 17) {
      for(let i=0; i<tableDivsArray.length; i++) 
      {
        let leftPlacement = valuesWidth[i % valuesWidth.length];
        tableDivsArray[i].style.left = leftPlacement;
    
        if (i < 4) {
        topPlacement = parseInt(tableHeightNow) + 5 + "%";
      } else if (i > 4 && i < 9) {
        topPlacement = parseInt(tableHeightNow) + 25 + "%";
      } else if (i > 8 && i < 13) {
        topPlacement = parseInt(tableHeightNow) + 45 + "%";
      }
      else {
        topPlacement = parseInt(tableHeightNow) + 65 + "%";
      }
      tableDivsArray[i].style.top = topPlacement;
      } 
    } else if(tableAmount > 16 && tableAmount < 21) {
      for(let i=0; i<tableDivsArray.length; i++) 
      {
        let leftPlacement = valuesWidth[i % valuesWidth.length];
        tableDivsArray[i].style.left = leftPlacement;
    
        if (i < 4) {
        topPlacement = parseInt(tableHeightNow / 2) + "%";
      } else if (i > 4 && i < 9) {
        topPlacement = parseInt(tableHeightNow) + 12.5 + "%";
      } else if (i > 8 && i < 13) {
        topPlacement = parseInt(tableHeightNow) + 32.5 + "%";
      }
      else if (i > 12 && i < 17) {
        topPlacement = parseInt(tableHeightNow) + 52.5 + "%";
      } else {
        topPlacement = parseInt(tableHeightNow) + 72.5 + "%";
      }
      tableDivsArray[i].style.top = topPlacement;
      } 
    } else {
    alert("סידור 4 שולחנות בשורה עובד רק כאשר יש בין 1 ל20 שולחנות")
    }
    
    }

// Function to Organize Tables 5 in each row
function positionTablesFiveInRow()
{
  let tableAmount = tableDivsArray.length
const divSize = calculateDivSize();
let valuesWidth = [
  parseInt(tableWidthNow / 2) - 2 + "%",
  parseInt(tableWidthNow) + 8 + "%",
  parseInt(tableWidthNow) + 26 + "%",
  parseInt(tableWidthNow) + 44 + "%",
  parseInt(tableWidthNow) + 62 + "%"
];

if(tableAmount > 0 && tableAmount < 6) {
  for(let i=0; i<tableDivsArray.length; i++) 
  {
    let topPlacement = parseInt(tableHeightNow) + 30 + "%";
    let leftPlacement = valuesWidth[i % valuesWidth.length];
    tableDivsArray[i].style.top = topPlacement;
    tableDivsArray[i].style.left = leftPlacement;
  }
} else if(tableAmount > 5 && tableAmount < 11) {
  for(let i=0; i<tableDivsArray.length; i++) 
  {
    let leftPlacement = valuesWidth[i % valuesWidth.length];
    tableDivsArray[i].style.left = leftPlacement;

    if (i < 5) {
    topPlacement = parseInt(tableHeightNow) + 15 + "%";
  } else {
    topPlacement = parseInt(tableHeightNow) + 35 + "%";
  }
  tableDivsArray[i].style.top = topPlacement;
  } 
}  else if(tableAmount > 10 && tableAmount < 16) {
  for(let i=0; i<tableDivsArray.length; i++) 
  {
    let leftPlacement = valuesWidth[i % valuesWidth.length];
    tableDivsArray[i].style.left = leftPlacement;

    if (i < 5) {
    topPlacement = parseInt(tableHeightNow) + 5 + "%";
  } else if (i < 10) {
    topPlacement = parseInt(tableHeightNow) + 25 + "%";
  } else {
    topPlacement = parseInt(tableHeightNow) + 45 + "%";
  }
  tableDivsArray[i].style.top = topPlacement;
  } 
}  else if(tableAmount > 15 && tableAmount < 21) {
  for(let i=0; i<tableDivsArray.length; i++) 
  {
    let leftPlacement = valuesWidth[i % valuesWidth.length];
    tableDivsArray[i].style.left = leftPlacement;

    if (i < 5) {
    topPlacement = parseInt(tableHeightNow) + 5 + "%";
  } else if (i < 10) {
    topPlacement = parseInt(tableHeightNow) + 25 + "%";
  } else if (i < 15) {
    topPlacement = parseInt(tableHeightNow) + 45 + "%";
  } else {
    topPlacement = parseInt(tableHeightNow) + 65 + "%";
  }
  tableDivsArray[i].style.top = topPlacement;
  } 
}  else {
alert("סידור 5 שולחנות בשורה עובד רק כאשר יש בין 1 ל20 שולחנות")
}

}

// Function to lock all Seat textboxes
function lockAll() {
    let leftLockElements = document.querySelectorAll('.left-lock');
    let rightLockElements = document.querySelectorAll('.right-lock');
    let allLockElements = [...leftLockElements, ...rightLockElements];
    let leftSeats = document.querySelectorAll('.leftSeat');
    let rightSeats = document.querySelectorAll('.rightSeat');
    let allSeats = [...leftSeats, ...rightSeats];
    let elements = document.querySelectorAll('[id^="leftSeatTable"], [id^="rightSeatTable"]');
  
    lockedTextboxes = [];
  
    for(let i=0; i<allLockElements.length; i++)
    {
      const imgElement = allLockElements[i].querySelector('img');
    imgElement.src = 'https://i.ibb.co/7x3m9hZ/lock-1.png';
    allLockElements[i].style.display = "block"
    lockedTextboxes.push(elements[i].id)
    allSeats[i].readOnly = true;
    allSeats[i].style.cursor = "not-allowed"
    }
  }

// Function to Unlock all Seats textboxes
function unlockAll()
{
  let leftLockElements = document.querySelectorAll('.left-lock');
  let rightLockElements = document.querySelectorAll('.right-lock');
  let allLockElements = [...leftLockElements, ...rightLockElements];
  let leftSeats = document.querySelectorAll('.leftSeat');
  let rightSeats = document.querySelectorAll('.rightSeat');
  let allSeats = [...leftSeats, ...rightSeats];

  lockedTextboxes = [];

  for(let i=0; i<allLockElements.length; i++)
  {
    const imgElement = allLockElements[i].querySelector('img');
  imgElement.src = 'https://i.ibb.co/3cDHQ4j/unlocked.png';
  allLockElements[i].style.display = "none"
  allSeats[i].readOnly = false;
  allSeats[i].style.cursor = "text"
  }
}
