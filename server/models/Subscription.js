const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Add trim to remove whitespace
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"], // Ensure the price isn't negative
  },
  features: [{
    type: String,
    required: true, // Features are required
  }],
  maxArticles: {
    type: Number,
    required: true,
    min: [0, "Max articles cannot be negative"],
  },
  maxPosts: {
    type: Number,
    required: true,
    min: [0, "Maximum posts cannot be negative"],
  },
  wordLimit: {
    type: Number,
    required: true,
    min: [0, "Word limit must be positive"], // Minimum word limit
  },
}, { timestamps: true });

// Add an index for the name field for faster querying
subscriptionSchema.index({ name: 1 });

// Adding a virtual for subscriptionEndDate
subscriptionSchema.virtual("subscriptionEndDate").get(function () {
  const endDate = new Date(this.createdAt);
  endDate.setDate(endDate.getDate() + this.duration);
  return endDate;
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
