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

//function that will add a new department to the database
function newDept() {
  inquirer.prompt([{ type: "input", name: "newDeptname", message: "Please enter name of Department you wish to create"}, 
])

  .then(response => {

    let query = "INSERT INTO department (name) VALUES (?)";
    connection.query(query, {response: response.newDeptname }, function(err, res) {
      if(err) throw err;
      console.log("New Department added to System");
      //executes query to show the updated list of departments
      deptList();
//executes function to show the main menu 
      mainMenu();
    });
  });
};

function newRole() {

  inquirer.prompt([{ type: "input", name: "newRolename", message: "Please enter name of employee role you wish to create"},
  { type: "input", name: "newRolesalary", message: "Please enter the new role's salary"},
  { type: "list", name: "newDepartment", message: "Please choose the department associated with the role", choices: ["this is where we need to pull the list of the depts"]}])

  .then(response => {

    let query = "INSERT INTO role (name, title, salary, department_id VALUES (?, ?, ?, ?)";
    connection.query(query, [response.newRolename, response.newRolesalary, ], function(err, res) {
      if(err) throw err;
      console.log("New Department added to System");
      //executes query to show the updated list of departments
      deptList();
//executes function to show the main menu 
      mainMenu();
    });
  });


};
//function to pull a table listing all of the departments currently in database
function deptList() {
  connection.query("SELECT name FROM department", function(err, res) {
    if(err) throw err;
    console.table(res);
    mainMenu();
  });
  
  };


function updateRoles() {


};

function viewStaff() {


};

function newEmployee() {


};

function exit(){


};



