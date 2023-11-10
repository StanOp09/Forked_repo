import { gql } from "@apollo/client";

//--------------------------this file is not complete----------------------------

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      _id
      firstName
      lastName
      username
      email
    }
  }
`;

export const GET_ONE_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($articleId: ID!) {
    getArticle(id: $articleId) {
      _id
      title
      content
      outline
      createdArticles
      createdPosts
      author
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles {
    getArticles {
      _id
      title
      author
    }
  }
`;

export const GET_PAYMENTS = gql`
  query GetPayments {
    getPayments {
      user
      amount
      paymentDate
    }
  }
`;

export const GET_SUBSCRIPTIONS = gql`
   {
    getSubscriptions {
      _id
      planName
      price
      features
      maxArticles
      maxPosts
      wordLimit
      createdAt
      updatedAt
    }
  }
`;



// export const AVAILABLE_PLANS = gql`
//   query AvailablePlans {
//     availablePlans {
//       _id
//       name
//       price
//       duration
//     }
//   }
// `;

export const GET_MY_SUBSCRIPTIONS = gql`
  query GetMySubscriptions {
    mySubscriptions {
      _id
      planName
      price
      features
    }
  }
`;

export const GET_SUBSCRIPTION = gql`
  query GetSubscription($id: ID!) {
    getSubscription(id: $id) {
      _id
      planName
      price
      features
    }
  }
`;

export const FETCH_IMAGE = gql`
  query FetchImage($imageName: String!) {
    fetchImage(imageName: $imageName) {
      imageName
      contentType
      data
    }
  }
`;

// export const GET_DRAFT_ARTICLE = gql`
//   query GetDraftArticle($id: String!) {
//     draftArticle(id: $id) {
//       id
//       content
//       createdAt
//       updatedAt
//     }
//   }
// `;