import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SUBSCRIPTIONS } from '../utils/queries';

function SubscriptionComparison() {
  const { loading, data, error } = useQuery(GET_SUBSCRIPTIONS);
  const subscriptions = data?.getSubscriptions || [];

  if (loading) return <div>Loading comparison...</div>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="subscription-comparison">
      <h1>Compare Subscription Plans</h1>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            {subscriptions.map(subscription => (
              <th key={subscription._id}>{subscription.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            {subscriptions.map(subscription => (
              <td key={subscription._id}>${subscription.price.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Duration (days)</td>
            {subscriptions.map(subscription => (
              <td key={subscription._id}>{subscription.duration}</td>
            ))}
          </tr>
          {/* Add additional features to compare here */}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionComparison;

// NOTE: add any additional CSS styles for .subscription-comparison and .comparison-table in your CSS file to ensure the table is displayed well on all screen sizes.