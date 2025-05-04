const mongoose = require('mongoose');

async function connect() {
   try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connection with DB established");
   } catch (error) {
      console.log(error.message);
      console.log("Connection with the DB Failed");
   }
}

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   firstName: String,
   lastName: String
})

const accountSchmea = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   balance: {
      type: Number,
      required: true,
   }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model('Account', accountSchmea);

module.exports = {
   User,
   connect,
   Account
}