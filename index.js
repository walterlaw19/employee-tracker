const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const db = require('./db/connection')




function init() {

    // Choose what to do
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit Database']
        }
    ]).then(selectedAnswer => {
        // console.log(selectedAnswer);
        if (selectedAnswer.menu === 'View All Departments') {
            viewAllDepartments();
        }
        if (selectedAnswer.menu === 'View All Roles') {
            viewAllRoles();
        }
        if (selectedAnswer.menu === 'View All Employees') {
            viewAllEmployees();
        }
        if (selectedAnswer.menu === 'Add a Department') {
            addDepartment();
        }
        if (selectedAnswer.menu === 'Add a Role') {
            addRole();
        }
        if (selectedAnswer.menu === 'Add an Employee') {
            addEmployee();
        }
        if (selectedAnswer.menu === 'Update an Employee') {
            updateEmployee();
        }
        if (selectedAnswer.menu === 'Exit Database') {
            exitDatabase();
        }
    });
}


function viewAllDepartments() {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('');
        console.log('======ALL DEPARTMENTS=====');
        console.log('');
        console.table(result);
        init()
    })
}

function viewAllRoles() {
    const sql = 'SELECT role.id, role.title, department.department_name, role.salary FROM role LEFT JOIN department on role.department_id = department.id';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('');
        console.log('===============ALL Roles==============');
        console.log('');
        console.table(result);
        init()
    })
}

function viewAllEmployees() {  // NEEDS MORE employees things
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS departmentName, role.salary, manager.first_name AS managerFirstName, manager.last_name AS managerLastName, role.department_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER by employee.id';  // needs more columns for 


    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('ALL EMPLOYEES')
        console.table(result);
        init()
    })
}

function addDepartment() {


    // Add a Deparment Inquirer
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the new Department?',
            validate: addDepartmentName => {
                if (addDepartmentName) {
                    return true;
                } else {
                    console.log('Please enter a name for the new Department!');
                    return false;
                }
            }
        }
    ]).then((newDeptName) => {
        // console.log(newDeptName.departmentName);
        const sql = 'INSERT INTO department (department_name) VALUES (?)';
        const params = [newDeptName.departmentName];
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(''),
                console.log('DEPARTMENT "' + params + '" HAS BEEN ADDED TO DATABASE'),
                console.log('');

            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                console.table(result);
                init();
            })
        });
    });
}







function addRole() {

    db.promise().query('SELECT department.department_name, department.id FROM department')

        .then(([deptInData]) => {
            console.log(deptInData);


            var department = deptInData.map((deptData) => {
                return {
                    name: deptData.department_name,
                    value: deptData.id
                }
            });
            console.log(department)


            // Add a Role Inquirer
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'what is the name of this role?',
                    validate: addNewRoldName => {
                        if (addNewRoldName) {
                            return true;
                        } else {
                            console.log('Please enter the name of this role!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'what is the salary?',
                    validate: roleSalary => {
                        if (roleSalary) {
                            return true;
                        } else {
                            console.log('Please enter a number!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'roleInDepartment',
                    message: 'Select a Department to add this role',
                    choices: department
                }

            ]).then((newCreatedRole) => {
                const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                const params = [newCreatedRole.newRole, newCreatedRole.salary, newCreatedRole.roleInDepartment];
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log(''),
                        console.log('ROLE "' + newCreatedRole.newRole + '" HAS BEEN ADDED TO DATABASE'),
                        console.log('');

                    db.query('SELECT role.id, role.title, department.department_name, role.salary FROM role LEFT JOIN department on role.department_id = department.id', (err, result) => {
                        if (err) throw err;
                        console.table(result);
                        init();
                    })
                });
            });
        })
}






function addEmployee() {
    // Query for Role list for employee

    db.promise().query('SELECT role.title, role.id FROM role')

        .then(([roleInData]) => {
            console.log(roleInData);


            var role = roleInData.map((roleData) => {
                return {
                    name: roleData.title,
                    value: roleData.id
                }
            });
            console.log(role)


            // // Add a employee Inquirer
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'what is the name of the employee?',
                    validate: addEmployeeName => {
                        if (addEmployeeName) {
                            return true;
                        } else {
                            console.log('Please enter the name of the employee!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: 'what is the last name of the employee?',
                    validate: addEmployeeLastName => {
                        if (addEmployeeLastName) {
                            return true;
                        } else {
                            console.log('Please enter the last name of the employee!');
                            return false;
                        }
                    }
                },
                // TESTING DYNAMIC ===========================================================================


                {
                    type: 'list',
                    name: 'newRoleInDepartment',
                    message: 'Select a Role for this employee',
                    choices: role
                },






                // TESTING DYNAMIC ===========================================================================
            
            
            
                // {
                //     type: 'number',
                //     name: 'newRoleInDepartment',
                //     message: 'Please Enter the ID Role  for this employee',
                //     validate: addRoleDepartment => {
                //         if (addRoleDepartment) {
                //             return true;
                //         } else {
                //             console.log('Please a NUMERIC ID Role employee!');
                //             return false;
                //         }
                //     }
                // },






                {
                    type: 'number',
                    name: 'managerId',
                    message: 'Please Enter the ID Manager to who this employee will be under',
                    validate: addManagerId => {
                        if (addManagerId) {
                            return true;
                        } else {
                            console.log('Please a NUMERIC ID Manager for employee!');
                            return false;
                        }
                    }
                }
            ]).then((newEmployeeName) => {
                console.log(newEmployeeName)
                const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
                const params = [newEmployeeName.employeeName, newEmployeeName.employeeLastName, newEmployeeName.newRoleInDepartment, newEmployeeName.managerId];
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log(''),
                        console.log('EMPLOYEE "' + newEmployeeName.employeeName + '" HAS BEEN ADDED TO DATABASE'),
                        console.log('');

                    db.query('SELECT * FROM employee', (err, result) => {
                        if (err) throw err;
                        console.table(result);
                        init();
                    })
                });
            });
        })  // for DYNAMIC version
}

function updateEmployee() {
    // select employee

    // update role_id

}

function exitDatabase() {
    db.end();
}


init();


// write functions for actions
// 1. for startup ---> what would you like to dO?
// 2. functions for each actions
// --- createEmployee()
// --- viewEmployees()
// ---- ..... etc
// 3. Exit (Optional)


