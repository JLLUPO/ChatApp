const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,          // Removes whitespace
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// Pre-save hook: hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // skip if not new or modified

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare plaintext password with hashed password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
