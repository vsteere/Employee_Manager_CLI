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
    { type: "list", name: "mainChoices", message: "Please Select Action", choices: ["Add a new Department", "Add a New Role", "Add a new Employee", "View a listing of Departments", "View Employee Roles", "Update Employee Roles", "View Staff", "View Managers", "Delete a Department", "Exit"] }

  ])


    .then(response => {

      //switch statement that will call a function depending on which option a user selects
      switch (response.mainChoices) {
        case "View Employee Roles":
          viewRoles()
          break

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

        case "View Managers":
          viewManagers()
          break

        case "Delete a Department":
          deleteDept()
          break

        //this is the ending option that will quit the application
        default: connection.end();

      }

    })
};

//function that will add a new department to the database. WORKS
function newDept() {
  inquirer.prompt([{ type: "input", name: "newDeptname", message: "Please enter name of Department you wish to create" },
  ])
    .then(response => {
      //learned the SET query from tutor
      let query = "INSERT INTO department SET ?";
      connection.query(query, { name: response.newDeptname }, function (err, res) {
        if (err) throw err;
        console.log(response);
        console.log("New Department added to System");
        //executes query to show the updated list of departments
        deptList();

        //ends the connection
        connection.end();
      });
    });
};

//function to pull a table listing all of the departments currently in database. WORKS
function deptList() {
  connection.query("SELECT id AS 'Department ID', name AS 'Department Name' FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });

};

//function to update the role of an existing employee
function updateRoles() {
  inquirer.prompt([
    { type: "input", name: "empID", message: "Please enter the employee ID whose role you wish to change; reference employee report" },
    { type: "input", name: "emprole", message: "Please enter the new role ID; reference role report" }
  ])

    .then(response => {
      let query = "UPDATE employee SET role_id = ? WHERE id = ?";
      let updateData = [response.empID, response.emprole];
      let updateDataInt = updateData.map(Number);
      console.log(updateData);
      connection.query(query, updateData, function (err, res) {
        if (err) throw err;
        console.log("Role Updated");
        viewStaff();
        connection.end();

      })

    }


    )


};
//function to view staff, departments, their salaries and roles WORKS
function viewStaff() {

  connection.query("SELECT employee.id AS 'Employee ID', employee.first_name AS 'first name', employee.last_name AS 'last name', role.title AS 'position title', role.salary AS 'salary', department.name AS 'Department' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();


  })

};

//function to add a new employee to system WORKS
function newEmployee() {

  //collect data for the new empoloyee
  inquirer.prompt([
    { type: "input", name: "newempfname", message: "Please enter new employee's first name" },
    { type: "input", name: "newemplname", message: "Please enter new employee's last name" },
    { type: "input", name: "newemprole", message: "Please choose the new employee's role ID; use role ID from roe report" },
    { type: "input", name: "newempmgr", message: "Please choose the new employee's manager ID; use manager ID from manager report" }
  ])
    //pushes data to the database
    .then(response => {
      let query = "INSERT INTO employee SET ?";
      let newEmployee = { first_name: response.newempfname, last_name: response.newemplname, role_id: response.newemprole, manager_id: response.newempmgr }
      connection.query(query, newEmployee, function (err, res) {
        if (err) throw err;
        console.log("New Employee Added to System");
        viewStaff();
        connection.end();


      })


    })


}

//function to create a new role in the database WORKS
function newRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    let departments = [];
    //this converts an array of strings to INT, since the SQL data type is int for both of these columns. Source: https://stackoverflow.com/questions/4437916/how-to-convert-all-elements-in-an-array-to-integer-in-javascript
    departments = res.map(dept => ({ id: dept.id, name: dept.name }));

    inquirer.prompt([{ type: "input", name: "newRolename", message: "Please enter name of employee role you wish to create" },
    { type: "input", name: "newRolesalary", message: "Please enter the new role's salary" },
    { type: "list", name: "newDepartment", message: "Please choose the department associated with the role", choices: departments.map(dept => ({ value: dept.id, name: dept.name })) }])

      .then(response => {

        let query = "INSERT INTO role SET ?";
        let newRole = { title: response.newRolename, salary: response.newRolesalary, department_id: response.newDepartment }
        connection.query(query, newRole, function (err, res) {
          if (err) throw err;
          console.log("New Role added to System");
          //executes query to show the updated list of roles
          viewRoles();

          connection.end();
        });
      });
  });
}
//function to show all roles currently in database. Uses a join to combine data from the department table so the item shown is the actual department and not the department ID. WORKS
function viewRoles() {
  connection.query("SELECT role.id AS 'Role ID', title as TITLE, salary as SALARY, name as DEPARTMENT_NAME FROM role LEFT JOIN department ON role.department_id = department.id", function (err, res) {
    if (err) throw err;
    // console.table(res, [role.id, "TITLE", "SALARY", "DEPARTMENT_NAME"]);
    console.table(res);
    connection.end();



  });

}

function viewManagers() {
  connection.query("SELECT id AS 'MANAGER ID', first_name AS 'FIRST NAME', last_name AS 'LAST NAME' from EMPLOYEE WHERE manager_id IS NULL", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();

  })
};
//function to delete a department WORKS  
function deleteDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    //tutor showed this approach to create an array for selection later in inquirer
    let departments = [];
    departments = res.map(dept => ({ id: dept.id, name: dept.name }));

    inquirer.prompt([
      { type: "list", name: "deleteDepart", message: "Please choose a department to delete", choices: departments.map(dept => ({ value: dept.id, name: dept.name })) }])

      .then(response => {

        let query = "DELETE FROM department WHERE id = ?";
        let delDepartment = response.deleteDepart;
        connection.query(query, delDepartment, function (err, res) {
          if (err) throw err;
          console.log("Department Deleted");
          //executes query to show the updated list of departments
          deptList();

          connection.end();
        });
      });
  });


}




