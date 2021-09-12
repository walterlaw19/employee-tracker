# employee-tracker
[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)

## Description
An application to save data for your company using inquirer, express and mysql. It allows you to create Departments, Roles and Employees as well as updating employees to new roles. With Console.Table, you are able to view a descriptibe table of all employees information.






## Table of Contents

* [Installation](#installation)
* [Demo](#demo)
* [Usage](#usage)
* [License](#license)
* [Contribution](#contribution)
* [Questions](#questions)


## Installation

1. You must download and install Node.js click on link: https://nodejs.org/en/download/

2. Download and install MySQL Community Server from this link: https://dev.mysql.com/downloads/mysql/. For a complete guide on how to install it properly depending on your operating system (Windows, macOS, Linux), review this link: https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide 

3. copy or clone this repo into the folder where you want the application to be created by entering the following command in your terminal (mac) or gitbash (windows):
    * git clone git@github.com:walterlaw19/employee-tracker.git   (<---- Copy, Paste, Enter this command in your terminal)

4. Open the employee-tracker folder from your your VS Code (make sure you are in the right folder) or you can use the integrated terminal, go to the directory where the employee-tracker folder was installed: e.g. "cd employee-tracker"

5. Once you are in the employee-tracker folder, navigate to db/connection.js and open the file to update your SQL credentials.  *** You should ONLY update user: (line 7) and password (line 9) with your own username and password. Save the changes.

6. Back in the employee-tracker root directory, open your integrated terminal in VS Code and install the dependencies by entering the command: 'npm i'.  Wait for the installation to be completed.

7. after the installation has be completed, you must login to MySQL shell. Enter "msyql -u 'your SQL username' -p" and press Enter. Now you will be prompted to enter your SQL Password. Once you are logged in, enter the following commands in this order to clear/seed the MySQL database properly. 

```
A. source db/db.sql
B. source db/schema.sql
C. source db/seeds.sql
D. quit
```
8. In the terminal, type "node index" to run the application.

7. You can go through the Menu and select as desired. It is recommended to always enter a Department first, then Role and finally an Employee

9. Once you are done, you can select "exit database" or press CTRL + C in your keyboard to stop the application.


## Demo

[Click here to see a demo video](https://drive.google.com/file/d/1D77LXat3xa827Pzn28BW3wqFosfUmHTD/view?usp=sharing)

![](Readme-images/screenshot1.PNG) "Run NODE INDEX and view all deparments/roles/employees"
![](Readme-images/screenshot2.PNG) "Add departments/roles/employees and update employees"



## Usage

You can use this application to save information of your company
 
## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## contribution

Please send me an email if you can want to contribute or submit any suggestions: walterlaw19@gmail.com

## Questions

If you have any questions or concerns, you can reach me at: walterlaw19@gmail.com

or visit my GitHub: https://github.com/walterlaw19



```
Made by by Walter G
```

---
##### © 2021 WG.








