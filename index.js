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
            message: 'What would you like to do first?',
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
    const sql = 'SELECT * FROM role';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('');
        console.log('======ALL Roles=====');
        console.log('');
        console.table(result);
        init()
    })
}

function viewAllEmployees() {
    const sql = 'SELECT * FROM employee';
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
    // Add a Role Inquirer
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'what is the name of this role?',
            validate: newRoldName => {
                if (newRoldName) {
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
            choices: ['Perl', 'Mozilla', 'MIT', 'IBM', 'Zlib'] // needs to update
        }
    ]).then((answers) => {
        console.log(answers)

        // const desiredOutput = generateMarkdown(answers);

        // writeToFile('./dist/READme.md', desiredOutput)

    });
}

function addEmployee() {
    // // Add a employee Inquirer
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeName',
            message: 'what is the name of the employee?',
            validate: employeeName => {
                if (employeeName) {
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
            validate: employeeLastName => {
                if (employeeLastName) {
                    return true;
                } else {
                    console.log('Please enter the last name of the employee!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleInDepartment',
            message: 'Select a Department to add this role',
            choices: ['Perl', 'Mozilla', 'MIT', 'IBM', 'Zlib'] // needs to update
        },
        {
            type: 'manager',
            name: 'manager',
            message: 'who is the manager'
        }
    ]).then((answers) => {
        console.log(answers)

        // const desiredOutput = generateMarkdown(answers);

        // writeToFile('./dist/READme.md', desiredOutput)

    });

}

function updateEmployee() {

}

function exitDatabase() {
    db.end();
}


// 









init();


// write functions for actions
// 1. for startup ---> what would you like to dO?
// 2. functions for each actions
// --- createEmployee()
// --- viewEmployees()
// ---- ..... etc
// 3. Exit (Optional)


