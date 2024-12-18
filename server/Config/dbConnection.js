const mongoose = require('mongoose');
async function connectToDB() {
    try {
        const connect = await mongoose.connect(process.env.DB_URL);
        console.log('Database Connected',connect.connection.host,connect.connection.name);
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
        process.exit(1);
    }
}
module.exports = connectToDB();