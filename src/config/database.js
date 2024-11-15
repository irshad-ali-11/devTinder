const moongose = require("mongoose");
const dbAPI =
  "mongodb+srv://irshadsheikh2005:Irshad2005@tinder.chzul.mongodb.net/devTinder";
const connectDb = async () => {
  const connectionInstance = await moongose.connect(dbAPI);
  console.log(
    `MONGODB connection successfully Host : ${connectionInstance.connection.host}`,
  );
};

module.exports = { connectDb };
