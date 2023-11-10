const cleanKeywords = require("../utils/helpers/outline_helpers/helpers/cleanKeywords");

describe("cleanKeywords", () => {
  test("should return a comma-separated string", () => {
    const keywords = "   AI,   OpenAI, GPT-4,  ";
    const cleanedKeywords = cleanKeywords(keywords);
    expect(cleanedKeywords).toBe("AI, OpenAI, GPT-4");
  });

  test("should handle empty input", () => {
    const keywords = "";
    const cleanedKeywords = cleanKeywords(keywords);
    expect(cleanedKeywords).toBe("");
  });

  test("should remove empty strings from the result", () => {
    const keywords = "keyword1, , keyword2, , , keyword3";
    const cleanedKeywords = cleanKeywords(keywords);
    expect(cleanedKeywords).toBe("keyword1, keyword2, keyword3");
  });

  test("should not have trailing commas", () => {
    const keywords = "keyword1, keyword2, ";
    const cleanedKeywords = cleanKeywords(keywords);
    expect(cleanedKeywords).not.toMatch(/,\s*$/);
  });
});
