const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Subscription = require("../models/Subscription");

const secret = "verysecret";
const expiration = "2h";

function AuthenticationError() {
  return new GraphQLError("Incorrect email or password", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  });
}

function signToken({ email, firstName, lastName, _id }, customExpiration) {
  const payload = { email, firstName, lastName, _id };
  return jwt.sign({ data: payload }, secret, {
    expiresIn: customExpiration || expiration,
  });
}

// This function will throw an error if the token is not valid
function verifyPasswordResetToken(token) {
  const { data } = jwt.verify(token, secret);
  return data;
}

// function authMiddleware({ req }) {
//   let token = req.body.token || req.query.token || req.headers.authorization;

//   // Split the token string into an array and return the actual token
//   if (req.headers.authorization) {
//     token = token.split(" ").pop().trim();
//   }

//   if (!token) {
//     return req;
//   }

//   // change based on what mo does with models
//   if (req.user) {
//     // Fetch the user's subscription from the database
//     Subscription.findOne({ userId: req.user._id }, (err, subscription) => {
//       if (err) {
//         console.error("Error fetching subscription:", err);
//       } else if (subscription) {
//         req.user.articleLimit = subscription.articleLimit;
//         req.user.wordLength = subscription.wordLength;
//         req.user.socialMediaLimit = subscription.socialMediaLimit;
//       }
//     });
//   }

//   // If the token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
//   try {
//     const { data } = jwt.verify(token, secret, { maxAge: expiration });
//     req.user = data;
//   } catch (error) {
//     console.error("Invalid token:", error);
//   }

//   return req;
// }

async function authMiddleware({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    // Verify the token asynchronously
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;

    // If the user is authenticated, check their subscription asynchronously
    if (req.user) {
      try {
        const subscription = await Subscription.findOne({
          userId: req.user._id,
        }).exec();

        if (!subscription) {
          // Handle case where subscription is not found
          console.warn(
            `Subscription not found for user with ID: ${req.user._id}`
          );
          // You can decide to set default values or throw an error based on your business logic
          req.user.subscriptionStatus = "Not Subscribed";
          // ... set other default values or handle as needed ...
        } else {
          // If subscription is found, attach it to the user object on the request
          req.user.subscription = {
            articleLimit: subscription.articleLimit,
            wordLength: subscription.wordLength,
            socialMediaLimit: subscription.socialMediaLimit,
          };
        }
      } catch (error) {
        // Handle case where there is an issue with the database query
        console.error("Error fetching subscription:", error);
        throw new AuthenticationError();
      }
    }
  } catch (error) {
    // If the token verification fails
    console.error("Invalid token:", error);
    throw new AuthenticationError();
  }

  return req;
}

module.exports = {
  AuthenticationError,
  signToken,
  verifyPasswordResetToken,
  authMiddleware,
};
