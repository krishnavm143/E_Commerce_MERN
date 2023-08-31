import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connection at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`);
    process.exit(1);
  }
};

export default connectDb;
