const typeDefs = `

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    planName: String!
    # subscription: Subscription!
    articleCount: Int
    wordLimit: Int
    nextResetDate: String
    profilePicture: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Article {
    _id: ID
    title: String!
    content: String!
    outline: String
    createdArticles: String!
    createdPosts: String!
    author: ID!
  }

  type Checkout {
    session: ID
  }

  type Payment {
    _id: ID
    user: User!
    subscriptionTier: Subscription!
    amount: Float!
    paymentDate: String
  }

  type Subscription {
    _id: ID
    planName: String!
    price: Float!
    features: [String]!
    maxArticles: Int
    maxPosts: Int
    wordLimit: Int
  }

  type OutlineResponse {
    outline: String
    errors: [String]
  }
  
  input StructuredInput {
    structure: StructureInput
    originalText: String
  }
  
  input StructureInput {
    sections: [SectionInput] # Array of SectionInput, which you've defined below
  }
  
  input SectionInput {
    id: ID
    sectionTitle: String
    subSections: [SubSectionInput] # Array of SubSectionInput, which you've defined below
  }
  
  input SubSectionInput {
    id: ID
    subTitle: String
    content: String
  }
  
  type Structure {
    sections: [Section] # Array of Section, which should be defined as a type below
  }
  
  type Section {
    id: ID
    sectionTitle: String
    subSections: [SubSection] # Array of SubSection, which should be defined as a type below
  }
  
  type SubSection {
    id: ID
    subTitle: String
    content: String
  }
  
  input UserDecisionsInput {
    # Placeholder field, replace with actual fields later
    dummyField: String
  }
  
  type ArticleResponse {
    success: Boolean!
    message: String
    article: Article
  }  

  type Image {
    imageName: String!
    contentType: String!
    data: String!
  }

  type Query {
    me: User
    
    #fetchData: ResultType (to be defined)
    users: [User]
    user(username: String!): User

    getArticles: [Article]
    getArticle(id: ID!): Article
    getPayments: [Payment]
    getSubscription(id: ID!): Subscription
    getSubscriptions: [Subscription]
 
    getOutline(topic: String!, tone: String!, keywords: [String!]!, desiredWordCount: Int!): OutlineResponse
    correctOutline(structuredData: StructuredInput!, userDecisions: UserDecisionsInput!): String

    fetchImage(imageName: String!): Image
    getOneArticle(id: ID!): Article
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!, planName: String!): Auth
    login(email: String!, password: String!): Auth

    addArticle(title: String!, content: String!, outline: String, createdArticles: String!, createdPosts: String!): Article
    removeArticle(id: ID!): Article
    updateArticle(id: ID!, title: String!, content: String!, outline: String, createdArticles: String!, createdPosts: String!): Article

    addPayment(user: ID!, subscriptionTier: ID!, amount: Float!, paymentDate: String): Payment

    updateSubscription(subscriptionId: ID, planName: String!, price: Float, features: [String], maxArticles: Int, maxPosts: Int, wordLimit: Int): Subscription
    deleteSubscription(_id: ID!): Subscription

    checkout(subscriptionIds: [ID]!): Checkout
    completePayment(transactionId: String!): Payment

    updateUserEmail(email: String!): User
    updateUserPassword(password: String!): User
    updateUserUsername(username: String!): User
    updateUserProfilePicture(profilePicture: String): User

    sendPasswordResetEmail(emailAddress: String!): Boolean
    validateResetToken(token: String!): Boolean
    resetPassword(token: String!, newPassword: String!): Boolean

    saveOutline(title: String!, content: String!, authorId: ID!): ArticleResponse!
    dummyMutation(userDecisions: UserDecisionsInput): Boolean # This will never be implemented; it's just to satisfy the schema so i can test using jest.
    correctOutline(structuredData: StructuredInput!, userDecisions: UserDecisionsInput!): String

    generateOutline(
      topic: String!
      tone: String!
      keywords: String!
      desiredWordCount: Int!
    ): String

    generateArticle(topic: String!, keywords: [String]): String
    generateSocialMediaPost(platform: String!, content: String!, length: Int!, tone: String!, features: [String!]!): String!
  }
  `;

module.exports = typeDefs;
