const app = require('./app');
const dotenv = require('dotenv'); 
const databaseConnection =  require('./config/database');
//config
dotenv.config({path:'backend/config/config.env'});
databaseConnection();

//handling unexceptional errors
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shuting down due to exceptional error'); //if something not defined in application will give err (var not defined)
    process.exit(1);
});


const server = app.listen(4000, () => {
    console.log(`server is running on the port http:://localhost:4000`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shuting down the server due to unhandled exception`); //if request have errors will show error ex name empty

    server.close(() => {
        process.exit(1);
    })
});