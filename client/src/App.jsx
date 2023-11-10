// Apollo Client Configuration
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";

// Error handling link
const errorLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }),
]);

// React-Router-Dom Integration
import { Outlet } from "react-router-dom";



// Component Level Imports
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";

// Apollo Server Connection Setup
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authenticationLink = setContext((_, { headers }) => {
  const retrievedToken = localStorage.getItem("user_token");
  console.log("Token from localStorage inside middleware", retrievedToken);

  // Check if the token is actually a non-empty string
  // if (retrievedToken && retrievedToken !== "") {
  //   console.log(`Authorization Header: Bearer ${retrievedToken}`);
  // } else {
  //   console.warn(
  //     "No token available or token is empty string when setting headers"
  //   );
  // }

  return {
    headers: {
      ...headers,
      authorization: retrievedToken ? `Bearer ${retrievedToken}` : "",
    },
  };
});

const logResponseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // console.log(
    //   `[GraphQL response]: Operation ${operation.operationName}`,
    //   response
    // );
    return response;
  });
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // console.log("Incoming response:", response);
    return response;
  });
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    authenticationLink,
    afterwareLink,
    logResponseLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
export { apolloClient };
