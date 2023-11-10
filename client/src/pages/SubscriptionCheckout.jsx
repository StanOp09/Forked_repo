import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SETUP_CHECKOUT_SESSION } from '../utils/mutations';
import { loadStripe } from '@stripe/stripe-js';

import styles from './SubscriptionCheckout.module.css';
import { useParams } from 'react-router-dom';

// Configure Stripe with your publishable key
// where did this key come from? const stripePromise = loadStripe('pk_test_51O7kJ2FMjn7SUYBELYF0oaxA3CdrDxuF34fgn6HgEAIHq77JPM6fzWfo0lXJeaA02d61KancPsjleWr6N8NSWAT8006y3tUfEb');

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function SubscriptionCheckout() {
  const { subscriptionId } = useParams();
  const [setupCheckoutSession] = useMutation(SETUP_CHECKOUT_SESSION);

  useEffect(() => {
    stripePromise.then(async (res) => {
      const {data} = await setupCheckoutSession(
        {
          variables: {
            subscriptionIds: [subscriptionId]
          }
        }
      );
      
      res.redirectToCheckout({ sessionId: data.checkout.session });
    });
  }, []);

  return (
    <div className={styles.container}>
      Redirecting to the checkout page...
    </div>
  );
}

export default SubscriptionCheckout;
