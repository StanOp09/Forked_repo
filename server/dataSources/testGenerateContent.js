// // Import the necessary modules and configure environment variables
// require("dotenv").config();
// const { generateContent } = require("./externalAPI");

// async function testGenerateContent() {
//   try {
//     // Define your test prompt
//     const testPrompt = `Please create an article outline for the topic "Artificial Intelligence" in a Evocative, balanced, engaging,informative tone.
//     The outline should be complex in detail with approximately 7 H2 sections and 2 H3 subsections under each H2, where appropriate.
//     Include an introduction at the beginning and a conclusion at the end.
//     Use "H2" for section headers and "H3" for subsection headers, followed by a colon and the title.
//     Provide short descriptions for each section where appropriate.
//     Ensure that the article flows logically and covers the topic comprehensively.
//     Incorporate these keywords where relevant: AI, Machine Learning, Deep Learning.
//     Aim for the article to be approximately 3000 words in total.`;

//     // Define maxLength (optional)
//     const maxLength = 4000; // Adjust as needed

//     // Call the generateContent function with your test prompt
//     const response = await generateContent(testPrompt, maxLength);

//     // Log the response to the console
//     console.log("OpenAI response:", response);
//   } catch (error) {
//     console.error("Error from OpenAI:", error);
//   }
// }

// // Call the testGenerateContent function to test the OpenAI API
// testGenerateContent();
