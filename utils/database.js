import mongoose from "mongoose";

let isConnected = false;

//this is required as a lambda function is executed newly everytime, 
//however the connection object persists on the server
//so to avoid multiple objects and connections following approach is used
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        //MongoDB is already conntected, no need to connect again
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;

        console.log("Mongodb successfully connected");
    } catch (error) {
        console.error(error);
    }
}