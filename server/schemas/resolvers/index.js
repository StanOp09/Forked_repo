const userResolvers = require("./userResolvers");
const articleResolvers = require("./articleResolvers");
const paymentResolvers = require("./paymentResolvers");
const subscriptionResolvers = require("./subscriptionResolvers");
const imageResolvers = require("./imageResolvers");
const checkoutResolvers = require('./checkoutResolvers');

const combinedResolvers = {
  Query: {
    ...userResolvers.Query,
    ...articleResolvers.Query,
    ...paymentResolvers.Query,
    ...subscriptionResolvers.Query,
    ...imageResolvers.Query,
    ...checkoutResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...articleResolvers.Mutation,
    ...paymentResolvers.Mutation,
    ...subscriptionResolvers.Mutation,
    ...imageResolvers.Mutation,
    ...checkoutResolvers.Mutation
  },
};

module.exports = combinedResolvers;
