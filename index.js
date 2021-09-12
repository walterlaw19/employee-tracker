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
        if (selectedAnswer.menu === 'Update an Employee Role') {
            updateEmployee();
        }
        if (selectedAnswer.menu === 'Exit Database') {
            exitDatabase();
        }
    });
}

// View ALl Departments
function viewAllDepartments() {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('');
        console.log('====ALL DEPARTMENTS===');
        console.log('');
        console.table(result);
        init()
    })
}

// View All Rolees
function viewAllRoles() {
    const sql = 'SELECT role.id, role.title, department.department_name, role.salary FROM role LEFT JOIN department on role.department_id = department.id';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('');
        console.log('================ALL ROLES===============');
        console.log('');
        console.table(result);
        init()
    })
}

// View All Employees
function viewAllEmployees() {
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS departmentName, role.salary, manager.first_name AS managerFirstName, manager.last_name AS managerLastName, role.department_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER by employee.id';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('');
        console.log('=============================================ALL EMPLOYEES===============================================');
        console.log('');
        console.table(result);
        init()
    })
}
// Add Department
function addDepartment() {

    // Add a Deparment Inquiry
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

// Add Role
function addRole() {

    db.promise().query('SELECT department.department_name, department.id FROM department')

        .then(([deptInData]) => {
            var department = deptInData.map((deptData) => {
                return {
                    name: deptData.department_name,
                    value: deptData.id
                }
            });

            // Add a Role Inquiry
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
        });
};

// Add Employee
function addEmployee() {

    db.promise().query('SELECT role.title, role.id FROM role')

        .then(([roleInData]) => {
            var role = roleInData.map((roleData) => {
                return {
                    name: roleData.title,
                    value: roleData.id
                }
            });
            // add an Employee Inquiry
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
                {
                    type: 'list',
                    name: 'newRoleInDepartment',
                    message: 'Select a Role for this employee',
                    choices: role
                }

            ]).then((newEmployeeName) => {

                db.promise().query('SELECT employee.first_name, employee.last_name, employee.id FROM employee')

                    .then(([employeeInData]) => {

                        var managerAsssigned = employeeInData.map((managerData) => {
                            return {
                                name: managerData.first_name + ' ' + managerData.last_name,
                                value: managerData.id
                            }
                        });

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'newEmployeeInDepartment',
                                message: 'Select a Manager for this employee',
                                choices: managerAsssigned
                            }
                        ]).then((newManager) => {

                            const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
                            const params = [newEmployeeName.employeeName, newEmployeeName.employeeLastName, newEmployeeName.newRoleInDepartment, newManager.newEmployeeInDepartment];
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
                        })
                    });
            });
        });
};

// Update Employee
function updateEmployee() {

    db.promise().query('select * from employee')
        .then(([viewEmployeeData]) => {

            var employeeForChange = viewEmployeeData.map(({ first_name, id }) => ({
                name: first_name,
                value: id
            }));

            db.promise().query('select * from role')
                .then(([viewRoleData]) => {
                    var NewRoleforEmployee = viewRoleData.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    // add employee update inquiry
                    inquirer.prompt(
                        [
                            {
                                type: "list",
                                name: "selectedEmployee",
                                message: "SELECT the Employee you want to update Role for :",
                                choices: employeeForChange
                            },
                            {
                                type: "list",
                                name: "SelectedRole",
                                message: "SELECT the New Role / Title of the Employee :",
                                choices: NewRoleforEmployee
                            }
                        ])


                        .then(resultForNewRole => {
                            const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                            const params = [resultForNewRole.SelectedRole, resultForNewRole.selectedEmployee];
                            
                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log('');
                                console.log('===========EMPLOYEE UPDATED - SELECT `VIEW ALL EMPLOYEES` TO SEE THE CHANGE============');
                                console.log('')
                                init();
                            });
                        })
                })
        })

}

function exitDatabase() {
    db.end();
}

init();
