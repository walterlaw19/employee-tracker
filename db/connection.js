const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'ThisIsMySQLPW',
    database: 'employeeTracker'
  },
  console.log(''),
  console.log(''),
  console.log('============================================='),
  console.log('============================================='),
  console.log('=====  Welcome to your Employee Database  ==='),
  console.log('============================================='),
  console.log('============================================='),
  console.log(''),
  console.log('')
)


// db.connect(err => {
//   if(err) {
//     throw err
//   }
//   console.log('MySQL Connected')
// })

module.exports = db;




