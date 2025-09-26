const express = require('express');
require('dotenv').config();
const userRoute = require('./Routes/UserRoutes');
const app = express();
app.use(express.json());
app.set("view engine", 'ejs');
const ConnectDb = require('./db/db');


app.use('/api/user', userRoute);


app.listen(process.env.PORT, async () => {
    try {
        await ConnectDb();
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch (err) { console.log("Error in server connection", err); }
});

