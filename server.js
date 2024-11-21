const express = require('express');
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const morgan = require('morgan');
const mysqlPool = require('./config/db');

// Load environment variables from .env file
dotenv.config(); 

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/student',require('./routes/studentRoutes'))
app.get('/test', function (req, res) {
  res.status(200).send('this is for all people at earth');
});

// Use PORT from .env file, default to 8000 if not provided
const PORT = process.env.PORT || 8000;

//this is used to connect the mysql databse
mysqlPool.query('SELECT 1').then(()=>{
    console.log("mysql is connected successfully")
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
}).catch((error)=>{
    console.log("this is error",error)
})

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
