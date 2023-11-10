const { Payment, Subscription } = require("../../models");

const resolvers = {
  Query: {
    getPayments: async (parent, args, { user }) => {
      if (!user) {
        throw new Error("You need to be logged in!");
      }
      
      return await Payment.find({user: user._id}).populate("user").populate("subscriptionTier");
    },
    // ... other queries here
  },
  Mutation: {
    addPayment: async (
      parent,
      { subscriptionTier, amount, paymentDate },
      { user }
    ) => {
      if (!user) {
        throw new Error("You need to be logged in!");
      }

      // Check if the subscriptionTier is one of the four predefined plans
      const subscription = await Subscription.findById(subscriptionTier);
      if (!subscription) {
        throw new Error("Subscription not found.");
      }


      // Additional security check if needed
      if ( amount <= 0 ) {
        throw new Error("Invalid subscription plan.");
      }

      if (amount <= 0) {
        throw new Error("Invalid payment amount.");
      }

      try {
        const newPayment = await Payment.create({
          user: user._id,
          subscriptionTier,
          amount,
          paymentDate: paymentDate || new Date(), // Use the provided date or default to now
        });
      // ... other mutations here
      return newPayment;

      } catch (error) {
        console.error("Error adding payment:", error.message);
        throw new Error("Failed to add payment. Please try again.");
      }
    },
  },
};

module.exports = resolvers;
