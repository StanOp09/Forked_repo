import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RENEW_SUBSCRIPTION, CANCEL_SUBSCRIPTION } from '../utils/mutations';

function RenewCancelSubscription() {
  const [renewSubscription, { data: renewData, loading: renewLoading, error: renewError }] = useMutation(RENEW_SUBSCRIPTION);
  const [cancelSubscription, { data: cancelData, loading: cancelLoading, error: cancelError }] = useMutation(CANCEL_SUBSCRIPTION);

  const [subscriptionId, setSubscriptionId] = useState('');

  const handleRenew = async () => {
    try {
      await renewSubscription({ variables: { id: subscriptionId } });
      // Handle renew success, such as showing a success message or updating the state
    } catch (e) {
      // Handle renew error
      console.error("Error renewing the subscription:", e);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelSubscription({ variables: { id: subscriptionId } });
      // Handle cancel success
    } catch (e) {
      // Handle cancel error
      console.error("Error canceling the subscription:", e);
    }
  };

  return (
    <div>
      <h1>Manage Your Subscription</h1>
      <input 
        type="text" 
        value={subscriptionId} 
        onChange={(e) => setSubscriptionId(e.target.value)} 
        placeholder="Enter Subscription ID"
      />
      <div>
        <button onClick={handleRenew} disabled={renewLoading}>
          {renewLoading ? 'Renewing...' : 'Renew Subscription'}
        </button>
        <button onClick={handleCancel} disabled={cancelLoading}>
          {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
        </button>
      </div>
      {renewError && <p>Error renewing subscription: {renewError.message}</p>}
      {cancelError && <p>Error cancelling subscription: {cancelError.message}</p>}
      {renewData && <p>Subscription renewed successfully!</p>}
      {cancelData && <p>Subscription cancelled successfully!</p>}
    </div>
  );
}

export default RenewCancelSubscription;
