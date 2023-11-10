const nodemailer = require("nodemailer");

const {
  signToken,
  verifyPasswordResetToken,
  AuthenticationError,
} = require("../../utils/auth");
const { User, isCorrectPassword } = require("../../models/User");
const { Subscription } = require("../../models/");

// Use a short expiry time for password reset tokens
const passwordResetExpiry = "15m";

// For email testing purposes, you can generate a Google App Password in your Gmail account
// and save it to .env as GOOGLE_APP_PASSWORD=<the password>
// and set GMAIL_USERNAME=<your gmail address>

const googleAppPassword = process.env.GOOGLE_APP_PASSWORD;
const gmailUsername = process.env.GMAIL_USERNAME;

// The deployed site will need to configure APP_URL correctly
const appUrl = process.env.APP_URL || "http://localhost:3000";

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError ("Not authenticated") ;
    },
  },
  Mutation: {
    addUser: async (
      parent,
      {
        firstName,
        lastName,
        username,
        email,
        password,
        planName
      }
    ) => {
      const plan = await Subscription.findOne({name: planName});

      if (!plan) {
        throw new Error(`No subscription plan found with the name: ${planName}`);
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with the subscription ID from the plan
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password, hashedPassword,
        subscription: plan._id,
        articleCount: plan.maxArticles,
        wordLimit: plan.wordLimit
      });

      // Sign a JWT token for the new user
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const correctPw = await isCorrectPassword(password, user.password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      // Make sure the returned object strictly follows the `User` type structure.
      return {
        token,
        user
      };
    },
    updateUserEmail: async (parent, { email }, context) => {
      // TODO: @Victoria This should only be changed through an email verification step
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { email },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    updateUserPassword: async (parent, { password }, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { password },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    updateUserUsername: async (parent, { username }, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { username },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
    updateUserProfilePicture: async (parent, { profilePicture }, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { profilePicture: profilePicture || null },
        { new: true }
      );
    },

    sendPasswordResetEmail: async (parent, { emailAddress }, context) => {
      // Given the user's email address (from frontend), generate (sign) JWT (token) for reset.
      // format email with token and send to user's registered address.
      const user = await User.findOne({ email: emailAddress });

      // Only send reset email if the user does exist with specified email address
      if (user) {
        const token = signToken({ email: emailAddress }, passwordResetExpiry);

        const resetUrl = `${appUrl}/password-reset?token=${token}`;
        const textBody = `Click here to reset your password: <${resetUrl}>. This link will expire in 15 minutes.`;
        const htmlBody = `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 15 minutes.</p>`;

        transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: gmailUsername,
            pass: googleAppPassword,
          },
        });

        const emailData = {
          from: gmailUsername,
          to: emailAddress,
          subject: "Password reset",
          text: textBody,
          html: htmlBody,
        };

        await transporter.sendMail(emailData);
      }

      return true;
    },

    validateResetToken: async (parent, { token }, context) => {
      try {
        verifyPasswordResetToken(token);
        return true; // signal to the frontend that the token is valid and the reset form can be shown
      } catch (error) {
        return false; // The token was invalid or has expired. Frontend should display an error message.
      }
    },

    resetPassword: async (parent, { token, newPassword }, context) => {
      // With a valid token, and new password, change the user's password.
      try {
        const { email } = verifyPasswordResetToken(token);

        // Change user's password to the password given by frontend
        await User.findOneAndUpdate(
          { email }, // find existing user for the email address in the token
          { password: newPassword }
        );

        return true;
      } catch (error) {
        // If frontend passes an invalid token to this mutation,
        // return false to indicate that the password was not changed.
        return false;
      }
    },
  },
};

module.exports = resolvers;
