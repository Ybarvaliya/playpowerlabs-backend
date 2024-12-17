const mongoose = require("mongoose");

const uri = "mongodb+srv://idf5111:ulyIn0RFauUTwP4T@cluster0.omgt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = connectToMongoDB;
