const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Here URI mentioned mongodb cluster
    const url = process.env.MONGODB_URI;

    mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_AUTH_USERNAME}:${process.env.MONGODB_AUTH_PASSWORD}@cluster0.fnyrs.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    );
    mongoose.connection
      .once("open", function () {
        console.log("Conection has been made!");
      })
      .on("error", function (error) {
        console.log("DB Con Error is: ", error);
      });
  } catch (error) {
    console.log("DB Error", error);
  }
};

module.exports = connectDB;
