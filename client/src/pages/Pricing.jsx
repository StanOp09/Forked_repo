import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Import Components
import SubscriptionCard from "../components/subscriptionSection/SubscriptionCard";
import SignupForm from "../components/subscriptionSection/SignupForm";
import SubscriptionPlans from "../components/subscriptionSection/Chart";

// Import Data
import subscriptionPlans from "../components/subscriptionSection/data/subscriptionPlans.json";
import planData from "../components/subscriptionSection/data/planFeatures.json";

// Importing Styles
import styles from "./Signup.module.css";

// GraphQL
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addUser, { error }] = useMutation(ADD_USER);

  const { subscriptionPlans: plans } = subscriptionPlans;
  const { planFeatures } = planData;

  // Extract the selected plan details from the location state if it exists
  const selectedPlan = location.state?.selectedPlan || {};
  const [signupState, setSignupState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    subscription: selectedPlan.name || "", // Default to the plan name if provided
  });

  // const [addUser, { error }] = useMutation(ADD_USER);
  // Effect hook to pre-load the selected plan if it comes from the subscription selection
  useEffect(() => {
    if (selectedPlan.name) {
      setSignupState((prevState) => ({
        ...prevState,
        subscription: selectedPlan.name,
      }));
    }
  }, [selectedPlan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupState({
      ...signupState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(signupState);

    try {
      const { data } = await addUser({
        variables: { ...signupState },
      });
      Auth.login(data.addUser.token); // Assuming Auth.login will handle token storage and redirection

      // Redirect to the SubscriptionCheckout page for paid plans
      if (selectedPlan.isPaid) {
        navigate("/subscription-checkout", {
          state: { selectedPlan, userDetails: data.addUser.user },
        });
      } else {
        // Redirect to the home page for free plans
        navigate("/dashboard"); // Redirect to the dashboard for free plans
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.subscriptionCardsContainer}>
        {planFeatures.map((plan) => (
          <SubscriptionCard key={plan.planName} plan={plan} />
        ))}
      </div>
      <SignupForm
        onChange={handleChange}
        onSubmit={handleFormSubmit}
        values={signupState}
      />
      <SubscriptionPlans />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Signup;

// import { useState } from "react";

// // Import Components
// import SubscriptionCard from "../components/subscriptionSection/SubscriptionCard";
// import SignupForm from "../components/subscriptionSection/SignupForm";
// import SubscriptionPlans from "../components/subscriptionSection/Chart";

// // Import Data
// import subscriptionPlans from "../components/subscriptionSection/data/subscriptionPlans.json";
// import planData from "../components/subscriptionSection/data/planFeatures.json";

// // Importing Styles
// import styles from "./Signup.module.css";

// // GraphQL
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

// const Signup = () => {
//   const { subscriptionPlans: plans } = subscriptionPlans;
//   const { planFeatures } = planData;

//   const [signupState, setSignupState] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     subscription: "",
//   });
//   const [addUser, { error }] = useMutation(ADD_USER);

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
//   };

//   return (
//     <div className={styles.signupContainer}>
//       <div className={styles.subscriptionCardsContainer}>
//         {planFeatures.map((plan) => (
//           <SubscriptionCard key={plan.planName} plan={plan} />
//         ))}
//       </div>
//       {/* I left signup form here for now, but I wanted to run the idea by where we put buttons underneath each of the plans in the subscriptionc card (near the end) and have them attached to the actual plan they sign up for, once they press it, it will bring up where they can put in their information, and when they press submit, it will bring them to stripe. All up to you though! :) */}
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

// export default Signup;
