const mongoose = require("mongoose");

async function ConnectDb() {

    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database is connected Successfully');
    }

    catch (error) {

        console.log("Error in DB connection", error);
    }


}

module.exports = ConnectDb;