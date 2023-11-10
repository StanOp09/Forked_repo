jest.mock("../dataSources/externalAPI");
const generateKeywords = require("../utils/helpers/outline_helpers/helpers/generateKeywords");
const { generateContent } = require("../dataSources/externalAPI");

describe("generateKeywords", () => {
  beforeEach(() => {
    generateContent.mockClear();
  });

  test("should return keywords array", async () => {
    generateContent.mockResolvedValue("keyword1, keyword2");
    const keywords = await generateKeywords("some topic");
    expect(keywords).toEqual(["keyword1", "keyword2"]);
  });

  test("should handle errors from generateContent gracefully", async () => {
    generateContent.mockRejectedValue(new Error("API error"));
    await expect(generateKeywords("some topic")).rejects.toThrow("API error");
  });

  test("should handle unexpected format in generateContent response", async () => {
    generateContent.mockResolvedValue("an unexpected non-csv response");
    const keywords = await generateKeywords("some topic");
    expect(keywords).toEqual(["an unexpected non-csv response"]); // assuming we want to treat the entire response as a single keyword
  });
});
