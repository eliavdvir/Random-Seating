class Table
{
  constructor()
  {
    this.leftSeatOccupied = false;
    this.rightSeatOccupied = false;
  }
}

class Student
{
  constructor()
  {
    this.id = Math.random().toString(36).substr(2, 9); // generate a unique ID
    this.name = "";
    this.gender = "";
    this.sitNear = "";    }
}