const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const costFactor = 10;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, "Please provide a valid email address."],
  },
  password: {
    type: String,
    required: true,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  articleCount: {
    type: Number,
    default: 3,
    required: true,
  },
  wordLimit: {
    type: Number,
    default: 1500, // Default word limit for the user
    required: true,
  },
  nextResetDate: {
    type: Date,
    default: function () {
      // Reset one month from subscription start
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    },
  },
  profilePicture: {
    type: String, // Object key to image in S3
  },
  nextResetDate: {
    type: Date,
    default: function () {
      const startDate = new Date();
      const nextMonth = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate()
      );

      // Handle the case where adding a month skips over to yet another month. This happens if the current day has no equivalent in the next month (e.g., January 31 -> February 28/29)
      if (nextMonth.getDate() !== startDate.getDate()) {
        nextMonth.setDate(0); // Adjust to the last day of the previous month (e.g., March 3 -> February 28/29)
      }

      return nextMonth;
    },
  },
});

const hashPassword = async (password) =>
  await bcrypt.hash(password, costFactor);

// Install a pre-save hook that will hash passwords before updating the User document
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, costFactor);
  }
  next();
});

// This hook hashes the password when it is changed
// for an existing user in the reset password process, by findOneAndUpdate().
userSchema.pre("findOneAndUpdate", async function (next) {
  // const update = this.getUpdate();
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, costFactor);
  }
  next();
});

userSchema.statics.isCorrectPassword = async function (plaintextPassword, passwordHash) {
  return bcrypt.compare(plaintextPassword, passwordHash);
};

const User = mongoose.model("User", userSchema);

// Define the pre-save middleware function
// async function hashPasswordMiddleware(next) {
//   if (this.isNew || this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, costFactor);
//   }
//   next();
// }

function isCorrectPassword(plaintextPassword, passwordHash) {
  return bcrypt.compare(plaintextPassword, passwordHash);
}

// Define the isCorrectPassword method
// async function isCorrectPassword(password) {
//   return bcrypt.compare(password, this.password);
// }

module.exports = {
  hashPassword,
  isCorrectPassword,
  User,
};
