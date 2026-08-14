const moongose = require("mongoose");
const dbAPI =
   "mongodb+srv://irshadsheikh2005:Irshad2005@tinder.chzul.mongodb.net/devTinder";
const connectDb = async () => {
   try {
      const connectionInstance = await moongose.connect(dbAPI);
      console.log(
         `MONGODB connection successfully Host : ${connectionInstance.connection.host}`,
      );
   } catch (error) {
      console.log(`MongoDB Database not connect... ${error?.message}`);
      process.exit(1);
   }
};

module.exports = { connectDb };
