const moongose = require("mongoose");
const dbAPI = "mongodb+srv://irshadsheikh2005:Irshad2005@tinder.chzul.mongodb.net/devTinder"
const connectDb = async () => {
  await moongose.connect(dbAPI);
};

module.exports = {connectDb};