require("dotenv").config();
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const resolvers = {
  Query: {
    fetchImage: async (_, { imageName }) => {
      try {
        const s3Key = `${imageName}`;
        console.log("Fetching image from S3 with key:", s3Key);

        const params = {
          Bucket: process.env.BUCKET,
          Key: s3Key,
        };

        const data = await s3.getObject(params).promise();
        console.log("Image fetched successfully");

        return {
          imageName: s3Key,
          contentType: data.ContentType,
          data: data.Body.toString("base64"), // Convert to base64 for GraphQL
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving the image");
      }
    },
  },
};

module.exports = resolvers;
