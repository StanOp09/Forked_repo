const { generateContent } = require("../../../dataSources/externalAPI");
const cleanKeywords = require("./helpers/cleanKeywords");
const outlinePrompt = require("./helpers/outlinePrompt");
// const structureOutline = require("./helpers/structureOutline");

async function generateOutline(topic, tone, keywords, desiredWordCount) {
  if (!topic) {
    throw new Error("Topic is required");
  }

  if (!tone) {
    throw new Error("Tone is required");
  }

  if (!desiredWordCount || desiredWordCount <= 0) {
    throw new Error("Desired word count must be a positive number");
  }

  // Step 2: If keywords are not provided, generate them.
  if (!keywords || keywords.trim() === "") {
    const prompt = `Provide 75 keywords related to the topic: ${topic}`;
    keywords = await generateContent(prompt);
    // check the usersubscriptionlevel on client side then give the slider options for desired length for user to decide
  }

  // Step 3: Clean and process the keywords.
  keywords = cleanKeywords(keywords);

  if (!keywords) {
    throw new Error("Keywords are required after cleaning and processing");
  }

  // Step 4: Send the cleaned keywords, topic, and tone to generate the article outline.
  const articleOutlinePrompt = outlinePrompt(
    topic,
    tone,
    keywords,
    desiredWordCount
  );
  // Generate the article outline text
  const articleOutlineText = await generateContent(articleOutlinePrompt, null);

  // Step 5: Convert the GPT-4 generated outline text into structured JSON.
  // const articleOutline = structureOutline(articleOutlineText);

  // return articleOutline;
  return articleOutlineText;
}

module.exports = generateOutline;
