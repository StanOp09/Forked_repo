const { generateContent } = require("../../../../dataSources/externalAPI");

async function generateKeywords(topic) {
  const prompt = `List 75 keywords related to the topic: ${topic}`;
  const keywordsString = await generateContent(prompt, 500);
  const keywordsArray = keywordsString
    .split(",")
    .map((keyword) => keyword.trim()); // Trim whitespace from each keyword
  return keywordsArray;
}

module.exports = generateKeywords;
