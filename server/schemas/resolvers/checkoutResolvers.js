const uniqid = require('uniqid');

const { Subscription, Payment } = require('../../models');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
  },
  Mutation: {
    checkout: async (parent, { subscriptionIds }, context) => {

      const url = new URL(context.headers.referer).origin;
      
      const subscriptions = await Subscription.find({_id: {$in: subscriptionIds}});

      const line_items = await Promise.all(
        subscriptions.map(async sub => {
          const product = await stripe.products.create({
            name: sub.name,
            description: sub.description,
            images: []
          });
      
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: sub.price * 100,
            currency: 'usd',
          });
   
          return {
            price: price.id,
            quantity: 1
          };
        }));
   
      const transactionId = uniqid();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/subscription-success/${subscriptionIds[0]}/${transactionId}?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      const sub = await Subscription.findById(subscriptionIds[0]);

      const payment = await Payment.create({
        user: context.user._id,
        subscriptionTier: subscriptionIds[0],
        amount: sub.price,
        status: 'pending',
        paymentMethod: 'Stripe',
        transactionId
      });

      return { session: session.id };
    },

    completePayment: async (parent, { transactionId }, context) => {
      return await Payment.findOneAndUpdate(
        {
          transactionId
        },
        {
          status: 'complete'
        },
        { new: true }
      );
    }
  }
};

module.exports = resolvers;
