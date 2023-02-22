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
import { 
  dragElement, 
  removeTable, 
  addStudent, 
  deleteStudent, 
  getRandomIntInclusive, 
  addStudentBulk,
  positionTablesThreeInRow,
  positionTablesFourInRow,
  positionTablesFiveInRow,
  lockAll,
  unlockAll 
} from './functions.js';

// Event listener to add new Table
document.getElementById("addTableButton").addEventListener("click", function(){
  let newTable = new Table(); // Create a Table Class
tableArray.push(newTable)

tableCounter = tableCounter + 1;  // Increment table counter on interface


let counterText = document.getElementById('tableCounter')
if(tableCounter > 9) {
counterText.style.right = "37.5%";
}
else {
counterText.style.right = "42.5%";

}
counterText.innerText = tableCounter;

let newDiv2 = document.createElement("div");    // Create Div for Table
newDiv2.id = "table" + tableArray.length;
newDiv2.className = "div-1"
let block = document.getElementById('bigBlock')
newDiv1 = document.createElement("div")
newDiv1.id = newDiv2.id + "header"
newDiv1.className = "div-2"

tableDivsArray.push(newDiv2)

let hoverAreaDiv = document.createElement("div")
hoverAreaDiv.className = "hidden-area"
newDiv2.appendChild(hoverAreaDiv)

let rotateButtonLeft = document.createElement("button"); // Create rotate button
rotateButtonLeft.className = "rotate-button-left"
newDiv2.appendChild(rotateButtonLeft);

let rotateButtonRight = document.createElement("button"); // Create rotate button
rotateButtonRight.className = "rotate-button-right"
newDiv2.appendChild(rotateButtonRight);


rotateButtonRight.addEventListener("click", function() { // Rotate button click event
newDiv2.style.transform += "rotate(45deg)"; // Rotate the parent div 45 degrees
});
rotateButtonLeft.addEventListener("click", function() {
newDiv2.style.transform += "rotate(-45deg)"; 
});

let leftSeat = document.createElement("input");   // Creating Textboxes as Seats
let rightSeat = document.createElement("input"); 
leftSeat.setAttribute("type", "text");
rightSeat.setAttribute("type", "text");
leftSeat.setAttribute("id", "leftSeatTable" + tableArray.length);
rightSeat.setAttribute("id", "rightSeatTable" + tableArray.length);
leftSeat.className = "leftSeat"
rightSeat.className = "rightSeat"
  


let leftSeatLockButton = document.createElement("div");    // Creating Lock Buttons
let rightSeatLockButton = document.createElement("div");

leftSeatLockButton.className = "left-lock"
rightSeatLockButton.className = "right-lock"

let lockedImg = document.createElement("img")
let unlockedImg = document.createElement("img")

let unlockedImg2 = document.createElement("img")
unlockedImg2.src = "https://i.ibb.co/3cDHQ4j/unlocked.png"


lockedImg.src = "https://i.ibb.co/7x3m9hZ/lock-1.png"
unlockedImg.src = "https://i.ibb.co/3cDHQ4j/unlocked.png"

leftSeatLockButton.appendChild(unlockedImg)
rightSeatLockButton.appendChild(unlockedImg2)
leftSeatLockButton.style.display = "none";
rightSeatLockButton.style.display = "none";
let newDivForLeftSeat = document.createElement("div");
let newDivForRightSeat = document.createElement("div");

newDivForLeftSeat.appendChild(leftSeat)   // Appending
newDivForLeftSeat.appendChild(leftSeatLockButton)
newDivForRightSeat.appendChild(rightSeat)
newDivForRightSeat.appendChild(rightSeatLockButton)
newDiv2.appendChild(newDivForLeftSeat)
newDiv2.appendChild(newDiv1)
newDiv2.appendChild(newDivForRightSeat)

block.appendChild(newDiv2);

let leftLocked = false;
let rightLocked = false;

leftSeatLockButton.addEventListener("click", function(){    // Creating Lock button function
  let leftSeatTextboxId = leftSeat.getAttribute("id");
  const leftSeatLockButtonImg = leftSeatLockButton.querySelector('img');

  if(lockedTextboxes.includes(leftSeatTextboxId)) {
    lockedTextboxes.splice(lockedTextboxes.indexOf(leftSeatTextboxId), 1);
    leftSeatLockButtonImg.src = "https://i.ibb.co/3cDHQ4j/unlocked.png"
    leftSeat.readOnly = false;
    leftSeat.style.cursor = "text";
    leftLocked = false;
  } else {
    lockedTextboxes.push(leftSeatTextboxId);
    leftSeatLockButtonImg.src = "https://i.ibb.co/7x3m9hZ/lock-1.png"
    leftSeat.readOnly = true;
    leftSeat.style.cursor = "not-allowed";
    leftSeatLockButton.style.display = "block";
    leftLocked = true;
  }
});

rightSeatLockButton.addEventListener("click", function(){
  let rightSeatTextboxId = rightSeat.getAttribute("id");
  const rightSeatLockButtonImg = rightSeatLockButton.querySelector('img');

  if(lockedTextboxes.includes(rightSeatTextboxId)) {
    lockedTextboxes.splice(lockedTextboxes.indexOf(rightSeatTextboxId), 1);
    rightSeatLockButtonImg.src = "https://i.ibb.co/3cDHQ4j/unlocked.png"
    rightSeat.readOnly = false;
    rightSeat.style.cursor = "text";
    rightSeatLockButton.style.display = "none";
    rightLocked = false;
  } else {
    lockedTextboxes.push(rightSeatTextboxId);
    rightSeatLockButtonImg.src = "https://i.ibb.co/7x3m9hZ/lock-1.png"
    rightSeat.readOnly = true;
    rightSeat.style.cursor = "not-allowed";
    rightSeatLockButton.style.display = "block";
    rightLocked = true;
  }
});


newDiv2.addEventListener("mouseover" , ()=>{
rotateButtonRight.style.display = "block"
rotateButtonLeft.style.display = "block"
leftSeatLockButton.style.display = "block";
rightSeatLockButton.style.display = "block";

  })
  newDiv2.addEventListener("mouseleave" , ()=>{
rotateButtonRight.style.display = "none";
rotateButtonLeft.style.display = "none";
const leftSeatLockButtonImg = leftSeatLockButton.querySelector('img');
const rightSeatLockButtonImg = rightSeatLockButton.querySelector('img');

if(leftSeatLockButtonImg.src == "https://i.ibb.co/3cDHQ4j/unlocked.png")
{
  leftSeatLockButton.style.display = "none";
}
if(rightSeatLockButtonImg.src == "https://i.ibb.co/3cDHQ4j/unlocked.png")
{
  rightSeatLockButton.style.display = "none";
}
  })

  leftSeat.addEventListener("keyup" , function(event){
  let oldSuggested = document.querySelector(".suggestion-div-left");
  if(oldSuggested != null)
  {
    newDivForLeftSeat.removeChild(oldSuggested);
  }


  let suggestionDiv = document.createElement("div")   // Creating a div for suggestions
  suggestionDiv.className = "suggestion-div-left"
  newDivForLeftSeat.appendChild(suggestionDiv)

  if (event.key === "Escape" || leftSeat.value == "") {
    let deleteThisDiv = document.querySelector(".suggestion-div-left");
  if (deleteThisDiv != null) {
    newDivForLeftSeat.removeChild(deleteThisDiv);
  }
   }

  function handleClick(event) {
if (event.target !== newDivForLeftSeat && !newDivForLeftSeat.contains(event.target)) {
  const deleteThisDiv = document.querySelector('.suggestion-div-left');
  if (deleteThisDiv) {
    newDivForLeftSeat.removeChild(deleteThisDiv);
  }
}
}

document.addEventListener('click', handleClick);


  let theVal = leftSeat.value
  const valLength = theVal.length;

  let matchingNames = [];
  // Loop through each student in the array
  studentArray.forEach(student => {
   // Check if the student's name starts with theVal
   if (student.name.startsWith(theVal)) {
  matchingNames.push(student);
       }
    });
    let iteration = 0;
    matchingNames.forEach(student => {   // for each matching name, create a div
      let newName = document.createElement("div")
      const boldPart = student.name.slice(0, valLength);
      const regularPart = student.name.slice(valLength);
      let boldPartSpan = document.createElement("b")
      let regularPartSpan = document.createElement("span")
      boldPartSpan.innerText = boldPart
      regularPartSpan.innerText = regularPart
      let genderImgForNewSuggestion = document.createElement("img")

      if(student.gender == "Male")
      {
        genderImgForNewSuggestion.src = "https://i.ibb.co/Q90kK4P/male-student.png"
        genderImgForNewSuggestion.className = "suggested-male"
        newName.className = "suggested-name-male"
      }
      else if(student.gender == "Female")
      {
        genderImgForNewSuggestion.src = "https://i.ibb.co/GFqPFqx/woman.png"
        genderImgForNewSuggestion.className = "suggested-female"
        newName.className = "suggested-name-female"
      }


      newName.addEventListener("click" , ()=>{    // onclick the div, insert name to textbox and delete suggestion list     
        leftSeat.value = student.name;
        newDivForLeftSeat.removeChild(suggestionDiv);
        document.removeEventListener('click', handleClick);
      })
      let newDiv = document.createElement("span")
      newDiv.className = "name-container"
      newDiv.appendChild(boldPartSpan)
      newDiv.appendChild(regularPartSpan)
      newName.appendChild(newDiv)
      newName.appendChild(genderImgForNewSuggestion)

      if(iteration == 0 && iteration == matchingNames.length - 1) {
        newName.style.borderRadius = "10px 10px 10px 10px"
      }
      else if (iteration == matchingNames.length - 1) {
        newName.style.borderRadius = "0px 0px 10px 10px"
      }
      else if (iteration == 0) {
        newName.style.borderRadius = "10px 10px 0px 0px"
      }
     suggestionDiv.appendChild(newName)
     iteration++;
    })

})
rightSeat.addEventListener("keyup" , function(event){
  let oldSuggested = document.querySelector(".suggestion-div-right");
  if(oldSuggested != null)
  {
    newDivForRightSeat.removeChild(oldSuggested);
  }


  let suggestionDiv = document.createElement("div")   // Creating a div for suggestions
  suggestionDiv.className = "suggestion-div-right"
  newDivForRightSeat.appendChild(suggestionDiv)

  if (event.key === "Escape" || rightSeat.value == "") {
    let deleteThisDiv = document.querySelector(".suggestion-div-right");
  if (deleteThisDiv != null) {
    newDivForRightSeat.removeChild(deleteThisDiv);
  }
   }

  function handleClick(event) {
if (event.target !== newDivForRightSeat && !newDivForRightSeat.contains(event.target)) {
  const deleteThisDiv = document.querySelector('.suggestion-div-right');
  if (deleteThisDiv) {
    newDivForRightSeat.removeChild(deleteThisDiv);
  }
}
}

document.addEventListener('click', handleClick);


  let theVal = rightSeat.value
  const valLength = theVal.length;

  let matchingNames = [];
  // Loop through each student in the array
  studentArray.forEach(student => {
   // Check if the student's name starts with theVal
   if (student.name.startsWith(theVal)) {
  matchingNames.push(student);
       }
    });
    let iteration = 0;
    matchingNames.forEach(student => {   // for each matching name, create a div
      let newName = document.createElement("div")
      const boldPart = student.name.slice(0, valLength);
      const regularPart = student.name.slice(valLength);
      let boldPartSpan = document.createElement("b")
      let regularPartSpan = document.createElement("span")
      boldPartSpan.innerText = boldPart
      regularPartSpan.innerText = regularPart
      let genderImgForNewSuggestion = document.createElement("img")

      if(student.gender == "Male")
      {
        genderImgForNewSuggestion.src = "https://i.ibb.co/Q90kK4P/male-student.png"
        genderImgForNewSuggestion.className = "suggested-male"
        newName.className = "suggested-name-male"
      }
      else if(student.gender == "Female")
      {
        genderImgForNewSuggestion.src = "https://i.ibb.co/GFqPFqx/woman.png"
        genderImgForNewSuggestion.className = "suggested-female"
        newName.className = "suggested-name-female"
      }


      newName.addEventListener("click" , ()=>{    // onclick the div, insert name to textbox and delete suggestion list     
        rightSeat.value = student.name;
        newDivForRightSeat.removeChild(suggestionDiv);
        document.removeEventListener('click', handleClick);
      })
      let newDiv = document.createElement("span")
      newDiv.className = "name-container"
      newDiv.appendChild(boldPartSpan)
      newDiv.appendChild(regularPartSpan)
      newName.appendChild(newDiv)
      newName.appendChild(genderImgForNewSuggestion)

      if(iteration == 0 && iteration == matchingNames.length - 1) {
        newName.style.borderRadius = "10px 10px 10px 10px"
      }
      else if (iteration == matchingNames.length - 1) {
        newName.style.borderRadius = "0px 0px 10px 10px"
      }
      else if (iteration == 0) {
        newName.style.borderRadius = "10px 10px 0px 0px"
      }
     suggestionDiv.appendChild(newName)
     iteration++;
    })

})


dragElement(newDiv2)
newDiv2.style.left = "42.5%"
newDiv2.style.top = "35%"
});

// Event listener to make the ClassRoom Div resizeable:


const resizeable = document.querySelector('.ClassRoomDiv');
const resizeHandle = document.querySelector('.resize-handle');
let isResizing = false;
let currentX;
let currentY;
let currentWidth;
let currentHeight;

resizeHandle.addEventListener('mousedown', function(e) {
  isResizing = true;
  currentX = e.clientX;
  currentY = e.clientY;
  currentWidth = resizeable.offsetWidth;
  currentHeight = resizeable.offsetHeight;
});

document.addEventListener('mouseup', function() {
  isResizing = false;
});

document.addEventListener('mousemove', function(e) {
  if (!isResizing) return;
  let newWidth = currentWidth + (e.clientX - currentX);
  let newHeight = currentHeight + (e.clientY - currentY);

  if (newWidth > window.innerWidth - 200) {
    newWidth = window.innerWidth - 200;
  }
  if (newHeight > window.innerHeight - 50) {
    newHeight = window.innerHeight - 50;
  }

  resizeable.style.width = newWidth + 'px';
  resizeable.style.height = newHeight + 'px';
});


// Event listener to make the Edit Container Div visible or hidden
const toggleButton = document.getElementById('toggle-button');
const toggleDiv = document.getElementById('editContainer');
toggleButton.addEventListener('click', () => {
  toggleDiv.classList.toggle('hidden');
  toggleButton.classList.toggle('sticky');
  theImg = document.getElementById('toggleimg')
  if(editBarOpened == true) {
    theImg.src = "https://i.ibb.co/JzphDDd/left-arrow-angle-big-gross-symbol.png"
    editBarOpened = false;
  } else {
    theImg.src = "https://i.ibb.co/wzdPY2B/right-arrow.png"
    editBarOpened = true;
  }
});

// Event listener to change Table size

let tableHeightNow = 9
let tableWidthNow = 16

let changeTableSizeButton = document.getElementById('changeTableSize')
changeTableSizeButton.addEventListener("click" , () => {
  let theHeight = document.getElementById('tableHeight').value
  let theWidth = document.getElementById('tableWidth').value
  tableHeightNow = theHeight;
  tableWidthNow = theWidth;
  
  if(theHeight > 100 || theHeight < 1 || theWidth > 100 || theWidth < 1)
  {
    alert('ערך הגובה והרוחב חייב להיות בין 1 ל100')
    return;
  }

  theHeight = theHeight + "%";
  theWidth = theWidth + "%";
  const root = document.documentElement;
  
root.style.setProperty('--table-width', theWidth);
root.style.setProperty('--table-height', theHeight);

})

// Event listeners to make Table Organize Buttons interactive

let threeLine = document.getElementById('threeLinePos')
let threeLineImg = document.getElementById('threeLineImg')
threeLine.addEventListener("mouseenter" , ()=>{
  threeLineImg.src="https://i.ibb.co/gWK3x5T/Group-13.png"
}) 
threeLine.addEventListener("mouseleave" , ()=>{
  threeLineImg.src="https://i.ibb.co/HPRGxrK/Group-13-1.png"
}) 

let fourLine = document.getElementById('fourLinePos')
let fourLineImg = document.getElementById('fourLineImg')
fourLine.addEventListener("mouseenter" , ()=>{
  fourLineImg.src="https://i.ibb.co/xMD9dwy/fourblack.png"
}) 
fourLine.addEventListener("mouseleave" , ()=>{
  fourLineImg.src="https://i.ibb.co/fp0xx2K/fourgrey.png"
}) 

let fiveLine = document.getElementById('fiveLinePos')
let fiveLineImg = document.getElementById('fiveLineImg')
fiveLine.addEventListener("mouseenter" , ()=>{
  fiveLineImg.src="https://i.ibb.co/MZKH6P0/fiveblack.png"
}) 
fiveLine.addEventListener("mouseleave" , ()=>{
  fiveLineImg.src="https://i.ibb.co/zrJsx0x/fivegrey.png"
}) 


// Event Listeners to make the 'Table Advanced Options' and the 'Add Students Bulk' Divs Expandable.
const expandableDiv = document.querySelector('.expandable');
const expandableHeader = expandableDiv.querySelector('.expandable-header');

expandableHeader.addEventListener('click', function() {
  expandableDiv.classList.toggle('open');
  if(expandOptionsOpened == false)
  {
    expandOptionsOpened = !expandOptionsOpened;
    expandableHeader.innerText = "הסתר אפשרויות מתקדמות -"
  }
  else {
    expandOptionsOpened = !expandOptionsOpened;
    expandableHeader.innerText = "הצג אפשרויות מתקדמות +"
  }
});

const expandableDiv2 = document.querySelector('.expandable2');
const expandableHeader2 = expandableDiv2.querySelector('.expandable-header2');

expandableHeader2.addEventListener('click', function() {
  expandableDiv2.classList.toggle('open');
  if(expandOptionsOpened2 == false)
  {
    expandOptionsOpened2 = !expandOptionsOpened2;
    expandableHeader2.innerText = "הוסף תלמידים בכמות -"
  }
  else {
    expandOptionsOpened2 = !expandOptionsOpened2;
    expandableHeader2.innerText = "הוסף תלמידים בכמות +"
  }
});

// Event listener to make the Teacher Table on/off toggle interactive
let teacherTableSliderParent = document.getElementById('teacherTableSlider')
let teacherTableSliderChild = document.getElementById('teacherTableCircle')
let teacherTableVisible = true;

teacherTableSliderChild.addEventListener('click', () => {
  if (teacherTableVisible == true)
  {
    teacherTableVisible = !teacherTableVisible;
    teacherTableSliderParent.style.backgroundColor = '#ccc';
  teacherTableSliderChild.style.left = '2.5%';
  teacherTable.style.display = "none"
  }
  else {
    teacherTableVisible = !teacherTableVisible;
    teacherTableSliderParent.style.backgroundColor = '#2196F3';
  teacherTableSliderChild.style.left = '47.5%';
  teacherTable.style.display = "block"
  }
});

