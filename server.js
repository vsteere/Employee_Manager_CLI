var mysql = require("mysql2");
var inquirer = require("inquirer");

//setting up connection to mySQL
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "",
  database: "PositionControl_db"
});
//call the main menu function on load
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});
//function for the main menu 
function mainMenu() {

//main menu choices
  inquirer.prompt([
    { type: "list", name: "mainChoices", message: "Please Select Action", choices: ["Add a new Department", "Add a new Role", "Add a new Employee", "View a listing of Departments", "Update Employee Roles", "View Staff", "Exit"] }

  ])


    .then(response => {

      //switch statement that will call a function depending on which option a user selects
      switch (response.mainChoices) {
        case "Add a new Department":
          newDept()
          break

        case "Add a New Role":
          newRole()
          break

        case "View a listing of Departments":
          deptList()
          break

        case "Update Employee Roles":
          updateRoles()
          break

        case "View Staff":
          viewStaff()
          break

        case "Add a new Employee":
          newEmployee()
          break

        //this is the ending option that will quit the application
        default: exit()

      }

    })
};

//function that will generate a table of all departments in the database
function newDept() {
connection.query("SELECT name FROM department", function(err, res) {
  if(err) throw err;
  console.table(res);
  mainMenu();
});

};

function newRole() {


};

function deptList() {


};

function updateRoles() {


};

function viewStaff() {


};

function newEmployee() {


};

function exit(){


};

//starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

