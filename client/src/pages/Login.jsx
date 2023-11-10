import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import SignInForm from "../components/signinSection/SignInForm";

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [signinState, setSigninState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    // Redirect to home if already logged in
    if (Auth.loggedIn()) {
      navigate("/"); // Redirect to the homepage
    }
  }, [navigate]); // Dependency array with navigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSigninState({
      ...signinState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Attempting login with:", signinState);
      const { data } = await login({
        variables: { ...signinState },
      });
      console.log("Login response data:", data);
      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);
        // TODO: Redirect to checkout if they bought a non free subscription
        // and haven't paid
        navigate("/"); // Redirect to the homepage after login
      } else {
        console.error("No token received:", data);
      }
      navigate("/"); // Redirect to the homepage after login
    } catch (e) {
      console.error("Login error:", e);
    }
    // Reset signinState if needed, or remove this if you want the fields to retain their data
    setSigninState({
      email: "",
      password: "",
    });
  };

  // If logged in, the user should never see the form because they’re redirected
  // You may choose to remove this check since useEffect handles the redirection
  if (Auth.loggedIn()) {
    return (
      <p>You are already logged in and will be redirected to the homepage.</p>
    );
  }

  // The form to log in
  return (
    <SignInForm
      signinState={signinState}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
      error={error}
    />
  );
};

export default Login;
