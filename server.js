const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();





db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});






// const router = express.Router();

// router.use(require('./routes/apiRoutes/departmentRoute'));
// router.use(require('./routes/apiRoutes/employeeRoute'));
// router.use(require('./routes/apiRoutes/roleRoute'));




// module.exports = router;
