
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
]).then((answers) => {
    console.log(answers)

    const desiredOutput = generateMarkdown(answers);

    writeToFile('./dist/READme.md', desiredOutput)

});

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

    const desiredOutput = generateMarkdown(answers);

    writeToFile('./dist/READme.md', desiredOutput)

});

// Add a employee Inquirer
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
    }
]).then((answers) => {
    console.log(answers)

    const desiredOutput = generateMarkdown(answers);

    writeToFile('./dist/READme.md', desiredOutput)

});


// write functions for actions
// 1. for startup ---> what would you like to dO?
// 2. functions for each actions
// --- createEmployee()
// --- viewEmployees()
// ---- ..... etc
// 3. Exit (Optional)
