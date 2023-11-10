import React, { useState, useEffect } from "react";
import subscriptionPlansData from "./data/subscriptionPlans.json";
import styles from "./css/Chart.module.css";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(subscriptionPlansData.subscriptionPlans);
  }, []);

  return (
    <div className={styles.subscriptionPlans}>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price USD</th>
            <th>Article Count</th>
            <th>Roll-Overs</th>
            <th>Social Media Generation</th>
            <th>Length Limit (Articles)</th>
            <th>Collaboration Tools</th>
            <th>Content Export</th>
            <th>Support</th>
            <th>Training & Onboarding</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={index}>
              {Object.entries(plan).map(([key, value]) => (
                <td
                  key={key}
                  data-label={key.replace(/([A-Z])/g, " $1").trim()}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionPlans;
