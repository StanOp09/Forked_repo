import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "../utils/queries";
import { useNavigate } from "react-router-dom";

function SubscriptionsList() {
  const { loading, data } = useQuery(GET_SUBSCRIPTIONS);
  const subscriptions = data?.getSubscriptions || [];

  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate("signup", { state: { selectedPlan: plan } });
  };

  if (loading) return <div>Loading subscriptions...</div>;

  return (
    <div>
      <h1>Choose Your Subscription Plan</h1>
      <div className="subscription-list">
        {subscriptions.map((subscription) => (
          <div key={subscription._id} className="subscription-card">
            <h3>{subscription.name}</h3>
            <p>Price: ${subscription.price.toFixed(2)}</p>
            <p>Duration: {subscription.duration} days</p>
            {/* Other details */}
            <button>Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SubscriptionsList;
