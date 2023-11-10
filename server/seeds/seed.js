const db = require('../config/connection');
const { Article, User, Subscription } = require('../models');
const { mongoose } = require('mongoose');
const cleanDB = require('./cleanDB');
const plans = require('../../client/src/components/subscriptionSection/data/subscriptionPlans.json');

// Define your subscription plan IDs

const subscriptionPlanIds = {
  freePlanId: new mongoose.Types.ObjectId(),
  standardPlanId: new mongoose.Types.ObjectId(),
  advancedPlanId: new mongoose.Types.ObjectId(),
  professionalPlanId: new mongoose.Types.ObjectId(),
  premiumPlanId: new mongoose.Types.ObjectId()
};


// Define your subscription plans with specific IDs
const subscriptionPlans = [
  {
    _id: subscriptionPlanIds.freePlanId,
    planName: 'Free',
    price: 0,
    features: [
      "3 Articles",
      "3 Social Media Posts",
      "1500 words per article",
      "Limited Exports"
    ],
    maxArticles: 3,
    maxPosts: 3,
    wordLimit: 1500,
  },
  {
    _id: subscriptionPlanIds.standardPlanId,
    planName: 'Standard',
    price: 19.99,
    features: [
      "10 Articles monthly",
      "15 Social Media Posts",
      "2000 words per article",
      "Email Support",
      "Multiple Exports"
    ],
    maxArticles: 10,
    maxPosts: 15,
    wordLimit: 2000,
  },
  {
    _id: subscriptionPlanIds.advancedPlanId,
    planName: 'Advanced',
    price: 49.99,
    features: [
      "35 Articles monthly",
      "40 Social Media Posts",
      "2500 words per article",
      "2 Collaborators",
      "Email & Chat Support",
      "Limited Roll-Overs",
      "Multiple Exports"
    ],
    maxArticles: 35,
    maxPosts: 40,
    wordLimit: 2500,
  },
  {
    _id: subscriptionPlanIds.professionalPlanId,
    planName: 'Professional',
    price: 99.99,
    features: [
      "75 Articles monthly",
      "50 Social Media Posts",
      "3000 words per article",
      "5 Collaborators",
      "Email + Chat",
      "Bi-Annual Strategy Sessions",
      "Mid-term Expiry Roll-Overs",
      "Multiple Exports"
    ],
    maxArticles: 75,
    maxPosts: 50,
    wordLimit: 3000,
  },
  {
    _id: subscriptionPlanIds.premiumPlanId,
    planName: 'Premium',
    price: 199.99,
    features: [
      "125 Articles monthly",
      "Unlimited Social Media Posts",
      "4000 words per article",
      "7 Collaborators",
      "Email + Chat",
      "Personalized Strategy Sessions",
      "End-Year Roll-Over Expiry",
      "Multiple Exports"
    ],
    maxArticles: 125,
    maxPosts: 999999999,
    wordLimit: 4000,
  },
  // ...define any other plans if necessary
];

db.once('open', async () => {
  try {
    // Seed Subscription Plans
    for (let plan of subscriptionPlans) {
      let existingPlan = await Subscription.findOne({ planName: plan.planName });
      if (!existingPlan) {
        await Subscription.create(plan);
        console.log(`Created subscription plan: ${plan.planName}`);
      } else {
        console.log(`Subscription plan "${plan.planName}" already exists. Skipping...`);
      }
    }

  // Seed some test articles for all users in the database
    const users = await User.find({});

    await Promise.all(
      users.map( async user => {
        return Promise.all(
          [1,2,3,4,5].map( i =>
            Article.create(
              {
                title: `Test Article ${i}`,
                content: '[{"id":"1j2RxqGMq5","type":"paragraph","data":{"text":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."}}]',
                createdArticles: 'x',
                createdPosts: 'xx',
                author: user._id,
              }
            )));
          }
      )
    );

  } catch (error) {
    console.error('Error seeding  data:', error);
  } finally {
    // Close the database connection
    console.log('Seeding complete. Closing database connection.');
    db.close();
  }

// db.once('open', async () => {
//   //await cleanDB('Thought', 'thoughts');

//   const sub = await Subscription.create(
//     {
//       name: 'my sub',
//       price: 50.90,
//       duration: 100,
//       maxArticles: 100,
//       maxPosts: 50,
//       wordLimit: 1000,
//     }
//   );

//   const user = await User.create(
//     {
//       firstName: 'Q',
//       lastName: 'Test',
//       username: 'qtest',
//       email: 'qtest@gmail.com',
//       password: 'xxx',
//       subscription: sub._id
//     }
//   );

//   await Article.create(
//     {
//       title: 'Sound of Music',
//       createdArticles: 'x',
//       createdPosts: 'xx',
//       author: user._id,
//     }
//   );

  console.log('all done!');
  process.exit(0);
});
