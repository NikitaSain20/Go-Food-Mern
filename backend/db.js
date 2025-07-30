const mongoose = require("mongoose");
const mongoconnect = process.env.MONGO_URL;
const mongoDb = async () => {
  try {
    await mongoose.connect(mongoconnect);
    console.log("MongoDb connected successfully!");
    const fetched_data = mongoose.connection.db.collection("foodItem");
    console.log("Querying the collection...");
    const data = await fetched_data.find({}).toArray();
    const fetched_categorydata =
      mongoose.connection.db.collection("foodCategory");
    const catdata = await fetched_categorydata.find({}).toArray();
    if (data.length && catdata.length === 0) {
      console.log("No data found in the collection.");
    } else {
      global.foodItem = data;
      global.foodCategory = catdata;
    }
  } catch (error) {
    console.log("Error in connecting the mongo db", error);
  }
};

module.exports = mongoDb;
