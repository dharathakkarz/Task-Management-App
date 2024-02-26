const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    unique: false
    
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  joiningTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


const User = mongoose.model("User", userSchema);
module.exports = User;