import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SUBSCRIPTION } from '../utils/queries';
import { COMPLETE_PAYMENT } from '../utils/mutations';

function SubscriptionSuccess() {
  const { subscriptionId, transactionId } = useParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const { loading, error, data } = useQuery(GET_SUBSCRIPTION, {
    variables: { id: subscriptionId },
  });
  const [completePayment] = useMutation(COMPLETE_PAYMENT);

  useEffect(() => {
    async function setComplete() {
      await completePayment(
        {
          variables: {
            transactionId
          }
        });
    }

    setComplete();
  }, []);

  useEffect(() => {
    if (data) {
      setSubscriptionDetails(data.getSubscription);
    }
  }, [data]);

  if (loading) return <div>Loading subscription details...</div>;
  if (error) return <div>Error loading subscription details!</div>;

  return (
    <div>
      <h1>Thank You for Your Subscription!</h1>
      {subscriptionDetails && (
        <div>
          <p>You have successfully subscribed to:</p>
          <h3>{subscriptionDetails.name}</h3>
          <p>Price: ${subscriptionDetails.price}</p>
          <p>Duration: {subscriptionDetails.duration} months</p>
          {/* Additional details can be added here */}
        </div>
      )}
      {/* Add any additional confirmation details or next steps */}
    </div>
  );
}

export default SubscriptionSuccess;
