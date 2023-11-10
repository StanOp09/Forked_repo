// Calls to gpt will go here for separation of concerns for typeDefs/resolvers
require("dotenv").config();
const OpenAIApi = require("openai");

// Initialize OpenAI API client
const openai = new OpenAIApi({
  apiKey: process.env.apiKey,
});

async function generateContent(prompt, maxLength) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an SEO expert who is incredibly talented at creating optimized articles and social media content and are now my expert assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4",
    });

    let content =
      response.choices && response.choices[0]
        ? response.choices[0].message.content
        : "No content generated";

    // If a maxLength is specified and the content is too long, truncate it.
    if (maxLength && content.length > maxLength) {
      content = truncateToSentence(content, maxLength);
    }

    return content;
  } catch (error) {
    console.error("Error generating content with OpenAI:", error.response.data);
    throw new Error("Failed to generate content");
  }
}

function truncateToSentence(text, wordLimit) {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;

  const sentences = text.match(/[^.!?]*[.!?]/g) || [];
  let truncatedText = "";
  let truncatedWords = [];

  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/);
    if (truncatedWords.length + sentenceWords.length > wordLimit) break;
    truncatedWords.push(...sentenceWords);
    truncatedText += sentence;
  }

  return truncatedText.trim();
}

module.exports = { generateContent };

// function truncateToSentence(text, maxLength) {
//   if (text.length <= maxLength) return text;

//   const sentences = text.match(/[^.!?]*[.!?]/g) || [];
//   let truncatedText = "";

//   for (const sentence of sentences) {
//     if (truncatedText.length + sentence.length > maxLength) break;
//     truncatedText += sentence;
//   }

//   return truncatedText || text.slice(0, maxLength);
// }
