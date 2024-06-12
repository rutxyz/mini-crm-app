const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String, // Assuming you're using Google OAuth
  // Add other properties as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
