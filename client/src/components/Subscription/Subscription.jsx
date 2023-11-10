import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SUBSCRIPTION} from '../../utils/mutations';

const Subscription = ({ subscription }) => {
  const [addSubscriptionToUser, { error }] = useMutation(ADD_SUBSCRIPTION);

  const handleSubscribe = async () => {
    try {
      await addSubscriptionToUser({
        variables: { subscriptionId: subscription._id }
      });
      // Handle successful subscription logic here (e.g., show a confirmation message)
    } catch (e) {
      console.error('Error subscribing to the plan', e);
      // Handle errors here (e.g., display an error message)
    }
  };

  if (error) {
    // Handle subscription error (e.g., display an error message)
    console.error('Error while subscribing:', error.message);
  }

  return (
    <div className="subscription">
      <h3>{subscription.name}</h3>
      <p>Price: ${subscription.price.toFixed(2)} / {subscription.duration} days</p>
      <p>Max Articles: {subscription.maxArticles}</p>
      <p>Max Posts: {subscription.maxPosts}</p>
      <p>Word Limit: {subscription.wordLimit}</p>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Subscription;
