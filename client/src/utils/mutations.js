import { gql } from "@apollo/client";

//--------------------------this file is not complete----------------------------

export const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    $planName: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      planName: $planName
    ) {
      token
      user {
        _id
        firstName
        lastName
        subscription
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        email
        subscription
        articleCount
        wordLimit
        profilePicture
      }
    }
  }
`;

export const UPDATE_USER_EMAIL = gql`
  mutation UpdateUserEmail($email: String!) {
    updateUserEmail(email: $email) {
      firstName
      lastName
      username
      email
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($password: String!) {
    updateUserPassword(password: $password) {
      firstName
      lastName
      username
      email
    }
  }
`;

export const UPDATE_USER_USERNAME = gql`
  mutation UpdateUserUsername($username: String!) {
    updateUserUsername(username: $username) {
      firstName
      lastName
      email
    }
  }
`;

export const SETUP_CHECKOUT_SESSION = gql`
  mutation getCheckout($subscriptionIds: [ID]!) {
    checkout(subscriptionIds: $subscriptionIds) {
      session
    }
  }
`;

export const COMPLETE_PAYMENT = gql`
  mutation completePayment($transactionId: String!) {
    completePayment(transactionId: $transactionId) {
      _id
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation AddPayment($user: ID!, $subscriptionTier: ID!, $amount: Float!) {
    addPayment(
      user: $user
      subscriptionTier: $subscriptionTier
      amount: $amount
    ) {
      _id
      user
      amount
    }
  }
`;

// export const ADD_SUBSCRIPTION = gql`
//   mutation AddSubscription(
//     $name: String!
//     $price: Float!
//     $duration: Int!
//     $maxArticles: Int!
//     $maxPosts: Int!
//     $wordLimit: Int!
//     $features: [String]!
//     $description: String
//   ) {
//     addSubscription(
//       name: $name
//       price: $price
//       duration: $duration
//       maxArticles: $maxArticles
//       maxPosts: $maxPosts
//       wordLimit: $wordLimit
//       features: $features
//       description: $description
//     ) {
//       _id
//       name
//       price
//       duration
//       maxArticles
//       maxPosts
//       wordLimit
//       features
//       description
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const RENEW_SUBSCRIPTION = gql`
  mutation RenewSubscription($id: ID!) {
    renewSubscription(id: $id) {
      _id
      name
      status
      renewedDate
      expiryDate
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($id: ID!) {
    cancelSubscription(id: $id) {
      _id
      planName
      features
    }
  }
`;

export const CHANGE_SUBSCRIPTION_PLAN = gql`
  mutation ChangeSubscriptionPlan($planName: String!, $subscriptionId: ID, $price: Float, $features: [String]) {
    changeSubscriptionPlan(planName: $planName, subscriptionId: $subscriptionId, price: $price, features: $features) {
      _id
      user {
        _id
      }
      subscription {
        _id
        planName
      }
    }
  }
`;

export const GENERATE_OUTLINE = gql`
  mutation GenerateOutline(
    $topic: String!
    $tone: String!
    $keywords: String!
    $desiredWordCount: Int!
  ) {
    generateOutline(
      topic: $topic
      tone: $tone
      keywords: $keywords
      desiredWordCount: $desiredWordCount
    )
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $id: ID!
    $title: String!
    $content: String!
    $outline: String
    $createdArticles: String!
    $createdPosts: String!
  ) {
    updateArticle(
      id: $id
      title: $title
      content: $content
      outline: $outline
      createdArticles: $createdArticles
      createdPosts: $createdPosts
    ) {
      _id
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation addArticle(
    $title: String!
    $content: String!
    $outline: String
    $createdArticles: String!
    $createdPosts: String!
  ) {
    addArticle(
      title: $title
      content: $content
      outline: $outline
      createdArticles: $createdArticles
      createdPosts: $createdPosts
    ) {
      _id
      title
      content
      author
    }
  }
`;

// export const SAVE_DRAFT_ARTICLE = gql`
//   mutation SaveDraftArticle($id: String!, $content: String!) {
//     saveDraftArticle(id: $id, content: $content) {
//       id
//       content
//       createdAt
//       updatedAt
//     }
//   }
// `;
