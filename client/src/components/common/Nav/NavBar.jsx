import { Link, useLocation } from "react-router-dom";

import Auth from "../../../utils/auth";

function NavBar() {
  const currentPage = useLocation().pathname;

  return (
    <nav className="navbar">
      <ul>
        <li className={currentPage === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        {/* <li className={currentPage === "/signup" ? "active" : ""}>
          <Link to="/pricing">Pricing</Link>
        </li> */}

        {!Auth.loggedIn() && (
          <>
            <li className={currentPage === "/login" ? "active" : ""}>
              <Link to="/login">Login</Link>
            </li>
            <li className={currentPage === "/signup" ? "active" : ""}>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {Auth.loggedIn() && (
          <>
            <li className={currentPage === "/dashboard" ? "active" : ""}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={currentPage === "/manage-subscriptions" ? "active" : ""}>
              <Link to="/manage-subscriptions">Manage Subscriptions</Link>
            </li>
            <li className="logout">
              <Link to="/" onClick={() => Auth.logout()}>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
