import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Import Components
import SubscriptionCard from "../components/subscriptionSection/SubscriptionCard";
import SignupForm from "../components/subscriptionSection/SignupForm";
import SubscriptionPlans from "../components/subscriptionSection/Chart";

// Import Data
// import subscriptionPlans from "../components/subscriptionSection/data/subscriptionPlans.json";
import planFeaturesData from "../components/subscriptionSection/data/planFeatures.json";
const { planFeatures } = planFeaturesData;

// Importing Styles
import styles from "./Signup.module.css";

// const [submissionError, setSubmissionError] = useState('');

// GraphQL
import { useQuery, useMutation } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "../utils/queries";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  debugger;
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, data } = useQuery(GET_SUBSCRIPTIONS);
  console.log(loading);
  console.log(data);
  const [addUser, { error: addUserError }] = useMutation(ADD_USER);

  // const { subscriptionPlans: plans } = subscriptionPlans;
  // const { planFeatures } = planData;

  // Extract the selected plan details from the location state if it exists
  // const selectedPlan = location.state?.selectedPlan || {};

  // const [selectedPlanName, setSelectedPlanName] = useState("Free");
  const [plans, setPlans] = useState([]);

  const [signupState, setSignupState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    planName: "",
    // subscriptionId: "",
    // subscription: selectedPlan.name || "", // Default to the plan name if provided
  });
  // const [addUser, { error }] = useMutation(ADD_USER);

  // Effect hook to pre-load the selected plan if it comes from the subscription selection
  // useEffect(() => {
  //   if (selectedPlan.name) {
  //     setSignupState(prevState => ({
  //       ...prevState,
  //       subscription: selectedPlan.name,
  //     }));
  //   }
  // }, [selectedPlan]);

  // useEffect(() => {
  //   if (data && data.getSubscriptions) {
  //     setPlans(data.getSubscriptions);
  //     setSignupState(prevState => ({
  //       ...prevState,
  //       planName: data.getSubscriptions[0].planName
  //     }));
  //   }
  // }, [data]);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setSignupState({
  //     ...signupState,
  //     [name]: value,
  //   });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupState(prevState => ({ ...prevState, [name]: value }));
    if (name === 'planName') {
      // If the name of the event target is 'planName', we update the state accordingly
      setSignupState(prevState => ({ ...prevState, planName: value }));
    }
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(signupState);

  //   try {
  //     const { data } = await addUser({
  //       variables: { ...signupState, planName: selectedPlanName },
  //     });
  //   // } else {
  //   //   // Create user account and redirect to dashboard for free plans
  //   //   try {
  //   //     const { data } = await addUser({
  //   //       variables: { ...signupState },
  //   //     });
  //       Auth.login(data.addUser.token); // Assuming Auth.login will handle token storage and redirection
  //       const subscriptionId = data.addUser.user.subscription;
  //       if (selectedPlanName === "Free") {
  //         navigate("/dashboard"); // Redirect to the dashboard for free plans
  //       } else {
  //         navigate(`/subscription-checkout/${subscriptionId}`);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...signupState, planName: signupState.planName, } });
      Auth.login(data.addUser.token);
      if (signupState.planName && signupState.planName !== 'Free') {
        navigate(`/subscription-checkout/${signupState.planName}`);
      } else {
        navigate('/dashboard');
      }
    } catch (e) {
      console.error('Signup error:', e);
      // setSubmissionError(e.message || 'An error occurred during signup. Please try again.');
    }
  };
debugger;
  if (loading) return <p>Loading subscription plans...</p>;
  if (queryError) return <p>Error loading subscription plans! {queryError.message}</p>;

  return (
    <div className={styles.signupContainer}>
      <div className={styles.subscriptionCardsContainer}>
        {planFeatures.map((plan) => (
          <SubscriptionCard
            key={plan.planName}
            plan={plan}
            onClick={() => setSignupState({ ...signupState, planName: plan.planName })}
            isSelected={plan._id === signupState.planName}
          />
        ))}
      </div>
      {/* I left signup form here for now, but I wanted to run the idea by where we put buttons underneath each of the plans in the subscriptionc card (near the end) and have them attached to the actual plan they sign up for, once they press it, it will bring up where they can put in their information, and when they press submit, it will bring them to stripe. All up to you though! :) */}
      <SignupForm
        onChange={handleChange}
        onSubmit={handleFormSubmit}
        values={signupState}
        plans = {plans}
      />
      <SubscriptionPlans />
      {addUserError && <p className={styles.error}>Signup error: {addUserError.message}</p>}
      {/* {error && <p className={styles.error}>{error.message}</p>} */}
      {/* {submissionError && <p className={styles.error}>Signup error: {submissionError}</p>} */}
    </div>
  );
};

export default Signup;

// Dynamic Plan Name & Features
// You'll need to create a state in your sign-up component that holds the currently selected plan and its details. When a user selects a different plan from the dropdown, you should update this state. This could come from a list of plans possibly fetched from an API

// const [selectedPlan, setSelectedPlan] = useState(plans[0]);

// Dropdown of Other Plans
// A dropdown menu can be implemented with each option being a different plan available. When an option is selected, the selectedPlan state should be updated.

{
  /* <select onChange={(e) => setSelectedPlan(plans[e.target.value])}>
  {plans.map((plan, index) => (
    <option value={index} key={plan.id}>{plan.name}</option>
  ))}
</select>  */
}

// Signup Form
// The form should collect user input for the first name, last name, username, email, and password. On submit, it should send this data along with the selected plan to the backend.

{
  /* <form onSubmit={handleSignup}>
  <input type="text" placeholder="First Name" required />
  <input type="text" placeholder="Last Name" required />
  <input type="text" placeholder="Username" required />
  <input type="email" placeholder="Email Address" required />
  <input type="password" placeholder="Password" required />
  <button type="submit">Submit</button>
</form>; */
}

// const [selectedPlanName, setSelectedPlanName] = useState("Free");

// const [signupState, setSignupState] = useState({
//   firstName: "",
//   lastName: "",
//   username: "",
//   email: "",
//   password: "",
//   subscription: "",
// });
// const [addUser, { error }] = useMutation(ADD_USER);

// Stripe Integration for Payment
// Stripe's SDK on the page, creating a payment form, and using Stripe's API to create charges. Create secure payment intents and process transactions.

// const handleFormSubmit = async (event) => {
//   event.preventDefault();
//   console.log(signupState);

//   try {
//     const { data } = await addUser({
//       variables: { ...signupState, planName: selectedPlanName },
//     });
//     Auth.login(data.addUser.token);
//   } catch (e) {
//     console.error(e);
//   }
// };

// return (
//   <div className={styles.signupContainer}>
//     <div className={styles.subscriptionCardsContainer}>
//       {planFeatures.map((plan) => (
//         <SubscriptionCard key={plan.planName} plan={plan}
//           onClick={() => setSelectedPlanName(plan.planName)}
//           isSelected={plan.planName === selectedPlanName}
//           />
//       ))}
//     </div>
{
  /* I left signup form here for now, but I wanted to run the idea by where we put buttons underneath each of the plans in the subscriptionc card (near the end) and have them attached to the actual plan they sign up for, once they press it, it will bring up where they can put in their information, and when they press submit, it will bring them to stripe. All up to you though! :) */
}
//       <SignupForm
//         onChange={handleChange}
//         onSubmit={handleFormSubmit}
//         values={signupState}
//       />
//       <SubscriptionPlans />

//       {error && <p className={styles.error}>{error.message}</p>}
//     </div>
//   );
// };

// export default Signup;

// Left this here for comparision - i think i put it all back the same but definitely requires verification lol
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

// const Signup = () => {
//   const [signupState, setSignupState] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     subscription: "",
//   });
//   const [addUser, { error, data }] = useMutation(ADD_USER);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setSignupState({
//       ...signupState,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(signupState);

//     try {
//       const { data } = await addUser({
//         variables: { ...signupState },
//       });

//       Auth.login(data.addUser.token);
//     } catch (e) {
//       console.error(e);
//     }

//     setSignupState({
//       firstName: "",
//       lastName: "",
//       username: "",
//       email: "",
//       password: "",
//       subscription: "",
//     });
//   };
//   const subscriptionOptions = [
//     "Free",
//     "Standard",
//     "Advanced",
//     "Professional",
//     "Premium",
//   ];

//   return (
//     <div>
//       {data ? (
//         <p>
//           Success! You may now head <Link to="/">back to the homepage.</Link>
//         </p>
//       ) : (
//         <div>
//           <input
//             className="form-input"
//             placeholder="First Name"
//             name="firstName"
//             type="text"
//             value={signupState.firstName}
//             onChange={handleChange}
//           />
//           <input
//             className="form-input"
//             placeholder="Last Name"
//             name="lastName"
//             type="text"
//             value={signupState.lastName}
//             onChange={handleChange}
//           />
//           <input
//             className="form-input"
//             placeholder="Username"
//             name="username"
//             type="text"
//             value={signupState.username}
//             onChange={handleChange}
//           />
//           <input
//             className="form-input"
//             placeholder="Email Address"
//             name="email"
//             type="email"
//             value={signupState.email}
//             onChange={handleChange}
//           />
//           <input
//             className="form-input"
//             placeholder="******"
//             name="password"
//             type="password"
//             value={signupState.password}
//             onChange={handleChange}
//           />
//           {/* Will need to connect this to payment (if not free plan), & backend to set article, word & social post limits etc. & update database, Also ensure to send confirmation email to customer confirming their subscription choice and provide any additional details or instructions if needed :) */}
//           <label htmlFor="subscription">Subscription Plan</label>
//           <select
//             id="subscription"
//             name="subscription"
//             value={signupState.subscription}
//             onChange={handleChange}
//           >
//             <option value="">Select a subscription option</option>
//             {subscriptionOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleFormSubmit}>Submit</button>
//           {error && <p>{error.message}</p>}{" "}
//           {/* Check if error exists before displaying it */}
//         </div>
//       )}
//     </div>
//   );
// };

// Plan Information Display
// The details of the plan selected should be displayed to the user dynamically. You can use the selectedPlan state to display the information.

{
  /* <div>
  <h2>{selectedPlan.name}</h2>
  <p>{selectedPlan.price}</p>
  <ul>
    {selectedPlan.features.map((feature) => (
      <li key={feature}>{feature}</li>
    ))}
  </ul>
</div> */
}

// Signup container matching canva design

// .signupContainer {
//   background-image: url('path-to-your-image.jpg');
//   background-size: cover;
//   display: flex;
//   justify-content: space-between;
//   padding: 50px;
// }

// /* Add media queries for responsiveness */
// @media (max-width: 768px) {
//   .signupContainer {
//     flex-direction: column;
//   }
// }
