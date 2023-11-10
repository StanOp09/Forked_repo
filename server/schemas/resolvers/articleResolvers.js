const { User, Article } = require("../../models");
const generateOutline = require("../../utils/helpers/outline_helpers/generateOutline");
// const {
//   subscriptionDetails,
// } = require("../../utils/helpers/subscriptionDetails");
// const {
//   outlinePrompt,
// } = require("../../utils/outline_helpers/helpers/outlinePrompt");
// const {
//   structureOutline,
// } = require("../../utils/outline_helpers/helpers/structureOutline");
// const {
//   correctionPrompt,
// } = require("../../utils/outline_helpers/helpers/correctionPrompt");

const resolvers = {
  Query: {
    getArticles: async (parent, args, context) => {
      if (context.user) {
        return await Article.find({ author: context.user._id });
      }
      return [];
    },
    getArticle: async (parent, { id }, context) => {
      if (context.user) {
        // Only return an article that is owned by the logged in user
        const articles = await Article.find({
          _id: id,
          author: context.user._id,
        });
        return articles && articles[0];
      }
      return null;
    },
    // getOutline: async (_, { topic, tone, keywords, desiredWordCount }) => {
    //   try {
    //     // Generate the outline using the outlinePrompt function
    //     const outline = generateOutline(
    //       topic,
    //       tone,
    //       keywords,
    //       desiredWordCount
    //     );

    //     // Structure the outline using the structureOutline function
    //     // const structuredData = structureOutline(outline);

    //     // Check for errors
    //     if (outline.errors.length > 0) {
    //       // Return errors to the client
    //       return {
    //         outline: null,
    //         errors: structuredData.errors,
    //       };
    //     }

    //     // If no errors, return the structured data
    //     return {
    //       outline: structuredData.originalText,
    //       errors: [],
    //     };
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Error generating article outline.");
    //   }
    // },
    // Corrects the outline based on user decisions
    correctOutline: async (_, { structuredData, userDecisions }) => {
      try {
        // Generate the corrected prompt using the correctionPrompt function
        const correctedPrompt = correctionPrompt(structuredData, userDecisions);

        return correctedPrompt;
      } catch (error) {
        console.error(error);
        throw new Error("Error correcting the outline.");
      }
    },
    // ...other queries here
  },
  Mutation: {
    generateOutline: async (_, args) => {
      try {
        const articleOutline = await generateOutline(
          args.topic,
          args.tone,
          args.keywords,
          args.desiredWordCount
        );
        console.log("articleOutline value:", articleOutline);
        return articleOutline;
      } catch (error) {
        throw new Error("Failed to generate article outline");
      }
    },
    addArticle: async (
      parent,
      { title, content, outline, createdArticles, createdPosts },
      context
    ) => {
      if (context.user) {
        return await Article.create({
          title,
          content,
          outline,
          createdArticles,
          createdPosts,
          author: context.user._id,
        });
      }
      return null;
    },
    removeArticle: async (parent, { id }, context) => {
      // Only delete articles owned by logged in user
      if (context.user) {
        const article = await Article.findById(id);
        if (article && article.author.equals(context.user._id)) {
          await Article.deleteOne({ _id: id });
          return article;
        }
      }
      return null;
    },
    async removeArticle(_, { id }, { models, user }) {
      if (!user) {
        throw new Error("You must be logged in to perform this action");
      }
      try {
        const article = await models.Article.findById(id);
        if (!article) {
          throw new Error("Article not found");
        }
        if (article.author.toString() !== user.id) {
          throw new Error("You are not authorized to delete this article");
        }
        await article.remove();
        return article;
      } catch (error) {
        throw new Error("Error deleting article");
      }
    },
    // removeArticle: async (parent, { id }, context) => {
    //   const article = await Article.findById(id);
    //   await Article.deleteOne({ _id: id });
    //   return article;
    // },
    // make sure to auth
    saveOutline: async (_, { title, content, authorId }) => {
      try {
        // Ensure the author exists
        const author = await User.findById(authorId);
        if (!author) {
          return {
            success: false,
            message: "Author not found",
            article: null,
          };
        }
        // Create a new article with the outline
        const newArticle = await Article.create({
          title,
          content,
          author: authorId,
        });

        return {
          success: true,
          message: "Article with outline saved successfully",
          article: newArticle,
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "Failed to save the article",
          article: null,
        };
      }
    },
    updateArticle: async (
      parent,
      { id, title, content, outline, createdArticles, createdPosts },
      context
    ) => {
      if (context.user) {
        // Only update an article that is owned by the logged in user
        return await Article.findOneAndUpdate(
          { _id: id, author: context.user._id },
          { title, content, outline, createdArticles, createdPosts },
          { new: true }
        );
      }
      return null;
    },
    // for gpt call placeholder
    // fetchData: async (_, __, { dataSources }) => {
    //   return dataSources.externalAPI.fetchData();
    // },
    // generateArticle: async (_, { topic, keywords }, context) => {
    //       const user = context.user;
    //   if (!context.user) {
    //     throw new UserInputError("You must be logged in to generate an article.");
    //   }
    //   const currentUser = await User.findOne({ _id: context.user._id });

    //   // Check if user has reached their article limit
    //   // Remove count here or in outline? Outline probably right so the user can decide if thats what they want to use? Add a use credit on generate
    //   if (currentUser.articlesGenerated >= currentUser.articleCount) {
    //     throw new UserInputError("You have reached your article generation limit for this subscription level.");
    //   }

    //   // Use wordLimit for the content generation
    //   const prompt = generateArticlePrompt(topic, keywords);
    //   const content = await generateContent(topic, currentUser.wordLimit, prompt); // <-- Using word limit from user subscription details // redo this with subscription details
    //   await User.updateOne({ _id: context.user._id }, { $inc: { articlesGenerated: 1 } });
    //   return content;
    // },
    // generateSocialMediaPost: async (
    //   _,
    //   { platform, content, length, tone, features },
    //   context
    // ) => {
    //   const user = context.user;
    //   if (!context.user) {
    //     throw new UserInputError("You must be logged in to generate a post.");
    //   }
    //   const currentUser = await User.findOne({ _id: context.user._id });

    //   // Check if user has reached their post generation limit
    //   if (currentUser.postsGenerated >= currentUser.postLimit) {
    //     throw new UserInputError(
    //       "You have reached your post generation limit for this subscription level."
    //     );
    //   }

    //   const platformWordLimit = getPlatformWordLimit(platform, length);

    //   const prompt = generateSocialMediaPrompt(platform, content, tone, length);
    //   let generatedContent = await generateContent(prompt, platformWordLimit);

    //   // Append optional features to the generated content
    //   generatedContent = appendFeaturesToContent(generatedContent, features);
    //   await User.updateOne(
    //     { _id: context.user._id },
    //     { $inc: { postsGenerated: 1 } }
    //   );
    //   return generatedContent;
    // },
  },
};

module.exports = resolvers;
