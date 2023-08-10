import mongoose from "mongoose";

// connect to the mongoDB collection
const connectDB = async () => {
  try {
    const CONNECTION_URL =
      "mongodb+srv://killua1502:killuaisawesome@cluster5.tlv5sud.mongodb.net/MERN-Ecommerce?retryWrites=true&w=majority";
    mongoose
      .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) =>
        console.log(
          `MongoDB Connected: ${res.connection.host}`.cyan.underline.bold
        )
      )
      .catch((err) => {
        console.error(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
