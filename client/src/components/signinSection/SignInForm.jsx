import styles from "./SignInForm.module.css";

const SignInForm = ({ signinState, handleChange, handleFormSubmit, error }) => (
  <div className={styles.signInFormContainer}>
    <form className={styles.signInForm} onSubmit={handleFormSubmit}>
      <input
        className={styles.formInput}
        placeholder="Email Address"
        name="email"
        type="email"
        value={signinState.email}
        onChange={handleChange}
      />
      <input
        className={styles.formInput}
        placeholder="Password"
        name="password"
        type="password"
        value={signinState.password}
        onChange={handleChange}
      />
      <button type="submit" className={styles.submitButton}>
        Sign In
      </button>
      {error && <div className={styles.errorMessage}>{error.message}</div>}
    </form>
  </div>
);

export default SignInForm;
