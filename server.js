var mysql = require("mysql2");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "top_songsDB"
});

connection.connect(function (err) {
  if (err) throw err;
  mainMenu();
});
//function for the main menu 
function mainMenu() {



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


}




} 