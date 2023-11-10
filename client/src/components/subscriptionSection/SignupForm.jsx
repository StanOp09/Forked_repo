// import { useQuery } from "@apollo/client";
import styles from "./css/SignupFrom.module.css";

const SignupForm = ({ onChange, onSubmit, values, plans }) => {
  // You should also handle the case where plans data isn't available yet
  if (!plans || plans.length === 0) {
    return <p>Loading plans...</p>;
  }

  return (
    <form className={styles.signupForm} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder="First Name"
        name="firstName"
        type="text"
        value={values.firstName}
        onChange={onChange}
      />
      <input
        className={styles.input}
        placeholder="Last Name"
        name="lastName"
        type="text"
        value={values.lastName}
        onChange={onChange}
      />
      <input
        className={styles.input}
        placeholder="Username"
        name="username"
        type="text"
        value={values.username}
        onChange={onChange}
      />
      <input
        className={styles.input}
        placeholder="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={onChange}
      />
      <input
        className={styles.input}
        placeholder="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={onChange}
      />
      <select
        className={styles.input}
        name="subscriptionId"
        value={values.subscriptionId}
        onChange={onChange}
      >
        <option value="">Select a plan</option>
        {plans.map(plan => (
          <option key={plan._id} value={plan._id}>
            {plan.name} - ${plan.price}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.submitButton}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
