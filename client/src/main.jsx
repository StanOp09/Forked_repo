import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import dependancies & styling
import App from "./App.jsx";
import "./index.css";

//Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";
import ManageSubscriptions from "./pages/ManageSubscriptions.jsx";
import RenewCancelSubscription from "./pages/RenewCancelSubscription.jsx";
import SubscriptionCheckout from "./pages/SubscriptionCheckout.jsx";
import SubscriptionsList from "./pages/SubscriptionsList.jsx";
import SubscriptionSuccess from "./pages/SubscriptionSuccess.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Article from "./pages/Article.jsx";
import Error from "./pages/Error";
// import Pricing from "./pages/Pricing.jsx";
// import Profile from "./pages/Profile.jsx";

// Import Components
import SideNav from "./components/common/Nav/SideNav";
// import ProfileEditComponent from "./components/common/editProfile.jsx";

// Import Menu arrays
// import dashboardMenu from "./components/common/Nav/data/dashboardMenu.js";
// import profileMenu from "./components/common/Nav/data/profileMenu.js";
// import articleMenu from "./components/common/Nav/data/articleMenu.js";
// import subscriptionMenu from "./components/common/Nav/data/subscriptionMenu.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/manage-subscriptions",
        element: <ManageSubscriptions />,
      },
      {
        path: "/renew-cancel-subscription",
        element: <RenewCancelSubscription />,
      },
      {
        path: "/subscription-checkout/:subscriptionId",
        element: <SubscriptionCheckout />,
      },
      {
        path: "/subscriptions-list",
        element: <SubscriptionsList />,
      },
      {
        path: "/subscription-success/:subscriptionId/:transactionId",
        element: <SubscriptionSuccess />,
      },
      {
        path: "/edit-article/:articleId",
        element: <Article />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "/subscription",
      //   element: <Subscription />,
      //   children: [
      //     {
      //       element: <SideNav items={subscriptionMenu} />,
      //     },
      //   ],
      // },
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      //   children: [
      //     {
      //       element: <SideNav items={dashboardMenu} />,
      //     },
      //   ],
      // },
      // // Once we have a view all besides dashboard view, this will become landing page for viewing all articles
      // {
      //   path: "/generate-articles",
      //   element: <AllArticles />,
      //   children: [
      //     {
      //       element: <SideNav items={articleMenu} />,
      //     },
      //   ],
      // },
      // {
      //   // Once we have a view all besides dashboard view, this will become landing page for profile information
      //   path: "/profile",
      //   element: <Profile />,
      //   children: [
      //     {
      //       element: <SideNav items={profileMenu} />,
      //     },
      //   ],
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// {
//   path: "/",
//   element: <App />,
//   error: <Error />,
//   children: [
//     {
//       index: true,
//       element: <Home />,
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/signup",
//       element: <Signup />,
//     },
//     {
//       path: "/subscription",
//       element: <Subscription />,
//     },
//     {
//       path: "/manage-subscriptions",
//       element: <ManageSubscriptions />,
//     },
//     {
//       path: "/renew-cancel-subscription",
//       element: <RenewCancelSubscription />,
//     },
//     {
//       path: "/subscription-checkout",
//       element: <SubscriptionCheckout />,
//     },
//     {
//       path: "/subscriptions-list",
//       element: <SubscriptionsList />,
//     },
//     {
//       path: "/subscription-success",
//       element: <SubscriptionSuccess />,
//     },
//     {
//       path: "/edit-article/:articleId",
//       element: <Article />,
//     },
//     {
//       path: "/dashboard",
//       element: <Dashboard />,
//     },
//   ],
// },
// ]);
