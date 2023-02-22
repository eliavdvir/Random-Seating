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

function randomize()
{
  var textboxID = []
  let x = 1
  for(let i=0; i<tableArray.length; i++)
  {  
    let leftSeater = "leftSeatTable" + x
    let rightSeater = "rightSeatTable" + x
    textboxID.push(leftSeater)
    textboxID.push(rightSeater)
    x++
  }
  const studentsOutside = document.querySelector('.students-outside');

if (studentsOutside) {
  studentsOutside.parentNode.removeChild(studentsOutside);
}
  newRandom(studentArray, textboxID, lockedTextboxes)
  //assignStudentToTextbox(studentArray, textboxID, lockedTextboxes)
}

function newRandom(studentNames, textboxIds, lockedTextboxIds)
  {
  
    // Create arrays for locked Students:
    let lockedMaleNearMale = []
    let lockedMaleNearFemale = []
    let lockedFemaleNearFemale = []
    let lockedFemaleNearMale = []
    let allLockedStudents = []

    // Get available text boxes (textboxes which arent locked):
    let availableTextboxIds = textboxIds.filter(function(id) {
    return !lockedTextboxIds.includes(id);
  });

  // Clear value of unlocked textboxes:
  for (let i=0; i<availableTextboxIds.length; i++)
  {
    let currentID = availableTextboxIds[i]
    document.getElementById(currentID).value = ""
  }

    // Go thru locked textboxes, and get the students from them into matching Arrays:
    for (let i = 0; i<lockedTextboxIds.length; i++)
    {
      let name = document.getElementById(lockedTextboxIds[i]).value
      if(name.length > 0)
      {
        let student = studentArray.find(student => student.name == name);
        if (typeof student !== 'undefined')
        {
          allLockedStudents.push(student)
          if (student.gender == 'Male' && student.sitNear == 'Male')
          {
            lockedMaleNearMale.push(student)
          }
          else if (student.gender == 'Male' && student.sitNear == 'Female')
          {
            lockedMaleNearFemale.push(student)
          }
          else if (student.gender == 'Female' && student.sitNear == 'Male')
          {
            lockedFemaleNearMale.push(student)
          }
          else if (student.gender == 'Female' && student.sitNear == 'Female')
          {
            lockedFemaleNearFemale.push(student)
          }
        }
      }
    }

    // Create arrays for available Students:
    let availableMaleNearAnyone = []
    let availableMaleNearMale = []
    let availableMaleNearFemale = []
    let availableFemaleNearAnyone = []
    let availableFemaleNearFemale = []
    let availableFemaleNearMale = []

    // Go thru Student array, and put students in matching arrays:
    let availableStudents = studentNames.filter(name => !allLockedStudents.find(lockedName => lockedName.name === name.name));
    for(let i=0; i<availableStudents.length; i++)
    {
      if (availableStudents[i].gender == 'Male' && availableStudents[i].sitNear == 'Anyone')
      {
        availableMaleNearAnyone.push(availableStudents[i])
      }
      else if (availableStudents[i].gender == 'Male' && availableStudents[i].sitNear == 'Male')
      {
        availableMaleNearMale.push(availableStudents[i])
      }
      else if (availableStudents[i].gender == 'Male' && availableStudents[i].sitNear == 'Female')
      {
        availableMaleNearFemale.push(availableStudents[i])
      }
      else if (availableStudents[i].gender == 'Female' && availableStudents[i].sitNear == 'Anyone')
      {
        availableFemaleNearAnyone.push(availableStudents[i])
      }
      else if (availableStudents[i].gender == 'Female' && availableStudents[i].sitNear == 'Female')
      {
        availableFemaleNearFemale.push(availableStudents[i])
      }
      else if (availableStudents[i].gender == 'Female' && availableStudents[i].sitNear == 'Male')
      {
        availableFemaleNearMale.push(availableStudents[i])
      }
    }

    // Check if locked Arrays empty and Seat Student if needed to:
    if (lockedMaleNearMale.length > 0)
    {
      lockedMaleNearMale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize

      for (let i=0; i<lockedMaleNearMale.length; i++)
      {
        for (let j=0; j<lockedTextboxIds.length; j++)
        {
          let theName = document.getElementById(lockedTextboxIds[j]).value 
          if (theName == lockedMaleNearMale[i].name)  // check if textbox's value == name we currently on
          {            
              if (lockedTextboxIds[j].charAt(0) == "l") // Check if Left Seat
            {
              // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableMaleNearMale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearMale.length);
                  let randomName = availableMaleNearMale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearMale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableMaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearAnyone.length);
                  let randomName = availableMaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            }
            else if (lockedTextboxIds[j].charAt(0) == "r") // Check if Right Seat
            {
              // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableMaleNearMale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearMale.length);
                  let randomName = availableMaleNearMale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearMale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableMaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearAnyone.length);
                  let randomName = availableMaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            } 
          
        }
      }
    }

  } 
  if (lockedMaleNearFemale.length > 0)
    {
      lockedMaleNearFemale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize

      for (let i=0; i<lockedMaleNearFemale.length; i++)
      {
        for (let j=0; j<lockedTextboxIds.length; j++)
        {
          let theName = document.getElementById(lockedTextboxIds[j]).value 
          if (theName == lockedMaleNearFemale[i].name)  // check if textbox's value == name we currently on
          {            
              if (lockedTextboxIds[j].charAt(0) == "l") // Check if Left Seat
            {
              // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableFemaleNearMale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearMale.length);
                  let randomName = availableFemaleNearMale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearMale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableFemaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearAnyone.length);
                  let randomName = availableFemaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            }
            else if (lockedTextboxIds[j].charAt(0) == "r") // Check if Right Seat
            {
              // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableFemaleNearMale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearMale.length);
                  let randomName = availableFemaleNearMale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearMale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableFemaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearAnyone.length);
                  let randomName = availableFemaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            } 
          
        }
      }
    }

  } 
  if (lockedFemaleNearFemale.length > 0)
    {
      lockedFemaleNearFemale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize

      for (let i=0; i<lockedFemaleNearFemale.length; i++)
      {
        for (let j=0; j<lockedTextboxIds.length; j++)
        {
          let theName = document.getElementById(lockedTextboxIds[j]).value 
          if (theName == lockedFemaleNearFemale[i].name)  // check if textbox's value == name we currently on
          {            
              if (lockedTextboxIds[j].charAt(0) == "l") // Check if Left Seat
            {
              // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableFemaleNearFemale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearFemale.length);
                  let randomName = availableFemaleNearFemale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearFemale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableFemaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearAnyone.length);
                  let randomName = availableFemaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            }
            else if (lockedTextboxIds[j].charAt(0) == "r") // Check if Right Seat
            {
              // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableFemaleNearFemale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearFemale.length);
                  let randomName = availableFemaleNearFemale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearFemale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableFemaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableFemaleNearAnyone.length);
                  let randomName = availableFemaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableFemaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            } 
          
        }
      }
    }

  } 
  if (lockedFemaleNearMale.length > 0)
    {
      lockedFemaleNearMale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize

      for (let i=0; i<lockedFemaleNearMale.length; i++)
      {
        for (let j=0; j<lockedTextboxIds.length; j++)
        {
          let theName = document.getElementById(lockedTextboxIds[j]).value 
          if (theName == lockedFemaleNearMale[i].name)  // check if textbox's value == name we currently on
          {            
              if (lockedTextboxIds[j].charAt(0) == "l") // Check if Left Seat
            {
              // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableMaleNearFemale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearFemale.length);
                  let randomName = availableMaleNearFemale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearFemale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableMaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearAnyone.length);
                  let randomName = availableMaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            }
            else if (lockedTextboxIds[j].charAt(0) == "r") // Check if Right Seat
            {
              // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[j].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum
              if (!lockedTextboxIds.includes(otherTextBoxId))
              {
                if (availableMaleNearFemale.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearFemale.length);
                  let randomName = availableMaleNearFemale[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearFemale.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else if (availableMaleNearAnyone.length > 0)
                {
                  let randomIndex = Math.floor(Math.random() * availableMaleNearAnyone.length);
                  let randomName = availableMaleNearAnyone[randomIndex].name;
                  document.getElementById(otherTextBoxId).value = randomName;
                  let index = availableTextboxIds.indexOf(otherTextBoxId);
                  availableMaleNearAnyone.splice(randomIndex, 1);
                  availableTextboxIds.splice(index, 1);
                }
                else
                {
                  // PUT ERROR MESSAGE FOR USER
                }
              }
            } 
          
        }
      }
    }

  } 

  // Randomly seat Students that have gender req
  if (availableMaleNearMale.length > 0)
  {
    let availableSeatsNearLockedMale = []
    let emptyTablesForMales = []

    // Check if there are empty Seats near a locked Male who can sit next to anyone
    for (let i=0; i<lockedTextboxIds.length; i++)
    {

      if (lockedTextboxIds[i].charAt(0) == "l") // Check if Left Seat
      {
        // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum // get right seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student !== undefined)
          {
            if (student.gender == 'Male' && student.sitNear == 'Anyone')
          {
            availableSeatsNearLockedMale.push(otherTextBoxId)
          }

          }

        }
      }
      else if (lockedTextboxIds[i].charAt(0) == "r") // Check if Right Seat
      {
        // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum // get left seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student.gender == 'Male' && student.sitNear == 'Anyone')
          {
            availableSeatsNearLockedMale.push(otherTextBoxId)
          }

        }
      }
    }

    // if there are Empty tables push them into array:
    for (let i = 0; i < availableTextboxIds.length; i++) {
    let currentTextbox = availableTextboxIds[i];
    if (currentTextbox.charAt(0) == "l")
    {
      let idNumPre = currentTextbox.match(/\d+/g);  // Get id of other Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
      if(availableTextboxIds.includes(otherTextBoxId))
      {
        emptyTablesForMales.push(currentTextbox);
        i++
      }
    }
}

  // Loop to Seat the Students:
    availableMaleNearMale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize
    for (let i=0; i<availableMaleNearMale.length; i++)
    {
      // first we seat next to locked textboxes that are relevant:
      if (availableSeatsNearLockedMale.length > 0)
      {
        let randomIndex = Math.floor(Math.random() * availableSeatsNearLockedMale.length);
        document.getElementById(availableSeatsNearLockedMale[randomIndex]).value = availableMaleNearMale[i].name;
        let index = availableTextboxIds.indexOf(availableSeatsNearLockedMale[randomIndex]);
        availableSeatsNearLockedMale.splice(randomIndex, 1);  // remove the Seat from array
        availableTextboxIds.splice(index, 1); // remove the Seat from available textbox array
      }
      // next, we Seat them in Tables that are Empty:
      else if (emptyTablesForMales.length > 0)
      {
        let x = i + 1 // 'x' will be used to access the next student in the array, since we Seat 2 students in the Table. 
        if (availableMaleNearMale.length > x) // if there's more than 2 Students in this array, we can Seat both of them together.
        {
          let randomIndex = Math.floor(Math.random() * emptyTablesForMales.length); // Get random empty leftSeat id
          document.getElementById(emptyTablesForMales[randomIndex]).value = availableMaleNearMale[i].name // Seat student in the leftSeat
          let idNumPre = emptyTablesForMales[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableMaleNearMale[x].name // Seat next student from array in the rightSeat
          let index = availableTextboxIds.indexOf(emptyTablesForMales[randomIndex]);
          emptyTablesForMales.splice(randomIndex, 1); // Remove table from availables
          availableTextboxIds.splice(index, 2); // Remove both left&right Seats from availables
          i++;
        }
        else if (availableMaleNearAnyone.length > 0)
        {
          let randomIndex = Math.floor(Math.random() * emptyTablesForMales.length);
          document.getElementById(emptyTablesForMales[randomIndex]).value = availableMaleNearMale[i].name
          let randomIndex2 = Math.floor(Math.random() * availableMaleNearAnyone.length);
          let idNumPre = emptyTablesForMales[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableMaleNearAnyone[randomIndex2].name
          let index = availableTextboxIds.indexOf(emptyTablesForMales[randomIndex]);
          availableMaleNearAnyone.splice(randomIndex2, 1);
          emptyTablesForMales.splice(randomIndex, 1);
          availableTextboxIds.splice(index, 2);
        }
        else {
          callErrorStudent(availableMaleNearMale[i].name)
        }
      }
      else
      {
        callErrorStudent(availableMaleNearMale[i].name)
      }
    }
  }
  if (availableFemaleNearFemale.length > 0)
  {
    let availableSeatsNearLockedFemale = []
    let emptyTablesForFemales = []

    // Check if there are empty Seats near a locked Male who can sit next to anyone
    for (let i=0; i<lockedTextboxIds.length; i++)
    {

      if (lockedTextboxIds[i].charAt(0) == "l") // Check if Left Seat
      {
        // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum // get right seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student !== undefined)
          {
            if (student.gender == 'Female' && student.sitNear == 'Anyone')
          {
            availableSeatsNearLockedFemale.push(otherTextBoxId)
          }

          }

        }
      }
      else if (lockedTextboxIds[i].charAt(0) == "r") // Check if Right Seat
      {
        // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum // get left seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student.gender == 'Female' && student.sitNear == 'Anyone')
          {
            availableSeatsNearLockedFemale.push(otherTextBoxId)
          }

        }
      }
    }

    // if there are Empty tables push them into array:
    for (let i = 0; i < availableTextboxIds.length; i++) {
    let currentTextbox = availableTextboxIds[i];
    if (currentTextbox.charAt(0) == "l")
    {
      let idNumPre = currentTextbox.match(/\d+/g);  // Get id of other Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
      if(availableTextboxIds.includes(otherTextBoxId))
      {
        emptyTablesForFemales.push(currentTextbox);
        i++
      }
    }
}

  // Loop to Seat the Students:
    availableFemaleNearFemale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize
    for (let i=0; i<availableFemaleNearFemale.length; i++)
    {
      // first we seat next to locked textboxes that are relevant:
      if (availableSeatsNearLockedFemale.length > 0)
      {
        let randomIndex = Math.floor(Math.random() * availableSeatsNearLockedFemale.length);
        document.getElementById(availableSeatsNearLockedFemale[randomIndex]).value = availableFemaleNearFemale[i].name;
        let index = availableTextboxIds.indexOf(availableSeatsNearLockedFemale[randomIndex]);
        availableSeatsNearLockedFemale.splice(randomIndex, 1);  // remove the Seat from array
        availableTextboxIds.splice(index, 1); // remove the Seat from available textbox array
      }
      // next, we Seat them in Tables that are Empty:
      else if (emptyTablesForFemales.length > 0)
      {
        let x = i + 1 // 'x' will be used to access the next student in the array, since we Seat 2 students in the Table. 
        if (availableFemaleNearFemale.length > x) // if there's more than 2 Students in this array, we can Seat both of them together.
        {
          let randomIndex = Math.floor(Math.random() * emptyTablesForFemales.length); // Get random empty leftSeat id
          document.getElementById(emptyTablesForFemales[randomIndex]).value = availableFemaleNearFemale[i].name // Seat student in the leftSeat
          let idNumPre = emptyTablesForFemales[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableFemaleNearFemale[x].name // Seat next student from array in the rightSeat
          let index = availableTextboxIds.indexOf(emptyTablesForFemales[randomIndex]);
          emptyTablesForFemales.splice(randomIndex, 1); // Remove table from availables
          availableTextboxIds.splice(index, 2); // Remove both left&right Seats from availables
          i++;
        }
        else if (availableFemaleNearAnyone.length > 0)
        {
          let randomIndex = Math.floor(Math.random() * emptyTablesForFemales.length);
          document.getElementById(emptyTablesForFemales[randomIndex]).value = availableFemaleNearFemale[i].name
          let randomIndex2 = Math.floor(Math.random() * availableFemaleNearAnyone.length);
          let idNumPre = emptyTablesForFemales[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableFemaleNearAnyone[randomIndex2].name
          let index = availableTextboxIds.indexOf(emptyTablesForFemales[randomIndex]);
          availableFemaleNearAnyone.splice(randomIndex2, 1);
          emptyTablesForFemales.splice(randomIndex, 1);
          availableTextboxIds.splice(index, 2);

        }
        else {
          callErrorStudent(availableFemaleNearFemale[i].name)
        }
      }
      else
      {
        callErrorStudent(availableFemaleNearFemale[i].name)
      }
    }
  }

  if (availableMaleNearFemale.length > 0)
  {
    let availableSeatsNearLockedFemale2 = []
    let emptyTablesForMales2 = []

    // Check if there are empty Seats near a locked Feale who can sit next to anyone
    for (let i=0; i<lockedTextboxIds.length; i++)
    {

      if (lockedTextboxIds[i].charAt(0) == "l") // Check if Left Seat
      {
        // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum // get right seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student !== undefined)
          {
            if (student.gender == 'Female' && student.sitNear == 'Anyone' || student.gender == 'Female' && student.sitNear == 'Male')
          {
            availableSeatsNearLockedFemale2.push(otherTextBoxId)
          }

          }

        }
      }
      else if (lockedTextboxIds[i].charAt(0) == "r") // Check if Right Seat
      {
        // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum // get left seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student.gender == 'Female' && student.sitNear == 'Anyone')
          {
            availableSeatsNearLockedFemale2.push(otherTextBoxId)
          }

        }
      }
    }

    // if there are Empty tables push them into array:
    for (let i = 0; i < availableTextboxIds.length; i++) {
    let currentTextbox = availableTextboxIds[i];
    if (currentTextbox.charAt(0) == "l")
    {
      let idNumPre = currentTextbox.match(/\d+/g);  // Get id of other Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
      if(availableTextboxIds.includes(otherTextBoxId))
      {
        emptyTablesForMales2.push(currentTextbox);
        i++
      }
    }
}


  // Loop to Seat the Students:
    availableMaleNearFemale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize
    for (let i=0; i<availableMaleNearFemale.length; i++)
    {
      // first we seat next to locked textboxes that are relevant:
      if (availableSeatsNearLockedFemale2.length > 0)
      {
        let randomIndex = Math.floor(Math.random() * availableSeatsNearLockedFemale2.length);
        document.getElementById(availableSeatsNearLockedFemale2[randomIndex]).value = availableMaleNearFemale[i].name;
        let index = availableTextboxIds.indexOf(availableSeatsNearLockedFemale2[randomIndex]);
        availableSeatsNearLockedFemale2.splice(randomIndex, 1);  // remove the Seat from array
        availableTextboxIds.splice(index, 1); // remove the Seat from available textbox array
      }
      // next, we Seat them in Tables that are Empty:
      else if (emptyTablesForMales2.length > 0)
      {
        if (availableFemaleNearAnyone.length > 0)
        {
          let randomIndex = Math.floor(Math.random() * emptyTablesForMales2.length);
          document.getElementById(emptyTablesForMales2[randomIndex]).value = availableMaleNearFemale[i].name
          let randomIndex2 = Math.floor(Math.random() * availableFemaleNearAnyone.length);
          let idNumPre = emptyTablesForMales2[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableFemaleNearAnyone[randomIndex2].name
          let index = availableTextboxIds.indexOf(emptyTablesForMales2[randomIndex]);
          availableFemaleNearAnyone.splice(randomIndex2, 1);
          emptyTablesForMales2.splice(randomIndex, 1);
          availableTextboxIds.splice(index, 2);
        }
        else if (availableFemaleNearMale.length > 0) {
          let randomIndex = Math.floor(Math.random() * emptyTablesForMales2.length);
          document.getElementById(emptyTablesForMales2[randomIndex]).value = availableMaleNearFemale[i].name
          let randomIndex2 = Math.floor(Math.random() * availableFemaleNearMale.length);
          let idNumPre = emptyTablesForMales2[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableFemaleNearMale[randomIndex2].name
          let index = availableTextboxIds.indexOf(emptyTablesForMales2[randomIndex]);
          availableFemaleNearMale.splice(randomIndex2, 1);
          emptyTablesForMales2.splice(randomIndex, 1);
          availableTextboxIds.splice(index, 2);
        }
        else {
          callErrorStudent(availableMaleNearFemale[i].name)
        }
      }
      else
      {
      callErrorStudent(availableMaleNearFemale[i].name)
      }
    }
  }
  if (availableFemaleNearMale.length > 0)
  {
    let availableSeatsNearLockedMale2 = []
    let emptyTablesForFemales2 = []

    // Check if there are empty Seats near a locked Feale who can sit next to anyone
    for (let i=0; i<lockedTextboxIds.length; i++)
    {

      if (lockedTextboxIds[i].charAt(0) == "l") // Check if Left Seat
      {
        // Check if Right Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'rightSeatTable' + idNum // get right seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student !== undefined)
          {
            if (student.gender == 'Male' && student.sitNear == 'Anyone')
          {
            availableSeatsNearLockedMale2.push(otherTextBoxId)
          }

          }

        }
      }
      else if (lockedTextboxIds[i].charAt(0) == "r") // Check if Right Seat
      {
        // Check if Left Seat is locked or no:
        let idNumPre = lockedTextboxIds[i].match(/\d+/g);
        let idNum = parseInt(idNumPre)
        let otherTextBoxId = 'leftSeatTable' + idNum // get left seat id
        if (!lockedTextboxIds.includes(otherTextBoxId)) // if not locked, check locked student's requirments
        {
          let theName = document.getElementById(lockedTextboxIds[i]).value
          let student = studentNames.find(s => s.name == theName);
          if (student.gender == 'Male' && student.sitNear == 'Anyone' || student.gender == 'Male' && student.sitNear == 'Female' )
          {
            availableSeatsNearLockedMale2.push(otherTextBoxId)
          }

        }
      }
    }

    // if there are Empty tables push them into array:
    for (let i = 0; i < availableTextboxIds.length; i++) {
    let currentTextbox = availableTextboxIds[i];
    if (currentTextbox.charAt(0) == "l")
    {
      let idNumPre = currentTextbox.match(/\d+/g);  // Get id of other Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
      if(availableTextboxIds.includes(otherTextBoxId))
      {
        emptyTablesForFemales2.push(currentTextbox);
        i++
      }
    }
}

  // Loop to Seat the Students:
    availableFemaleNearMale.sort(() => Math.random() - 0.5); // Shuffle the array so results are not same as the last randomize
    for (let i=0; i<availableFemaleNearMale.length; i++)
    {
      // first we seat next to locked textboxes that are relevant:
      if (availableSeatsNearLockedMale2.length > 0)
      {
        let randomIndex = Math.floor(Math.random() * availableSeatsNearLockedMale2.length);
        document.getElementById(availableSeatsNearLockedMale2[randomIndex]).value = availableFemaleNearMale[i].name;
        let index = availableTextboxIds.indexOf(availableSeatsNearLockedMale2[randomIndex]);
        availableSeatsNearLockedMale2.splice(randomIndex, 1);  // remove the Seat from array
        availableTextboxIds.splice(index, 1); // remove the Seat from available textbox array
      }
      // next, we Seat them in Tables that are Empty:
      else if (emptyTablesForFemales2.length > 0)
      {
        if (availableMaleNearAnyone.length > 0)
        {
          let randomIndex = Math.floor(Math.random() * emptyTablesForFemales2.length);
          document.getElementById(emptyTablesForFemales2[randomIndex]).value = availableFemaleNearMale[i].name
          let randomIndex2 = Math.floor(Math.random() * availableMaleNearAnyone.length);
          let idNumPre = emptyTablesForFemales2[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableMaleNearAnyone[randomIndex2].name
          let index = availableTextboxIds.indexOf(emptyTablesForFemales2[randomIndex]);
          availableMaleNearAnyone.splice(randomIndex2, 1);
          emptyTablesForFemales2.splice(randomIndex, 1);
          availableTextboxIds.splice(index, 2);
        } else if (availableMaleNearFemale.length > 0) {
          let randomIndex = Math.floor(Math.random() * emptyTablesForFemales2.length);
          document.getElementById(emptyTablesForFemales2[randomIndex]).value = availableFemaleNearMale[i].name
          let randomIndex2 = Math.floor(Math.random() * availableMaleNearFemale.length);
          let idNumPre = emptyTablesForFemales2[randomIndex].match(/\d+/g);  // Get id of Right Seat
          let idNum = parseInt(idNumPre)
          let otherTextBoxId = 'rightSeatTable' + idNum
          document.getElementById(otherTextBoxId).value = availableMaleNearFemale[randomIndex2].name
          let index = availableTextboxIds.indexOf(emptyTablesForFemales2[randomIndex]);
          availableMaleNearFemale.splice(randomIndex2, 1);
          emptyTablesForFemales2.splice(randomIndex, 1);
          availableTextboxIds.splice(index, 2);
        }  else {
          callErrorStudent(availableFemaleNearMale[i].name)
        }
      }
      else
      {
        callErrorStudent(availableFemaleNearMale[i].name)
      }
    }
  }

  let availableNearAnyone = [...availableMaleNearAnyone, ...availableFemaleNearAnyone]; // connect the arrays
  if (availableNearAnyone.length > 0)
  {
    availableNearAnyone.sort(() => Math.random() - 0.5);
    for (let i = 0; i< availableNearAnyone.length; i++)
    {
      let randomIndex = Math.floor(Math.random() * availableTextboxIds.length);
      if(availableTextboxIds.length > 0) {
        document.getElementById(availableTextboxIds[randomIndex]).value = availableNearAnyone[i].name
    availableTextboxIds.splice(randomIndex, 1);
      }
    }

  }
}


// Function to add Student name to a Div if wasnt placed after Randomize function
function callErrorStudent(errorStudentName) {
  
  let leftOverStudentDiv = document.querySelector('.students-outside');
        if (leftOverStudentDiv == null) {
          leftOverStudentDiv = document.createElement("div")
          leftOverStudentDiv.className = "students-outside"
          leftOverStudentDiv.innerText = "התלמידים הבאים לא קיבלו כיסא בגלל דרישות מיוחדות בסידור הישיבה - יש להכניס אותם ידנית או לשנות את הדרישות:"
          let leftOverStudentXbutton = document.createElement("p")
          leftOverStudentXbutton.className = "x-button-leftover"
          leftOverStudentXbutton.innerText = "X"
          leftOverStudentDiv.appendChild(leftOverStudentXbutton)

          leftOverStudentXbutton.addEventListener("click" , ()=>{
            const studentsOutside = document.querySelector('.students-outside');

            if (studentsOutside) {
             studentsOutside.parentNode.removeChild(studentsOutside);
            }
          })

          document.body.appendChild(leftOverStudentDiv)
        }
        let studentSpan = document.createElement("span")
        const hasSpans = leftOverStudentDiv.querySelector('span') !== null;

        if (hasSpans) {
         studentSpan.innerText = ", " + errorStudentName
         leftOverStudentDiv.appendChild(studentSpan)
         } else {
          let br = document.createElement("br")
          leftOverStudentDiv.appendChild(br)
          studentSpan.innerText = " " + errorStudentName
          leftOverStudentDiv.appendChild(studentSpan)
        }
}
