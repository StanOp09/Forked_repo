const { AuthenticationError } = require("../../utils/auth");
const { Subscription } = require("../../models");

const resolvers = {
  Query: {
    getSubscription: async (parent, { planName }, context) => {
      // Find the subscription by its planName
      const subscription = await Subscription.findOne({ planName: planName });

      // If the subscription doesn't exist, throw an error
      if (!subscription) {
        throw new Error(`No subscription plan found with the name: ${planName}`);
      }
    
      // Return the found subscription
      return subscription;
    },

    getSubscriptions: async () => {
      try {
        // Fetch all subscription plans from the database
        return await Subscription.find({});
      } catch (error) {
        console.error("Error fetching subscriptions:", error.message);
        throw new Error("Failed to fetch subscriptions. Please try again.");
      }
    },
    // ... other queries here
  },
  Mutation: {
    // addSubscription: async (
    //   parent,
    //   { name, description, price, duration, maxArticles, maxPosts, wordLimit },
    //   { loggedInUser }
    // ) => {
    //   // Ensure the user is logged in with admin privileges
    //   if (!loggedInUser || !loggedInUser.isAdmin) {
    //     throw new AuthenticationError("You need to be logged in as an admin!");
    //   }

    //   // Check if a subscription with the given name already exists
    //   const existingSubscription = await Subscription.findOne({ name });
    //   if (existingSubscription) {
    //     throw new UserInputError("A subscription with this name already exists.");
    //   }

    //   try {
    //     // Create and return the new subscription plan
    //     return await Subscription.create({
    //     name: name.trim(), // Trim whitespace from the name
    //     description: description.trim(),
    //     price: Math.max(0, price), // Ensure the price is not negative
    //     duration: Math.max(1, duration), // Ensure the duration is at least 1 day
    //     maxArticles: Math.max(0, maxArticles),
    //     maxPosts: Math.max(0, maxPosts),
    //     wordLimit: Math.max(0, wordLimit),
    //   });
    //   } catch (error) {
    //     console.error("Error adding subscription:", error.message);
    //     throw new Error("Failed to add subscription. Please try again.");
    //   }
    // },
      // Mutation to update a subscription plan
      updateSubscription: async ( parent, { subscriptionId }, context) => {
        // Check if the user is logged in and is an admin
        if (!context.user || !context.user.isAdmin) {
          throw new AuthenticationError("You need admin privileges to update subscriptions.");
        }

        // Find the subscription to ensure it's one of the valid plans
        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
          throw new Error("Subscription plan not found.");
        }

        // Update the user's subscription reference
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { subscription: subscriptionId },
          { new: true }
        );
        
        if (!updatedUser) {
          throw new Error("User not found.");
        }
        return updatedUser;
      },

      // Allows a logged-in user to delete their subscription (set to null or a default value)
      deleteSubscription: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in to delete your subscription.");
        }

        // Update the user to remove their subscription reference
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $unset: { subscription: "" } }, // This removes the subscription from the user
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("User not found.");
        }
        return updatedUser;
      },
      // // Mutation to delete a subscription plan
      // deleteSubscription: async (parent, { _id }, context) => {
      //   if (!context.user || !context.user.user.isAdmin) {
      //     throw new AuthenticationError("You need to be logged in as an admin!");
      //   }
      //   try {
      //     const deletedSubscription = await Subscription.findByIdAndDelete(_id);
      //     if (!deletedSubscription) {
      //       throw new Error("Subscription not found.");
      //     }
      //     return deletedSubscription;
      //   } catch (error) {
      //     console.error("Error deleting subscription:", error);
      //     throw new Error("Failed to delete subscription. Please try again." + error.message);
      //   }
      // },

    //   // Mutation to toggle the active status of a subscription plan
    //   toggleSubscriptionActiveStatus: async(parent, { _id }, context) => {
    //     if (!context.user || !context.user.user.isAdmin) {
    //       throw new AuthenticationError("You need to be logged in as an admin!");
    //     }

    //     try {
    //       const subscription = await Subscription.findById(_id);
    //       subscription.isActive = !subscription.isActive;
    //       await subscription.save();
    //       return subscription;
    //     } catch (error) {
    //       console.error("Error toggling subscription active status:", error.message);
    //       throw new Error("Failed to toggle subscription active status. Please try again.");
    //     }


      
    // },
  },
};

module.exports = resolvers;
