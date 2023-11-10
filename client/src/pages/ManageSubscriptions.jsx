import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_SUBSCRIPTIONS, GET_SUBSCRIPTIONS } from '../utils/queries';
import { CHANGE_SUBSCRIPTION_PLAN, CANCEL_SUBSCRIPTION } from '../utils/mutations';

const ManageSubscriptions = () => {
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const { loading, data } = useQuery(GET_MY_SUBSCRIPTIONS);
  const [getSubscriptions, setGetSubscriptions] = useState([]);
  const { data: plansData } = useQuery(AVAILABLE_PLANS);
  
  const [changeSubscriptionPlan] = useMutation(CHANGE_SUBSCRIPTION_PLAN);
  const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      setMySubscriptions(data.mySubscriptions);
    }
    if (plansData) {
      setGetSubscriptions(plansData.getSubscriptions);
    }
  }, [data, plansData]);

  const handleChangePlan = async (subscriptionId, newPlanId) => {
    try {
      const response = await changeSubscriptionPlan({
        variables: { subscriptionId, newPlanId },
      });
      // Update local state or re-fetch queries as needed
      console.log('Plan changed!', response);
    } catch (error) {
      console.error('Error changing plan', error);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      const response = await cancelSubscription({
        variables: { subscriptionId },
      });
      // Update local state or re-fetch queries as needed
      console.log('Subscription cancelled!', response);
    } catch (error) {
      console.error('Error cancelling subscription', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Manage Subscriptions</h2>
      {mySubscriptions.map((subscription) => (
        <div key={subscription._id} className="subscription-details">
          <h3>{subscription.name}</h3>
          {/* Displaying detailed information about the subscription */}
          <p><strong>Plan:</strong> {subscription.planName}</p>
          <p><strong>Price:</strong> ${subscription.price.toFixed(2)} per {subscription.duration} month(s)</p>
          <p><strong>Articles Allowed:</strong> {subscription.articlesLimit}</p>
          <p><strong>Posts Allowed:</strong> {subscription.postsLimit}</p>
          <p><strong>Word Limit per Post:</strong> {subscription.wordLimit}</p>
          <p><strong>Duration:</strong> {subscription.duration} month(s)</p>
          <p><strong>Active Until:</strong> {new Date(subscription.endDate).toLocaleDateString()}</p>

          <div className="change-plan">
            <label htmlFor={`newPlan-${subscription._id}`}>Change Plan:</label>
            <select
              name={`newPlan-${subscription._id}`}
              id={`newPlan-${subscription._id}`}
              onChange={(e) => handleChangePlan(subscription._id, e.target.value)}
            >
              <option value="">Select new plan</option>
              {getSubscriptions.map((plan) =>
                plan._id !== subscription._id && (
                  <option key={plan._id} value={plan._id}>
                    {plan.name} - ${plan.price.toFixed(2)} per {plan.duration} month(s)
                  </option>
                )
              )}
            </select>
          </div>

          <button
            onClick={() => handleCancelSubscription(subscription._id)}
            className="cancel-button"
          >
            Cancel Subscription
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageSubscriptions;
