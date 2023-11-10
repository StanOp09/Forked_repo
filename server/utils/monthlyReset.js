// const cron = require("node-cron");
// const { User } = require("../models/User");
// const Subscription = require("../models/Subscription");
// const mongoose = require("mongoose");

// // -----------------------------------------------------
// //                MANUAL CRON TEST
// // -----------------------------------------------------

// async function main() {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://writeawaymongodb:kCcW76tBIuBhtR53@writeaway.pdktmvx.mongodb.net/writeawayDB",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("Connected to the database!");

//     // Await the reset operation
//     await resetUserArticleCounts();
//     console.log("Article counts reset and manual test completed.");
//   } catch (error) {
//     console.error("Error during the user article count reset:", error);
//   } finally {
//     // This will always run after the try/catch, regardless of whether an error occurred
//     try {
//       await mongoose.disconnect();
//       console.log("Disconnected from the database.");
//     } catch (disconnectError) {
//       console.error("Error during database disconnect:", disconnectError);
//     }
//   }
// }

// main();

// async function resetUserArticleCounts() {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   console.log(`Resetting article counts. Today's date: ${today.toISOString()}`);

//   try {
//     const usersToReset = await User.find({ nextResetDate: today }).populate(
//       "subscription"
//     );

//     console.log(
//       `Found ${usersToReset.length} users with a reset date of today.`
//     );

//     for (const user of usersToReset) {
//       if (!user.subscription) {
//         console.error(`User ${user._id} does not have a valid subscription.`);
//         continue; // Skip to the next user instead of throwing an error to allow other updates to proceed
//       }

//       const subscription = await Subscription.findById(user.subscription._id); // Verify that this is the right subscription ID, may change based on stanleys implementation

//       await User.updateOne(
//         { _id: user._id },
//         { articleCount: subscription.maxArticles }
//       );
//       console.log(
//         `User ${user._id} article count reset to ${subscription.maxArticles}.`
//       );

//       // Calculate the next reset date with edge case handling
//       let nextMonth = new Date(user.nextResetDate);
//       nextMonth.setMonth(nextMonth.getMonth() + 1);

//       // Check if the date rolled over to two months ahead due to a month having fewer days
//       if (nextMonth.getDate() < user.nextResetDate.getDate()) {
//         // Adjust by setting the date to the last day of the previous month
//         nextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 0);
//       }

//       await User.updateOne({ _id: user._id }, { nextResetDate: nextMonth });
//       console.log(
//         `User ${user._id} next reset date set to: ${nextMonth.toISOString()}`
//       );
//     }

//     console.log(
//       "Article counts reset to original plan levels for all relevant users."
//     );
//   } catch (error) {
//     console.error("Error during the user article count reset:", error);
//   }
// }

// module.exports = resetUserArticleCounts;

// -----------------------------------------------------
//                NEW AUTO CRON
// -----------------------------------------------------
// cron.schedule("0 0 * * *", async () => {
//   console.log("Cron job started for resetting article counts.");

//   // Get today's date without time for comparison
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   console.log(`Today's date for reset comparison: ${today}`);

//   try {
//     // Fetch all users whose nextResetDate is today
//     const usersToReset = await User.find({ nextResetDate: today }).populate(
//       "subscription"
//     );

//     console.log(`Found ${usersToReset.length} users to reset.`);

//     for (const user of usersToReset) {
//       if (!user.subscription) {
//         console.log(`User ${user._id} does not have a valid subscription.`);
//         throw new Error(`User ${user._id} does not have a valid subscription.`);
//       }

//       // Reset their articleCount to the maxArticles of their subscription plan
//       await User.updateOne(
//         { _id: user._id },
//         { articleCount: subscription.maxArticles }
//       );
//       console.log(`Article count reset for user ${user._id}.`);

//       // Calculate the next reset date
//       let nextMonth = new Date(user.nextResetDate);
//       nextMonth.setMonth(nextMonth.getMonth() + 1);

//       // Check if the date rolled over to two months ahead due to a month having fewer days. Adjust by setting the date to the last day of the previous month if so
//       if (nextMonth.getDate() < user.nextResetDate.getDate()) {
//         nextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 0);
//       }

//       // Update the user's next reset date
//       await User.updateOne({ _id: user._id }, { nextResetDate: nextMonth });
//       console.log(`Next reset date for user ${user._id} set to: ${nextMonth}`);
//     }

//     console.log(
//       "Article counts reset to original plan levels for all relevant users!"
//     );
//   } catch (error) {
//     console.error("An error occurred during the cron job execution:", error);
//   }
// });

// -----------------------------------------------------
//                OLD CRON
// -----------------------------------------------------
//       // Fetch the user's subscription to get the maxArticles value
//       const subscription = await Subscription.findById(user.subscription);

//       // Reset their articleCount to the maxArticles of their subscription plan
//       await User.updateOne(
//         { _id: user._id },
//         { articleCount: subscription.maxArticles }
//       );
//       console.log(`Article count reset for user ${user._id}.`);

//       // Calculate the next reset date
//       let nextMonth = new Date(user.nextResetDate);
//       let currentMonth = nextMonth.getMonth();
//       nextMonth.setMonth(currentMonth + 1);

//       // Handle edge cases where the month doesn't increment as expected
//       if (
//         nextMonth.getMonth() === currentMonth ||
//         nextMonth.getMonth() > currentMonth + 1
//       ) {
//         nextMonth = new Date(
//           nextMonth.getFullYear(),
//           nextMonth.getMonth() + 1,
//           0
//         );
//       }

//       // Update the user's next reset date
//       await User.updateOne({ _id: user._id }, { nextResetDate: nextMonth });
//       console.log(`Next reset date for user ${user._id} set to: ${nextMonth}`);
//     }

//     console.log(
//       "Article counts reset to original plan levels for all relevant users!"
//     );
//   } catch (error) {
//     console.error("An error occurred during the cron job execution:", error);
//   }
// });

// -----------------------------------------------------
//               OLD MANUAL TESTING
// -----------------------------------------------------
// For manual testing
// async function resetUserArticleCounts() {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   try {
//     const usersToReset = await User.find({ nextResetDate: today }).populate(
//       "subscription"
//     );

//     for (const user of usersToReset) {
//       if (!user.subscription) {
//         throw new Error(`User ${user._id} does not have a valid subscription.`);
//       }

//       const subscription = await Subscription.findById(user.subscription);

//       await User.updateOne(
//         { _id: user._id },
//         { articleCount: subscription.maxArticles }
//       );

//       const nextMonth = new Date(user.nextResetDate);
//       nextMonth.setMonth(nextMonth.getMonth() + 1);

//       await User.updateOne({ _id: user._id }, { nextResetDate: nextMonth });
//     }

//     console.log(
//       "Article counts reset to original plan levels for relevant users!"
//     );
//   } catch (error) {
//     console.error("Error during the user article count reset:", error);
//   }
// }

// // Schedule the task
// cron.schedule("0 0 * * *", resetUserArticleCounts);

// // For manual testing, you can call the function directly:
// // resetUserArticleCounts();

// module.exports = resetUserArticleCounts;

// Set the next reset date for this user to one month from now: tested code thats working before adding edge cases
// const nextMonth = new Date(user.nextResetDate);
// nextMonth.setMonth(nextMonth.getMonth() + 1);

// -----------------------------------------------------
//           FOR UPDATED CRON MANUAL TESTING
// -----------------------------------------------------
