jest.mock("../dataSources/externalAPI");
const generateOutline = require("../utils/helpers/outline_helpers/generateOutline");
const { generateContent } = require("../dataSources/externalAPI");
const outlinePrompt = require("../utils/helpers/outline_helpers/helpers/outlinePrompt");
// const {
//   cleanKeywords,
// } = require("../utils/helpers/outline_helpers/helpers/cleanKeywords");

// jest.mock("../utils/helpers/outline_helpers/helpers/cleanKeywords", () => ({
//   cleanKeywords: jest.fn().mockReturnValue("keyword1, keyword2, keyword3"),
// }));

describe("generateOutline", () => {
  const topic = "some topic";
  const tone = "some tone";
  const desiredWordCount = 2500;
  const keywords = "keyword1, keyword2, keyword3";

  beforeEach(() => {
    // Clear mocks before each test
    generateContent.mockClear();
  });

  // ---------------------------------------------------------------------//

  test("should throw error if topic is not provided", async () => {
    await expect(
      generateOutline("", tone, keywords, desiredWordCount)
    ).rejects.toThrow("Topic is required");
  });

  // ---------------------------------------------------------------------//

  test("should throw error if tone is not provided", async () => {
    await expect(
      generateOutline(topic, "", "", desiredWordCount)
    ).rejects.toThrow("Tone is required");
  });

  // ---------------------------------------------------------------------//

  test("should throw error if desiredWordCount is not a positive number", async () => {
    // Since we have mocked the entire module above, no need to mock again here.
    await expect(generateOutline(topic, tone, keywords, 0)).rejects.toThrow(
      "Desired word count must be a positive number"
    );

    // Restore the original implementation if necessary for other tests
    // This would require `cleanKeywords` to be a named export, not default.
    // cleanKeywords.mockRestore();
  });

  // ---------------------------------------------------------------------//

  test("should generate keywords if they are not provided", async () => {
    const mockKeywords = "H2: generated, keywords, from, API";
    const mockOutline = "H2: Generated outline from API";

    // Mock 'generateContent' to handle two calls differently
    generateContent
      .mockResolvedValueOnce(mockKeywords) // First call for keywords
      .mockResolvedValueOnce(mockOutline); // Second call for the outline

    const outline = await generateOutline(topic, tone, "", desiredWordCount);
    expect(outline.originalText).toBe(mockOutline);

    const keywordsPrompt = `Provide 75 keywords related to the topic: ${topic}`;
    const articleOutlinePrompt = outlinePrompt(
      topic,
      tone,
      mockKeywords, // Expected to use the generated keywords here
      desiredWordCount
    );

    // Check if the functions are called with the expected arguments
    expect(generateContent).toHaveBeenNthCalledWith(1, keywordsPrompt);
    expect(generateContent).toHaveBeenNthCalledWith(2, articleOutlinePrompt);
  });

  // ---------------------------------------------------------------------//

  test("should generate a correct outline with provided keywords", async () => {
    const topic = "some topic";
    const tone = "some tone";
    const desiredWordCount = 2500; // For moderately complex articles
    const keywords = "generated, keywords, from, API";

    // This is the expected structure of the article outline.
    const expectedPrompt = outlinePrompt(
      topic,
      tone,
      keywords,
      desiredWordCount
    );

    // Mock the `generateContent` to return an outline that would match the expected prompt.
    generateContent.mockResolvedValueOnce(expectedPrompt);

    const outline = await generateOutline(
      topic,
      tone,
      keywords,
      desiredWordCount
    );

    // Expect the `originalText` property of `outline` to match the expected prompt.
    expect(outline.originalText).toBe(expectedPrompt);

    // The structure must contain the correct number of sections, which should be equivalent to the number of "H2" matches in the expectedPrompt.
    const sectionCount = (expectedPrompt.match(/H2:/g) || []).length;
    expect(outline.structure.sections).toHaveLength(sectionCount);

    // Each section has the correct number of subsections, which is determined by desiredWordCount.
    outline.structure.sections.forEach((section, index) => {
      const expectedSubsections =
        determineSubsectionsPerSection(desiredWordCount);
      expect(section.subSections).toHaveLength(expectedSubsections);
    });

    // Ensure generateContent was called with the expected prompt.
    expect(generateContent).toHaveBeenCalledWith(expectedPrompt);
  });

  // Helper function to determine the number of subsections per section based on word count
  function determineSubsectionsPerSection(wordCount) {
    if (desiredWordCount >= 4000) {
      complexity = "very complex";
      sections = 9;
      subsectionsPerSection = 3;
    } else if (desiredWordCount >= 3000) {
      complexity = "complex";
      sections = 7;
      subsectionsPerSection = 2;
    } else if (desiredWordCount >= 2500) {
      complexity = "moderately complex";
      sections = 6;
      subsectionsPerSection = 2;
    } else if (desiredWordCount >= 2000) {
      complexity = "moderate";
      sections = 5;
      subsectionsPerSection = 1;
    } else {
      complexity = "simple";
      sections = 4;
      subsectionsPerSection = 1;
    }
  }
});
