import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectToDb = async () => {
    try {
        const myConnection = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Connected")
        console.log(myConnection.connection.host);

    } catch (error) {
        console.log(error.message);
        console.log("Databse Not Connected")
        process.exit()
    }
}

export default connectToDb